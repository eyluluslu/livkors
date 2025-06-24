# PostgreSQL Kurulum Rehberi - Livkors E-Commerce

Bu proje artık tamamen **PostgreSQL** veritabanını kullanmaktadır. Bu rehber size local development ve production environment için PostgreSQL kurulumunu gösterecektir.

## 🗄️ Mevcut Durum

- ✅ **Prisma Schema**: PostgreSQL olarak güncellenmiştir
- ✅ **Dependencies**: `pg` ve `@types/pg` yüklü
- ✅ **Production Schema**: Vercel deployment için hazır
- ❌ **Local Database**: PostgreSQL kurulumu gerekli

## 📋 Gereksinimler

### Local Development
- PostgreSQL 14+ 
- Node.js 18+
- npm/yarn

### Production (Vercel)
- Vercel Postgres Database

## 🚀 Local Development Kurulum

### 1. PostgreSQL Kurulumu

#### Windows:
```bash
# PostgreSQL'i indirin ve kurun
# https://www.postgresql.org/download/windows/
```

#### macOS (Homebrew):
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Database Oluşturma

```bash
# PostgreSQL'e bağlanın
psql -U postgres

# Database oluşturun
CREATE DATABASE livkors_db;

# User oluşturun (opsiyonel)
CREATE USER livkors_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE livkors_db TO livkors_user;

# Çıkış
\q
```

### 3. Environment Variables

`.env` dosyası oluşturun:

```env
# Database Configuration - PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/livkors_db"

# Eğer özel user oluşturduysanız:
# DATABASE_URL="postgresql://livkors_user:your_password@localhost:5432/livkors_db"

# JWT Secret Key
JWT_SECRET="your-super-secret-jwt-key-livkors-2024-very-secure"

# Database initialization token
INIT_DB_TOKEN="livkors-init-2024"

# Node Environment
NODE_ENV="development"
```

### 4. Database Migration ve Seed

```bash
# Prisma client generate
npm run db:generate

# Database schema push
npm run db:push

# Test data ekle
npm run db:seed

# Ya da tek komutla
npm run db:init
```

### 5. Development Server

```bash
npm run dev
```

## 🌐 Production Deployment (Vercel)

### 1. Vercel Postgres Database Oluşturma

1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. **Storage** sekmesine tıklayın
3. **Create Database** → **Postgres** seçin
4. Database adı: `livkors-db`
5. Region: `Frankfurt (fra1)` (Türkiye'ye yakın)

### 2. Environment Variables (Vercel)

Vercel dashboard'da şu environment variables'ları ekleyin:

```env
DATABASE_URL=postgresql://[vercel-postgres-connection-string]
JWT_SECRET=your-super-secret-jwt-key-livkors-2024-very-secure
INIT_DB_TOKEN=livkors-init-2024
NODE_ENV=production
```

### 3. Deployment

```bash
# Production build ve deploy
npx vercel --prod
```

### 4. Database Initialization (Sadece İlk Deployment)

```bash
# Production database'i initialize edin
curl -X POST https://your-app-url.vercel.app/api/init-db?token=livkors-init-2024
```

## 🛠️ Yararlı Komutlar

```bash
# Prisma Client generate
npm run db:generate

# Database push (migration olmadan)
npm run db:push

# Database reset (TEHLİKELİ - tüm data siler)
npm run db:reset

# Seed data ekle
npm run db:seed

# Production schema ile generate
npx prisma generate --schema=prisma/schema.production.prisma

# Database studio (GUI)
npx prisma studio
```

## 🔧 Troubleshooting

### 1. Connection Hatası
```
Error: Authentication failed for user "postgres"
```
**Çözüm**: PostgreSQL password'ünüzü kontrol edin

### 2. Database Bulunamadı
```
Error: database "livkors_db" does not exist
```
**Çözüm**: Database oluşturun:
```bash
createdb livkors_db
```

### 3. Port Çakışması
```
Error: EADDRINUSE :::5432
```
**Çözüm**: PostgreSQL servisini restart edin:
```bash
# Windows
net stop postgresql-x64-14
net start postgresql-x64-14

# macOS
brew services restart postgresql@14

# Linux
sudo systemctl restart postgresql
```

### 4. Prisma Client Hatası
```
Error: Cannot find module '@prisma/client'
```
**Çözüm**: 
```bash
npm install
npm run db:generate
```

## 📊 Database Schema

Proje şu modelleri içerir:

- **User**: Kullanıcı bilgileri ve authentication
- **Product**: Ürün bilgileri
- **Category**: Ürün kategorileri
- **Cart/CartItem**: Sepet sistemi
- **Order/OrderItem**: Sipariş sistemi
- **Message**: Mesajlaşma sistemi
- **Address**: Kullanıcı adresleri
- **PaymentMethod**: Ödeme yöntemleri
- **SiteSettings**: Site genel ayarları
- **HeroBanner**: Ana sayfa banner'ları
- **AboutPage**: Hakkımızda sayfası
- **Newsletter**: E-posta aboneliği

## 🎯 Next Steps

1. ✅ PostgreSQL kurulumu
2. ✅ Environment variables setup
3. ✅ Database migration
4. ✅ Seed data ekleme
5. ✅ Admin user oluşturma (`admin@livkors.com` / `123456`)
6. ✅ Development server başlatma

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Terminal output'unu kontrol edin
2. `.env` dosyanızı kontrol edin
3. PostgreSQL servisinin çalıştığından emin olun
4. Database bağlantı string'ini doğrulayın 