# Vercel Environment Variables - PostgreSQL

Vercel Dashboard'da şu environment variable'ları ekleyin:

## 🚀 Vercel Postgres Configuration

### Environment Variables

```env
# Vercel Postgres (Production)
DATABASE_URL=postgresql://username:password@host:5432/database_name
JWT_SECRET=your-super-secret-jwt-key-livkors-2024-very-secure
INIT_DB_TOKEN=livkors-init-2024
NODE_ENV=production
```

## 📋 Vercel Deployment Adımları

### 1. Vercel Storage - PostgreSQL Database Oluşturun

1. **Vercel Dashboard** > **Storage** sekmesi
2. **Create Database** > **Postgres**
3. **Database Name**: `livkors-db`
4. **Region**: Size yakın bölge seçin (örn: Frankfurt)
5. **Create** butonuna tıklayın

### 2. Connection String'i Alın

1. Database oluşturulduktan sonra
2. **Database Overview** > **Connect** sekmesi
3. **Environment Variables** bölümünden `DATABASE_URL`'i kopyalayın

### 3. Vercel Project Environment Variables

Vercel Dashboard > Project > Settings > Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` (Vercel Postgres'ten) | Production, Preview, Development |
| `JWT_SECRET` | `your-super-secret-jwt-key-livkors-2024-very-secure` | Production, Preview, Development |
| `INIT_DB_TOKEN` | `livkors-init-2024` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### 4. Build & Deploy

- GitHub integration aktifse otomatik deploy başlar
- Manuel deploy: `npx vercel --prod`

### 5. Database Initialization

Deploy sonrası database'i initialize etmek için:

```bash
curl -X POST https://your-app.vercel.app/api/init-db?token=livkors-init-2024
```

## ✅ Şu Anki Durum

- **Database**: ✅ PostgreSQL - Vercel Postgres Ready
- **Schema**: ✅ Prisma schema PostgreSQL provider'a güncellendi
- **Drivers**: ✅ pg ve @types/pg yüklendi
- **Client**: ✅ Prisma Client PostgreSQL için generate edildi

## 🔐 Admin Bilgileri

- **Email**: `admin@livkors.com`
- **Password**: `123456`

## 🎯 Production Hazır

Projeniz şimdi production'a deploy edilmeye hazır!
Vercel Postgres enterprise-grade bir PostgreSQL çözümüdür.

## 🚀 Deployment Komutu (CLI ile)

```bash
# Vercel CLI ile deploy
npx vercel --prod

# GitHub'dan otomatik deploy
git push origin main
```

## 📊 Vercel Postgres Avantajları

- **🌍 Global Edge Network**: Dünya çapında düşük latency
- **⚡ Connection Pooling**: Otomatik connection yönetimi
- **🔒 SSL/TLS Encryption**: Enterprise güvenlik
- **📈 Auto Scaling**: Trafik artışında otomatik scaling
- **💰 Hobby Plan**: Ücretsiz tier ile başlangıç
- **🛠️ Fully Managed**: Backup, monitoring, maintenance

## 🏁 Sonraki Adımlar

1. **Vercel Dashboard'da PostgreSQL database oluşturun**
2. **Environment variables'ları ekleyin**
3. **Deploy edin**
4. **Database'i initialize edin**
5. **Admin paneline giriş yapın**

Artık enterprise-grade PostgreSQL ile production'da çalışıyorsunuz! 🎉 