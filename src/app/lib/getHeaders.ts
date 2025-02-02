'use server';

import { headers } from 'next/headers';

export default async function getHeaders(
  headersTypes: keyof HeaderTypes,
): Promise<HeaderTypes[typeof headersTypes] | null> {
  return (await headers()).get(headersTypes);
}

type HeaderTypes = {
  ['Authorization']: string;
};
