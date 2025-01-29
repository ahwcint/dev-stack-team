import { decrypt, encrypt } from '../../utils/auth';
import prisma from '../../utils/prisma.singleton';
import type { Session, User } from '@prisma/client';
import type { BaseResponseApi } from '../main/dto/base.dto';
import {
  verifySessionRequestApi,
  verifySessionResponseApi,
} from './dto/verifySession.dto';
import logger from '../../utils/pino';

export async function createSession(
  userId: string,
): Promise<BaseResponseApi<Session>> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  try {
    const token_session = await encrypt({ userId, expiresAt });
    const response = await prisma.session.create({
      data: {
        userId,
        expiresAt,
        token: token_session,
      },
    });
    return {
      data: response,
      message: 'success',
      success: true,
      status: 200,
    };
  } catch (e) {
    logger.error('Failed to create session', JSON.parse(JSON.stringify(e)));
    return {
      data: null,
      message: 'Failed to create session',
      success: false,
      status: 203,
    };
  }
}

export async function verifySession({
  token,
}: verifySessionRequestApi): Promise<verifySessionResponseApi> {
  try {
    await decrypt(token);

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new Error('Session expired or invalid');
    }

    return {
      data: session,
      message: 'success',
      status: 200,
      success: true,
    };
  } catch (e) {
    return {
      data: null,
      message: 'Session expired or invalid',
      status: 201,
      success: false,
    };
  }
}
