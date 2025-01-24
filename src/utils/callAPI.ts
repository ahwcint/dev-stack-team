import { BaseResponseApi } from '@/main/dto/base.dto';
import { AxiosError, AxiosResponse } from 'axios';

export async function callAPI<T>(
  apiCallFn: () => Promise<AxiosResponse>,
): Promise<BaseResponseApi<T>> {
  try {
    const { data, ...rest } = await apiCallFn();
    console.log('rest :>> ', rest.headers['set-cookie']);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const error: AxiosError = JSON.parse(JSON.stringify(e));
      return {
        data: null,
        message: 'Axios Error',
        status: error.status || 500,
        success: false,
        error_message: error,
      };
    }

    return {
      data: null,
      message: 'Unexpected Axios Error',
      status: 500,
      success: false,
      error_message: JSON.parse(JSON.stringify(e)),
    };
  }
}
