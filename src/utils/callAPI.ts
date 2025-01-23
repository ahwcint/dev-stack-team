import { BaseResponseApi } from '@/main/dto/base.dto';
import { AxiosResponse } from 'axios';

export async function callAPI<T>(
  apiCallFn: Promise<AxiosResponse>,
): Promise<BaseResponseApi<T>> {
  try {
    const { data } = await apiCallFn;
    return data;
  } catch (e) {
    console.error('Unexpected Error', e);
    return {
      data: JSON.parse(JSON.stringify(e)) as T,
      message: 'Unexpected Error',
      status: 500,
      success: false,
    };
  }
}
