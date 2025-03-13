import { PrismaClient as PrismaClientNonClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton>;
}

// import dotenv from "dotenv";
// dotenv.config();

const isAccelerate = process.env.DATA_PROXY_URL?.startsWith('prisma://');

function prismaClientSingleton() {
  return new (isAccelerate ? PrismaClient : PrismaClientNonClient)({
    // datasourceUrl: process.env.DATA_PROXY_URL,
    errorFormat: 'pretty',
  });
  // .$extends(withAccelerate())
}

let prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prisma || prismaClientSingleton();

// if(isAccelerate){
//   // @ts-expect-error
//   prisma = prisma.$extends(withAccelerate())
// }

if (process.env.NEXT_PROCESS_ENV == 'BUILD') prisma = {} as typeof prisma;

globalThis.prisma = prisma;
export default prisma;
