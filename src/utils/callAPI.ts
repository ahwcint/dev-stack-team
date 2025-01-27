import type { BaseResponseApi } from '@/routes/main/dto/base.dto';
import { AxiosError, AxiosResponse } from 'axios';

export async function callAPI<T>(
  apiCallFn: () => Promise<AxiosResponse>,
): Promise<BaseResponseApi<T>> {
  try {
    const { data, ...rest } = await apiCallFn();
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error: AxiosError = JSON.parse(JSON.stringify(e));
      console.log('error :>> ', error);
      return {
        data: null,
        message: 'Axios Error',
        status: error.status || 500,
        success: false,
      };
    }

    return {
      data: null,
      message: 'Unexpected Axios Error',
      status: 500,
      success: false,
    };
  }
}
