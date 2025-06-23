# Vercel Environment Variables

Vercel Dashboard'da şu environment variable'ları ekleyin:

## Gerekli Environment Variables (MySQL)

```
DATABASE_URL=mysql://username:password@host:3306/database_name
JWT_SECRET=your-super-secret-jwt-key-livkors-2024-very-secure
INIT_DB_TOKEN=livkors-init-2024
NODE_ENV=production
```

## PlanetScale Örneği (Önerilen)

```
DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud/database_name?sslaccept=strict
JWT_SECRET=your-super-secret-jwt-key-livkors-2024-very-secure
INIT_DB_TOKEN=livkors-init-2024
NODE_ENV=production
```

## Deployment Sonrası

1. Deploy tamamlandıktan sonra database'i initialize etmek için:
   ```
   curl -X POST https://your-app.vercel.app/api/init-db?token=livkors-init-2024
   ```

2. Veya manuel olarak admin oluşturmak için admin panelde:
   - Email: admin@livkors.com
   - Password: 123456

## Database Yapısı

MySQL database cloud provider'da (PlanetScale, AWS RDS, vb.) hosted olacak.
Production için kalıcı ve güvenilir bir çözüm.

Önerilen provider: **PlanetScale** (serverless MySQL)

## Admin Bilgileri

- Email: admin@livkors.com
- Password: 123456
- Role: ADMIN

## Önemli Notlar

- MySQL database kalıcıdır ve deploy'da korunur
- PlanetScale ücretsiz tier 10GB'a kadar sunar
- Database automatic olarak seed edilecek
- Site ayarları ve kategoriler otomatik oluşacak
- MySQL performans ve ölçeklenebilirlik avantajları sunar 