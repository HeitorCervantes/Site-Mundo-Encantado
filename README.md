# Mundo Encantado — Landing Page (Next.js + Tailwind)

Projeto completo com:
- Next.js 14 + TypeScript
- Tailwind CSS
- Framer Motion + lucide-react
- Integração de Reviews do Google (Places API) em `/api/reviews`

## Como rodar localmente
```bash
npm install
npm run dev
# abrir http://localhost:3000
```

## Deploy (Vercel recomendado)
1. Suba este repositório no GitHub.
2. Em `Vercel -> New Project`, importe o repo.
3. Em `Settings -> Environment Variables` crie:
   - `GOOGLE_MAPS_API_KEY` = sua chave
   - `GOOGLE_PLACE_ID` = ChIJ08S7Lm7HuZQRE2Oo6vYpkQ4
   - `GOOGLE_PLACE_TEXTQUERY` = Mundo Encantado Ribeirão Preto l Recreação Infantil (opcional)
   - `REVIEWS_MIN_RATING` = 4
   - `REVIEWS_MAX_REVIEWS` = 6 (a API retorna até 5)
   - `REVIEWS_LANGUAGE` = pt-BR
4. Deploy. Teste `https://seu-dominio/api/reviews`.

## Vídeo do herói (9:16)
- Faça upload do arquivo `public/HomemAranha.mp4` (não incluído no repo).
- O componente já aponta para `"/HomemAranha.mp4"` em produção.

## Observações
- Botões de WhatsApp abrem nova aba no desktop e tentam abrir o app no mobile (com fallback em 400ms).
- Navbar com link para página de Serviços (single-file router no preview) e scroll suave entre âncoras.
- Se `/api/reviews` não responder, a seção Depoimentos usa conteúdo estático.
