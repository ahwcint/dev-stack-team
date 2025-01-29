import { hashPassword, verifyPassword } from '../../utils/auth';
import { handlerApi } from '../../utils/handlerApi';
import prisma from '../../utils/prisma.singleton';
import type { Session, User } from '@prisma/client';
import type {
  createUserRequestApi,
  createUserResponseApi,
} from './dto/createUser.dto';
import type {
  signInUserRequestApi,
  signInUserResponseApi,
} from './dto/signInUser.dto';
import { createSession } from '../auth/service';
import type { BaseResponseApi } from '../main/dto/base.dto';
import { omitObjectField } from '../../utils/utils';

export async function createUser(
  payload: createUserRequestApi,
): Promise<createUserResponseApi> {
  const response = await handlerApi('create-user', async () => {
    const hashedPassword = await hashPassword(payload.password);
    return await prisma.user.create({
      data: {
        username: payload.username,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });
  });

  if (!response.data)
    return {
      data: null,
      message: 'Create user failure',
      status: 203,
      success: false,
    };

  const sessionResponse = await createSession(response.data.userId);
  if (!sessionResponse.data)
    return { ...sessionResponse, data: null, status: 203 };

  const safeResponse = {
    ...response,
    data: {
      ...omitObjectField(response.data, 'password'),
      session: sessionResponse.data,
    },
  };

  return safeResponse;
}

export async function getUser(username: string) {
  return await handlerApi(
    'get-user-by-username',
    async () =>
      await prisma.user.findUnique({
        where: {
          username,
        },
      }),
  );
}

export async function verifyUserSignIn(
  payload: signInUserRequestApi,
): Promise<signInUserResponseApi> {
  // 1.find username
  const response = (await getUser(
    payload.username,
  )) as unknown as BaseResponseApi<User>;
  if (!response.data)
    return {
      data: null,
      message: 'Username or password is incorrect',
      status: 203,
      success: false,
    };

  // 2.validation password match
  const isValid = await verifyPassword(
    payload.password,
    response.data.password,
  );
  if (!isValid)
    return {
      data: null,
      message: 'Username or password is incorrect',
      status: 203,
      success: false,
    };

  // 3.create session and return currentSession within
  const sessionResponse = await createSession(response.data.userId);
  if (!sessionResponse.data)
    return { ...sessionResponse, data: null, status: 203 };

  // 4.filter safe data
  const safeResponse = {
    ...response,
    data: {
      ...omitObjectField(response.data, 'password'),
      session: sessionResponse.data,
    },
  };

  return safeResponse;
}
