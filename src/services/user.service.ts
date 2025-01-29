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
import axios from '@/app/lib/axios';
import { verifySessionApiService } from './auth.service';

export async function createUserApiService(
  payload: createUserRequestApi,
): Promise<createUserResponseApi> {
  const res = await callAPI<createUserResponseApi['data']>(async () =>
    axios.post(`${process.env.API_URL_PATH}/user`, payload),
  );

  if (res.data?.session) {
    const sessionResponse = await verifySessionApiService(
      res.data?.session.token,
    );

    if (sessionResponse.success)
      if (typeof window !== undefined)
        sessionStorage.setItem('sessionToken', res.data?.session.token);
  } else {
    if (typeof window !== undefined) sessionStorage.clear();
  }

  return res;
}

export async function signInUserApiService(
  payload: signInUserRequestApi,
): Promise<signInUserResponseApi> {
  const res = await callAPI<signInUserResponseApi['data']>(async () =>
    axios.post(`${process.env.API_URL_PATH}/user/sign-in`, payload),
  );

  if (res.data?.session) {
    const sessionResponse = await verifySessionApiService(
      res.data?.session.token,
    );

    if (sessionResponse.success)
      if (typeof window !== undefined)
        sessionStorage.setItem('sessionToken', res.data?.session.token);
  } else {
    if (typeof window !== undefined) sessionStorage.clear();
  }

  return res;
}

export async function signOutUserApiService() {
  const res = await callAPI(async () =>
    axios.get(`${process.env.API_URL_PATH}/auth/sign-out`),
  );

  if (typeof window !== undefined) sessionStorage.clear();

  return res;
}
