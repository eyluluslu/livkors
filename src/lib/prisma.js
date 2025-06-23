import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

// Vercel'de SQLite için özel yapılandırma
const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Vercel'de /tmp dizinini kullan
    return 'file:/tmp/database.db'
  }
  // Development'da normal yol
  return process.env.DATABASE_URL || 'file:./dev.db'
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl()
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 