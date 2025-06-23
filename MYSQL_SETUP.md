# MySQL Kurulum Rehberi

## 🗄️ Database Değişikliği: SQLite → MySQL

Projeniz başarıyla **MySQL** kullanacak şekilde güncellendi!

## 📋 Yapılan Değişiklikler

- ✅ `prisma/schema.prisma` - Provider MySQL olarak güncellendi
- ✅ `src/lib/prisma.js` - SQLite özel kodları temizlendi
- ✅ `mysql2` driver yüklendi
- ✅ Prisma Client yeniden generate edildi

## 🛠️ Local Development Kurulumu

### 1. MySQL Server Kurulumu

**Windows:**
```bash
# MySQL Installer ile kurulum
https://dev.mysql.com/downloads/installer/

# XAMPP ile (kolay yol)
https://www.apachefriends.org/
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 2. Database Oluşturma

```sql
-- MySQL'de database oluştur
CREATE DATABASE livkors_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- User oluştur (opsiyonel)
CREATE USER 'livkors_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON livkors_db.* TO 'livkors_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Environment Variables (.env)

```env
# Local MySQL
DATABASE_URL="mysql://root:your_password@localhost:3306/livkors_db"

# Custom user ile
DATABASE_URL="mysql://livkors_user:strong_password@localhost:3306/livkors_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here-make-it-very-long-and-random"
```

### 4. Migration ve Seed

```bash
# Database migration
npx prisma db push

# Seed data
npm run db:seed
```

## ☁️ Production Seçenekleri

### 1. **PlanetScale** (Önerilen)
- **Avantajlar**: Serverless MySQL, otomatik scaling
- **Connection String**:
```env
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/database_name?sslaccept=strict"
```

### 2. **AWS RDS MySQL**
- **Avantajlar**: AWS ekosistemi entegrasyonu
- **Connection String**:
```env
DATABASE_URL="mysql://username:password@rds-instance.region.rds.amazonaws.com:3306/database_name"
```

### 3. **Railway MySQL**
- **Avantajlar**: Kolay kurulum ve yönetim
- **Connection String**:
```env
DATABASE_URL="mysql://username:password@containers-us-west-xxx.railway.app:port/database_name"
```

## 🚀 Vercel Deployment

### Environment Variables:
```env
DATABASE_URL="mysql://username:password@host:3306/database_name"
JWT_SECRET="your-super-secret-jwt-key-here"
```

### PlanetScale ile Vercel entegrasyonu:
1. PlanetScale hesabı oluştur
2. Database oluştur
3. Connection string'i kopyala
4. Vercel environment variables'a ekle

## 🔄 Migration Commands

```bash
# Development için push
npx prisma db push

# Production migration (önerilen)
npx prisma migrate deploy

# Schema değişikliklerini görüntüle
npx prisma migrate diff

# Prisma Studio (database viewer)
npx prisma studio
```

## ⚠️ Önemli Notlar

1. **Charset**: UTF8MB4 kullanın (emoji support için)
2. **Timezone**: MySQL server timezone'unu UTC olarak ayarlayın
3. **Backup**: Production'da düzenli backup alın
4. **Performance**: Index'leri optimize edin

## 🐛 Troubleshooting

### Connection Error:
```
Error: P1001: Can't reach database server
```
**Çözüm**: MySQL server'ın çalıştığından emin olun

### Authentication Error:
```
Error: Access denied for user
```
**Çözüm**: Username/password'u kontrol edin

### Database Not Found:
```
Error: Unknown database 'livkors_db'
```
**Çözüm**: Database'i oluşturun

## 📊 Performance Tips

1. **Connection Pooling**: Prisma otomatik yönetir
2. **Indexing**: `@@index` kullanın
3. **Query Optimization**: `select` kullanın
4. **Pagination**: `skip` ve `take` kullanın

Database başarıyla MySQL'e geçirildi! 🎉 