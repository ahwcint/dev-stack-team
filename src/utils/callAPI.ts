import { BaseResponseApi } from '@/main/dto/base.dto';
import { AxiosResponse } from 'axios';

export async function callAPI<T>(
  apiCallFn: Promise<AxiosResponse>,
): Promise<BaseResponseApi<T>> {
  try {
    const { data } = await apiCallFn;
    return data;
  } catch (e) {
    return {
      data: null,
      message: 'Unexpected Client Error',
      status: 500,
      success: false,
      error_message: JSON.parse(JSON.stringify(e)),
    };
  }
}
