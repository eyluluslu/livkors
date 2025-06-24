import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Production'da PostgreSQL, development'da SQLite kullan
const getPrismaConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production: PostgreSQL ile Vercel Postgres
    return {
      log: ['error']
    }
  } else {
    // Development: SQLite ile local
    return {
      log: ['query', 'error', 'warn']
    }
  }
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(getPrismaConfig())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 