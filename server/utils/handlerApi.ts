import { Prisma } from '@prisma/client';
import logger from './pino';

export async function handlerApi<V>(
  actionName: string,
  apiFn: () => Promise<V | null>,
): Promise<handleResponse<V>> {
  try {
    const res = await apiFn();
    logger.info('[✅][API_SUCCESS]-[%s] : %o', actionName, res);
    return {
      data: res,
      message: 'success',
      status: 201,
      success: true,
      error_message: undefined,
    };
  } catch (e) {
    const error = JSON.parse(JSON.stringify(e));
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(
        `[❌][API_ERROR]-[%s] : %s`,
        actionName,
        handleError((e as { code: string }).code, error).message,
      );
      return handleError((e as { code: string }).code, error);
    } else {
      return handleError((e as { code: string }).code, error);
    }
  }
}

function handleError<V>(
  errorCode = 'LOGIC_ERROR',
  error_message: unknown,
): handleResponse<V> {
  const response = {
    data: null,
    success: false,
    message: 'unknown api error',
    status: 202,
    error_message: error_message,
  };
  switch (errorCode) {
    case 'P2002':
      response.message = 'username already existed';
      break;
    case 'LOGIC_ERROR':
      response.message = 'logic api error';
      break;
  }
  return response;
}

type handleResponse<V> = {
  data: Awaited<V> | null;
  message: string;
  error_message: unknown;
  status: number;
  success: boolean;
};
