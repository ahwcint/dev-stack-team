import type { BaseResponseApi } from '@/routes/main/dto/base.dto';
import { AxiosError, AxiosResponse } from 'axios';

export async function callAPI<T>(
  apiCallFn: () => Promise<AxiosResponse>,
): Promise<BaseResponseApi<T>> {
  try {
    const axiosResponse = await apiCallFn();
    return axiosResponse.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return (
        e.response?.data || {
          data: null,
          message: 'Axios Error',
          status: e.response?.status || 500,
          success: false,
        }
      );
    }

    return {
      data: null,
      message: 'Unexpected Axios Error',
      status: 500,
      success: false,
    };
  }
}
