# Стоматология «Жуйкан» — продающий лендинг

Лендинг государственной стоматологической клиники «Жуйкан» (RuiKang, Хэйхэ, КНР)
для русскоязычных пациентов. Next.js 14 (App Router) + TypeScript + Tailwind CSS
+ Framer Motion.

## Возможности

- Главная страница с 17 продающими секциями (hero, сравнение цен, услуги,
  калькулятор, кейсы «до/после», отзывы, FAQ и т.д.)
- 6 страниц услуг: `/implantatsiya`, `/korunki-circoniy`, `/protezirovanie`,
  `/viniry`, `/ortodontiya`, `/lechenie-kariesa`
- Интерактивный калькулятор стоимости с анимированным счётчиком
- Слайдер «до/после» (drag)
- Форма заявки → API route `/api/lead` (сохранение в JSON + уведомление в Telegram)
- SEO: метатеги, Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt`,
  JSON-LD `MedicalClinic`
- Mobile-first, sticky-bar и floating-кнопки WhatsApp/Telegram/звонок

## Локальный запуск

```bash
npm install
cp .env.example .env.local   # заполните при необходимости
npm run dev                  # http://localhost:3000
```

Production-сборка:

```bash
npm run build
npm run start
```

## Переменные окружения

См. `.env.example`:

- `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather (для уведомлений о заявках)
- `TELEGRAM_CHAT_ID` — ID чата/канала для уведомлений
- `NEXT_PUBLIC_SITE_URL` — публичный URL (для SEO и sitemap)

Если переменные Telegram не заданы — заявки всё равно принимаются и пишутся в
`data/leads.json` (локально), уведомление просто пропускается.

## Замена ассетов

Сейчас все изображения — это градиентные плейсхолдеры
(`components/ui/Placeholder.tsx`).

Чтобы подставить реальные фото:

1. Положите файлы в `public/assets/` (`logo.png`, `clinic-*.jpg`,
   `doctor-*.jpg`, `case-before-*.jpg`, `case-after-*.jpg`, `hotel-*.jpg`,
   `heihe-*.jpg`).
2. Замените компонент `<Placeholder ... />` на `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/assets/clinic-1.jpg"
  alt="Клиника Жуйкан"
  width={800}
  height={1000}
  className="rounded-[1.5rem] object-cover"
/>
```

Места для замены: `Hero`, `About`, `Doctors`, `BeforeAfter`, hero страниц услуг.

## Контент

Весь текстовый контент вынесен в данные:

- `lib/site.ts` — контакты, ссылки на соцсети
- `lib/content.ts` — услуги, цены, отзывы, FAQ, шаги, калькулятор
- `lib/servicePages.ts` — контент 6 страниц услуг

## Деплой на Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Через CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

В настройках проекта Vercel добавьте переменные окружения из `.env.example`.

> Примечание: на serverless файловая система только для чтения, поэтому
> `data/leads.json` на Vercel не пишется — основной канал уведомлений там
> Telegram. Для надёжного хранения подключите БД или внешний CRM в
> `app/api/lead/route.ts`.

## Структура

```
app/
  layout.tsx          # шрифты, SEO, JSON-LD, Header/Footer/FloatingCTA
  page.tsx            # главная (сборка секций)
  [slug]/page.tsx     # шаблон страницы услуги (6 страниц)
  api/lead/route.ts   # приём заявок
  sitemap.ts / robots.ts
components/
  Header, Footer, FloatingCTA
  ui/                 # Section, Reveal, Placeholder, BeforeAfter
  sections/           # все секции лендинга
lib/                  # site, content, servicePages, cn
```
