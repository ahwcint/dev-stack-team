'use client';

import { callAPI } from '@/utils/callAPI';
import axios from 'axios';

export async function signOutApiService() {
  const res = await callAPI(async () =>
    axios.get(`${process.env.API_URL_PATH}/auth/sign-out`, {
      withCredentials: true,
    }),
  );

  return res;
}
