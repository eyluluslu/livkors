# Vercel Environment Variables - Railway MySQL

Vercel Dashboard'da şu environment variable'ları ekleyin:

## 🚀 Railway MySQL Configuration

### Environment Variables

```env
DATABASE_URL=mysql://root:aRoeDNnUnDdbqXqosxiEMJorEJUDeMwa@tramway.proxy.rlwy.net:15903/railway
JWT_SECRET=your-super-secret-jwt-key-livkors-2024-very-secure
INIT_DB_TOKEN=livkors-init-2024
NODE_ENV=production
```

## 📋 Vercel Deployment Adımları

### 1. Vercel Dashboard'da Project Oluşturun
- Vercel.com'a gidin
- GitHub repository'nizi import edin
- Project name: `livkors-ecommerce`

### 2. Environment Variables Ekleyin
Vercel Dashboard > Settings > Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `mysql://root:aRoeDNnUnDdbqXqosxiEMJorEJUDeMwa@tramway.proxy.rlwy.net:15903/railway` |
| `JWT_SECRET` | `your-super-secret-jwt-key-livkors-2024-very-secure` |
| `INIT_DB_TOKEN` | `livkors-init-2024` |
| `NODE_ENV` | `production` |

### 3. Build & Deploy
- Vercel otomatik olarak build edecek
- Build başarılı olursa deployment tamamlanır

### 4. Database Initialization (İsteğe Bağlı)
Deploy sonrası database'i initialize etmek için:

```bash
curl -X POST https://your-app.vercel.app/api/init-db?token=livkors-init-2024
```

## ✅ Şu Anki Durum

- **Database**: ✅ Railway MySQL - Aktif
- **Tables**: ✅ Tüm tablolar oluşturuldu
- **Data**: ✅ 6 kategori, 8 ürün, admin user
- **Connection**: ✅ Test edildi ve çalışıyor

## 🔐 Admin Bilgileri

- **Email**: `admin@livkors.com`
- **Password**: `123456`

## 🎯 Production Hazır

Projeniz şimdi production'a deploy edilmeye hazır!
Railway MySQL database kalıcıdır ve Vercel ile mükemmel çalışır.

## 🚀 Deployment Komutu (CLI ile)

```bash
# Vercel CLI ile deploy
npx vercel --prod

# Veya GitHub'dan otomatik deploy
# Vercel GitHub integration aktif olduğunda
# Her push otomatik deploy tetikler
```

## 📊 Performans Notları

- Railway MySQL: Yüksek performans
- Global CDN: Vercel Edge Network
- Serverless Functions: Otomatik scaling
- Database Connection Pooling: Prisma ile optimize 