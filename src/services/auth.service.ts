'use server';

import { callAPI } from '@/utils/callAPI';
import axios from 'axios';
import type { Session } from '@prisma/client';
import { verifySessionResponseApi } from '@/routes/auth/dto/verifySession.dto';

export async function verifySessionApiService(
  sessionToken: string,
): Promise<verifySessionResponseApi> {
  const res = await callAPI<verifySessionResponseApi['data']>(async () =>
    axios.get(
      `${process.env.API_URL_PATH}/auth/verify-session/${sessionToken}`,
    ),
  );

  return res;
}
