import { exec } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'

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
    
    // 1. Prisma DB Push
    console.log('📦 Running prisma db push...')
    await execAsync('npx prisma db push')
    
    // 2. Seed Categories
    console.log('📂 Seeding categories...')
    await execAsync('node scripts/seed-categories.js')
    
    // 3. Seed Products  
    console.log('🛍️ Seeding products...')
    await execAsync('node scripts/seed-products.js')
    
    // 4. Create Admin User
    console.log('👤 Creating admin user...')
    await execAsync('node scripts/make-admin.js admin@livkors.com')
    
    console.log('✅ Database initialization completed!')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    
    return NextResponse.json({ 
      error: 'Database initialization failed',
      details: error.message 
    }, { status: 500 })
  }
} 