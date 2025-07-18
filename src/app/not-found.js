export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </a>
          
          <div>
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Giriş Yap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 