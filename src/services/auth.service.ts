import axios from '@/app/lib/axios';
import { callAPI } from '@/utils/callAPI';

export async function verifySessionApiService(sessionToken: string) {
  const res = await callAPI(async () =>
    axios.get(
      `${process.env.API_URL_PATH}/auth/verify-session/${sessionToken}`,
    ),
  );

  return res;
}
