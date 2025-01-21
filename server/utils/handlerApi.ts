import logger from './pino';

export async function handlerApi<V>(
  actionName: string,
  apiFn: () => Promise<V | null>,
) {
  try {
    const res = await apiFn();
    logger.info('[✅][API_SUCCESS]-[%s] : %o', actionName, res);
    return {
      data: res,
      message: 'success',
      status: 200,
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

function handleError(errorCode = 'LOGIC_ERROR') {
  const response = {
    data: null,
    code: errorCode,
    message: 'unknown api error',
    status: 409,
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
