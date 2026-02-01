# arya-terzi-pro

## Local development

### Prerequisites

- Node.js 18+
- Docker Desktop

### Run infrastructure

```bash
docker compose up -d
```

### Backend

```bash
# in /backend
npm install
npm run dev
```

### Frontend

```bash
# in /frontend
npm install
npm run dev
```

## GitHub'a klasörden yükleme

1. GitHub'da yeni bir repo oluştur.
2. Bu klasörde `node_modules` veya `.env` gibi dosyaları ekleme. Repo zaten `.gitignore` ile bunları hariç tutar.
3. GitHub web arayüzünde `Add file -> Upload files` ile `arya-terzi-pro/` içeriğini yükle.

