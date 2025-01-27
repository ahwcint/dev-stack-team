'use server';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

export async function encrypt(payload: { userId: string; expiresAt: Date }) {
  const { algoSession, encodedKey } = getEnv();
  if (algoSession === undefined) throw new Error('algoSession missing');
  return new SignJWT(payload)
    .setProtectedHeader({ alg: algoSession })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  const { algoSession, encodedKey } = getEnv();
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

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(
  rawPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(rawPassword, hashedPassword);
}

function getEnv() {
  const algoSession = process.env.ALGO_SESSION;
  const encodedKey = new TextEncoder().encode(process.env.SECRET_KEY);
  return {
    algoSession,
    encodedKey,
  };
}
