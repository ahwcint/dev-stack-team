import { SignJWT, jwtVerify } from 'jose';

export async function verifySessionClient(token: string) {
  try {
    await decrypt(token);
    return {
      data: null,
      message: 'Success',
      status: 200,
      success: true,
    };
  } catch (e) {
    return {
      data: null,
      message: 'Session expired or invalid',
      status: 201,
      success: false,
    };
  }
}

export async function encrypt(payload: { userId: string; expiresAt: Date }) {
  const { algoSession, encodedKey } = env;
  if (algoSession === undefined) throw new Error('algoSession missing');
  return new SignJWT(payload)
    .setProtectedHeader({ alg: algoSession })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  const { algoSession, encodedKey } = env;
  if (algoSession === undefined) throw new Error('algoSession missing');
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: [algoSession],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error);
    throw new Error('Failed to verify session');
  }
}

const env = {
  algoSession: 'HS256',
  encodedKey: new TextEncoder().encode('cfa396de-2c64-450c-ac4d-aeabaad274bc'),
};
