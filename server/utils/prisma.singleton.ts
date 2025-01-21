import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
type Global = typeof global & { prisma: PrismaClient };

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as Global).prisma) {
    (global as Global).prisma = new PrismaClient();
  }

  prisma = (global as Global).prisma;
}

export default prisma;
