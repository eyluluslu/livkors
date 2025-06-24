# PostgreSQL Kurulum Rehberi

## 🗄️ Database Değişikliği: MySQL → PostgreSQL

Projeniz başarıyla **PostgreSQL** kullanacak şekilde güncellendi!

## 📋 Yapılan Değişiklikler

- ✅ `prisma/schema.prisma` - Provider PostgreSQL olarak güncellendi
- ✅ `pg` ve `@types/pg` driver'ları yüklendi
- ✅ Prisma Client PostgreSQL için yeniden generate edildi
- ✅ Environment configuration PostgreSQL formatında hazırlandı

## 🚀 Vercel Postgres (Production - Önerilen)

### 1. Vercel Dashboard'da PostgreSQL Database

1. **Vercel Dashboard'a gidin**
2. **Storage** sekmesine tıklayın
3. **Create Database** > **Postgres**
4. **Database Name**: `livkors-db`
5. **Region**: Size yakın bir bölge seçin
6. **Create** butonuna tıklayın

### 2. Environment Variables

Vercel database oluşturduktan sonra `.env.local` sekmesinden connection string'i alın:

```env
# Vercel Postgres
DATABASE_URL="postgresql://username:password@host:5432/database_name"
JWT_SECRET="your-super-secret-jwt-key-livkors-2024-very-secure"
INIT_DB_TOKEN="livkors-init-2024"
NODE_ENV="production"
```

## 🛠️ Local Development (İsteğe Bağlı)

### Docker ile PostgreSQL

```bash
# PostgreSQL container başlatma
docker run --name postgres-livkors -e POSTGRES_PASSWORD=password -e POSTGRES_DB=livkors_db -p 5432:5432 -d postgres:15

# Connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/livkors_db"
```

### PostgreSQL App (macOS)

```bash
# Homebrew ile kurulum
brew install postgresql@15
brew services start postgresql@15

# Database oluşturma
createdb livkors_db

# Connection string
DATABASE_URL="postgresql://username@localhost:5432/livkors_db"
```

### Windows PostgreSQL

1. **PostgreSQL İndir**: https://www.postgresql.org/download/windows/
2. **Installer çalıştır** ve varsayılan ayarları kullan
3. **pgAdmin** ile database oluştur: `livkors_db`
4. **Connection string**:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/livkors_db"
   ```

## ⚡ Hızlı Başlangıç (Vercel Postgres)

### 1. Vercel Dashboard Setup

1. **Vercel.com** > **Storage** > **Create Database** > **Postgres**
2. Database oluşturulduktan sonra **Connection String**'i kopyalayın
3. **Environment Variables**'a ekleyin

### 2. Local Development

```bash
# .env dosyasını güncelleyin
echo 'DATABASE_URL="postgresql://..."' > .env
echo 'JWT_SECRET="your-super-secret-jwt-key-livkors-2024-very-secure"' >> .env

# Database schema'yı push edin
npx prisma db push

# Verileri seed edin
npm run db:seed

# Development server'ı başlatın
npm run dev
```

## 🎯 Vercel Deployment

### Environment Variables

Vercel Dashboard > Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Vercel Postgres connection string |
| `JWT_SECRET` | `your-super-secret-jwt-key-livkors-2024-very-secure` |
| `INIT_DB_TOKEN` | `livkors-init-2024` |
| `NODE_ENV` | `production` |

### Deployment

```bash
# CLI ile deploy
npx vercel --prod

# Veya GitHub integration ile otomatik deploy
git push origin main
```

## 📊 PostgreSQL Avantajları

- **🌍 Global**: Vercel Postgres global olarak dağıtılmış
- **⚡ Performans**: Connection pooling ve caching
- **🔒 Güvenlik**: SSL/TLS encryption
- **📈 Ölçeklenebilirlik**: Otomatik scaling
- **💰 Maliyet**: Vercel Hobby plan ile ücretsiz tier
- **🛠️ Yönetim**: Fully managed, backup ve monitoring

## 🔄 Database Migration

Önceki verilerinizi taşımak için:

```bash
# Eski database'den export
pg_dump old_database_url > backup.sql

# Yeni database'e import
psql new_database_url < backup.sql
```

## 🏁 Sonuç

Projeniz artık **PostgreSQL** kullanıyor ve **Vercel Postgres** ile production'a deploy edilmeye hazır!

- ✅ **Development**: Docker, PostgreSQL App, veya local installation
- ✅ **Production**: Vercel Postgres (önerilen)
- ✅ **Performance**: Enterprise-grade database
- ✅ **Scalability**: Global distribution ve auto-scaling 