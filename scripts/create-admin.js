const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function createAdmin() {
  const prisma = new PrismaClient()
  
  try {
    console.log('👤 Admin kullanıcısı oluşturuluyor...')
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('123456', 12)
    
    // Create admin user
    const admin = await prisma.user.upsert({
      where: { email: 'admin@livkors.com' },
      update: {},
      create: {
        email: 'admin@livkors.com',
        name: 'Admin Livkors',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    
    console.log('✅ Admin kullanıcısı oluşturuldu:', admin.email)
    console.log('📧 Email: admin@livkors.com')
    console.log('🔑 Password: 123456')
    
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
    
    console.log('✅ Site ayarları ve hakkımızda sayfası oluşturuldu')
    
  } catch (error) {
    console.error('❌ Admin oluşturulurken hata:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin() 