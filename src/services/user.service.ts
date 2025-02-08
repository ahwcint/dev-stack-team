'use client';
import type { User } from '@prisma/client';
import type {
  createUserRequestApi,
  createUserResponseApi,
} from '@/routes/user/dto/createUser.dto';
import type {
  signInUserRequestApi,
  signInUserResponseApi,
} from '@/routes/user/dto/signInUser.dto';
import { callAPI } from '@/utils/callAPI';
import axios from '@/lib/axios';
import { setCookie, deleteCookie } from 'cookies-next';

export async function createUserApiService(
  payload: createUserRequestApi,
): Promise<createUserResponseApi> {
  const res = await callAPI<createUserResponseApi['data']>(async () =>
    axios.post(`${process.env.API_URL_PATH}/user`, payload),
  );

  // if (res.data?.session) {
  //   (await cookies()).set('dev-stack.session-token', res.data.session.token, {
  //     expires: res.data.session.expiresAt,
  //   });
  // }

  return res;
}

export async function signInUserApiService(
  payload: signInUserRequestApi,
): Promise<signInUserResponseApi> {
  const res = await callAPI<signInUserResponseApi['data']>(async () =>
    axios.post(`${process.env.API_URL_PATH}/user/sign-in`, payload),
  );

  if (res.data?.session) {
    setCookie('dev-stack.session-token', res.data.session.token, {
      expires: new Date(res.data.session.expiresAt),
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    setCookie('dev-stack.user-id', res.data.userId, {
      expires: new Date(res.data.session.expiresAt),
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }

  return res;
}

export async function signOutUserApiService() {
  const res = await callAPI(async () =>
    axios.get(`${process.env.API_URL_PATH}/auth/sign-out`),
  );

  return res;
}

export async function listUserApiService() {
  const res = await callAPI<User[]>(async () =>
    axios.get(`${process.env.API_URL_PATH}/user`),
  );

  return res;
}
