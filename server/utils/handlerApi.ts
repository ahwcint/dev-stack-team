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
      status: 200,
      success: true,
    };
  } catch (e) {
    const error = JSON.parse(JSON.stringify(e));
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(
        `[❌][API_ERROR]-[%s] : %s`,
        actionName,
        handleError((e as { code: string }).code).message,
        error,
      );
      return handleError((e as { code: string }).code);
    } else {
      return handleError((e as { code: string }).code);
    }
  }
}

function handleError<V>(errorCode = 'LOGIC_ERROR'): handleResponse<V> {
  const response = {
    data: null,
    success: false,
    message: 'unknown api error',
    status: 201,
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
  status: number;
  success: boolean;
};
