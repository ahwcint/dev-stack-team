// import { cookies } from 'next/headers';
import { decrypt, encrypt } from '../../utils/auth';
import prisma from '../../utils/prisma.singleton';
import type { Session, User } from '@prisma/client';
import type { BaseResponseApi } from '../main/dto/base.dto';

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
    // const cookieStore = await cookies();

    // cookieStore.set('session', session, {
    //   httpOnly: true,
    //   secure: true,
    //   expires: undefined,
    //   sameSite: 'lax',
    //   path: '/',
    // });

    return {
      data: response,
      message: 'success',
      success: true,
      status: 200,
      error_message: undefined,
    };
  } catch (e) {
    return {
      data: null,
      message: 'Failed to create session',
      error_message: JSON.parse(JSON.stringify(e)),
      success: false,
      status: 500,
    };
  }
}

export async function verifySession(
  token: string,
): Promise<BaseResponseApi<User>> {
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
      data: session.user,
      error_message: undefined,
      message: 'success',
      status: 200,
      success: true,
    };
  } catch (e) {
    return {
      data: null,
      error_message: JSON.parse(JSON.stringify(e)),
      message: 'Session expired or invalid',
      status: 200,
      success: true,
    };
  }
}
