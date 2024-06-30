import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}// eslint-disable-next-line
const prismaDB = globalThis.prisma || new PrismaClient()
// eslint-disable-next-line
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismaDB //eslint-line-ignore

export default prismaDB
