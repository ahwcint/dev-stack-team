'use client';

import { User } from '@prisma/client';
import type {
  createUserRequestApi,
  createUserResponseApi,
} from '@/routes/user/dto/createUser.dto';
import type {
  signInUserRequestApi,
  signInUserResponseApi,
} from '@/routes/user/dto/signInUser.dto';
import { callAPI } from '@/utils/callAPI';
import axios from 'axios';

export async function createUserApiService(
  payload: createUserRequestApi,
): Promise<createUserResponseApi> {
  const res = await callAPI<User>(async () =>
    axios.post(`${process.env.API_URL_PATH}/user`, payload, {
      withCredentials: true,
    }),
  );

  return res;
}

export async function signInUserApiService(
  payload: signInUserRequestApi,
): Promise<signInUserResponseApi> {
  const res = await callAPI<User>(async () =>
    axios.post(`${process.env.API_URL_PATH}/user/sign-in`, payload, {
      withCredentials: true,
    }),
  );

  return res;
}
