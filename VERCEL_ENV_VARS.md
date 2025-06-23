# Vercel Environment Variables

Vercel Dashboard'da şu environment variable'ları ekleyin:

## Gerekli Environment Variables

```
DATABASE_URL=file:/tmp/database.db
JWT_SECRET=your-super-secret-jwt-key-livkors-2024-very-secure
INIT_DB_TOKEN=livkors-init-2024
DISABLE_ERD=true
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

SQLite database `/tmp/database.db` konumunda oluşturulacak.
Bu temporary bir lokasyon olduğu için her deploy'da database sıfırlanacak.

Production için PostgreSQL kullanmanız önerilir.

## Admin Bilgileri

- Email: admin@livkors.com
- Password: 123456
- Role: ADMIN

## Önemli Notlar

- SQLite Vercel'de her deploy'da sıfırlanır
- Production için PostgreSQL/MySQL önerilir
- Database automatic olarak seed edilecek
- Site ayarları ve kategoriler otomatik oluşacak 