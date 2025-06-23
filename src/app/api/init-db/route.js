import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

export async function POST(request) {
  try {
    // Güvenlik kontrolü - sadece development veya özel token ile
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.INIT_DB_TOKEN || 'livkors-init-2024'
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🚀 Database initialization started...')
    
    // Vercel'de /tmp dizinini oluştur
    if (process.env.NODE_ENV === 'production') {
      const tmpDir = '/tmp'
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true })
      }
    }
    
    // Prisma client'ı özel database URL ile oluştur
    const databaseUrl = process.env.NODE_ENV === 'production' 
      ? 'file:/tmp/database.db' 
      : process.env.DATABASE_URL || 'file:./dev.db'
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl
        }
      }
    })
    
    console.log('📦 Creating database schema...')
    await execAsync(`DATABASE_URL="${databaseUrl}" npx prisma db push`)
    
    console.log('📂 Seeding categories...')
    await seedCategories(prisma)
    
    console.log('🛍️ Seeding products...')
    await seedProducts(prisma)
    
    console.log('👤 Creating admin user...')
    await createAdminUser(prisma)
    
    console.log('⚙️ Creating site settings...')
    await createSiteSettings(prisma)
    
    await prisma.$disconnect()
    
    console.log('✅ Database initialization completed!')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      timestamp: new Date().toISOString(),
      databaseUrl: databaseUrl
    })
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    
    return NextResponse.json({ 
      error: 'Database initialization failed',
      details: error.message 
    }, { status: 500 })
  }
}

// Helper functions
async function seedCategories(prisma) {
  const categories = [
    { name: "Kadın Çantaları", description: "Şık ve modern kadın çantaları" },
    { name: "Erkek Çantaları", description: "Kaliteli erkek çantaları ve portföyler" },
    { name: "Seyahat Çantaları", description: "Seyahat için ideal büyük çantalar" },
    { name: "İş Çantaları", description: "Profesyonel iş çantaları" },
    { name: "Spor Çantaları", description: "Spor ve fitness çantaları" },
    { name: "Okul Çantaları", description: "Öğrenciler için çantalar" },
    { name: "Cüzdan & Kemer", description: "Cüzdan, kartlık ve kemer çeşitleri" }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }
}

async function seedProducts(prisma) {
  const categories = await prisma.category.findMany()
  
  const products = [
    {
      name: "Vintage Deri Çanta",
      description: "El yapımı vintage stil deri çanta",
      price: 299.99,
      stock: 15,
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      categoryId: categories[0]?.id
    },
    // ... daha fazla ürün
  ]

  for (const product of products.slice(0, 5)) { // Sadece birkaç ürün
    if (product.categoryId) {
      await prisma.product.upsert({
        where: { name: product.name },
        update: {},
        create: product
      })
    }
  }
}

async function createAdminUser(prisma) {
  const bcrypt = await import('bcryptjs')
  
  const hashedPassword = await bcrypt.hash('123456', 12)
  
  await prisma.user.upsert({
    where: { email: 'admin@livkors.com' },
    update: {},
    create: {
      email: 'admin@livkors.com',
      name: 'Admin Livkors',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })
}

async function createSiteSettings(prisma) {
  // Create site settings if not exist
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Livkors',
      siteDescription: 'Kaliteli çantalar ve mükemmel müşteri hizmetinde öncü markayız'
    }
  })
  
  // Create about page if not exist
  await prisma.aboutPage.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default'
    }
  })
} 