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
    };
  } catch (e) {
    logger.error(
      `[❌][API_ERROR]-[%s] : %s`,
      actionName,
      handleError((e as { code: string }).code).message,
    );
    return handleError((e as { code: string }).code);
  }
}

function handleError<V>(errorCode = 'LOGIC_ERROR'): handleResponse<V> {
  const response = {
    data: null,
    success: false,
    message: 'unknown api error',
    status: 202,
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
