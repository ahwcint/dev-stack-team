'use server';

import { User } from '@prisma/client';

import {
  createUserRequestApi,
  createUserResponseApi,
} from '@/user/dto/createUser.dto';
import { callAPI } from '@/utils/callAPI';
import axios from 'axios';

export async function createUserApiService(
  payload: createUserRequestApi,
): Promise<createUserResponseApi> {
  const res = await callAPI<User>(
    axios.post(`${process.env.SOCKET_LOCAL}/user`, payload),
  );

  return res;
}
