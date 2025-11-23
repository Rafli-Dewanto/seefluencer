# Seefluencer - Course Learning Platform

## Demo

[Watch the demo video](https://jam.dev/c/9d3d7a9e-0e85-4cd0-93fd-36fdd13a5b67)

A modern, full-stack course learning platform built with Next.js 15^, TypeScript, and PostgreSQL.

## Features

- ✅ User authentication with auth.js
- ✅ Course management (admin dashboard)
- ✅ User progress tracking
- ✅ Quiz system with scoring
- ✅ Subscription system with Midtrans payment integration
- ✅ Access control for premium content
- ✅ Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** Next.js 15^, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, auth.js
- **Database:** PostgreSQL with Drizzle ORM
- **Payments:** Midtrans
- **UI Components:** ShadCN, Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ **OR** Docker and Docker Compose
- PostgreSQL database (if not using Docker)
- Midtrans account (for payments)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Rafli-Dewanto/seefluencer
cd seefluencer
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
DATABASE_URL=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

MIDTRANS_MERCHANT_ID=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_SERVER_KEY=
MIDTRANS_ENDPOINT=

POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

4. Set up the database:

```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed the database
pnpm db:seed
```

5. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Setup (Alternative)

If you prefer using Docker for the entire development environment:

### Prerequisites

- Docker and Docker Compose installed

### Quick Start with Docker

1. Clone the repository:

```bash
git clone https://github.com/Rafli-Dewanto/seefluencer
cd seefluencer
```

2. Start the services:

```bash
# Start PostgreSQL database
docker-compose up postgres -d

# Wait for database to be ready, then run migrations
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# Start the full application stack
docker-compose up
```

4. Access the application:

- **Application:** http://localhost:3000
- **Database:** localhost:5432

### Docker Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild and restart
docker-compose up --build
```

## Database Schema

The application uses the following main entities:

- **Users:** Authentication and profile data
- **Courses:** Course information with chapters and lessons
- **UserProgress:** Track lesson completion
- **Quizzes & QuizAttempts:** Quiz questions and user submissions
- **Plans & Subscriptions:** Subscription plans and user subscriptions

## API Routes

- `POST /api/auth/register` - User registration
- `POST /api/payment/create` - Create payment transaction
- `POST /api/payment/webhook` - Handle Midtrans webhooks

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── payment/
│   │   │   ├── create/route.ts
│   │   │   └── webhook/route.ts
│   │   └── plans/route.ts
│   ├── auth/              # Authentication pages
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── courses/           # Course pages
│   │   ├── [slug]/
│   │   │   ├── lessons/
│   │   │   │   └── [lessonSlug]/page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── dashboard/page.tsx # User dashboard
│   ├── page.tsx           # Home page
│   ├── subscription/page.tsx # Subscription page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── courses/no-content.tsx
│   ├── lessons/actions.tsx
│   ├── logout-button.tsx
│   ├── providers.tsx     # React providers
│   └── ui/               # UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── db/                   # Database configuration
│   ├── drizzle.ts        # Database connection
│   └── schema.ts         # Database schema
├── lib/                  # Utility libraries
│   ├── auth.ts           # auth configuration
│   └── utils.ts          # Helper functions
├── scripts/seed.ts       # Database seeding script
└── utils/currency.ts     # Currency utilities

Root files:
├── .dockerignore
├── .env
├── .env.example
├── .env.local
├── .gitignore
├── .prettierignore
├── .prettierrc
├── components.json
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
├── eslint.config.mjs
├── next-auth.d.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── REFERENCES.md
├── SEEFLUENCER.md
├── tsconfig.json
├── .husky/
│   ├── pre-commit
│   └── _/
├── .next/               # Build artifacts (generated)
├── drizzle/             # Database migrations (generated)
└── public/              # Static assets
```

</attachment>// filepath: README.md

# SeeFluencer - Course Learning Platform

A modern, full-stack course learning platform built with Next.js 15, TypeScript, and PostgreSQL.

## Features

- ✅ User authentication with auth.js
- ✅ Course management (admin dashboard)
- ✅ User progress tracking
- ✅ Quiz system with scoring
- ✅ Subscription system with Midtrans payment integration
- ✅ Access control for premium content
- ✅ Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, auth.js
- **Database:** PostgreSQL with Drizzle ORM
- **Payments:** Midtrans
- **UI Components:** ShadCN, Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ **OR** Docker and Docker Compose
- PostgreSQL database (if not using Docker)
- Midtrans account (for payments)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Rafli-Dewanto/seefluencer
cd seefluencer
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
DATABASE_URL=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

MIDTRANS_MERCHANT_ID=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_SERVER_KEY=
MIDTRANS_ENDPOINT=

POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

4. Set up the database:

```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed the database
pnpm db:seed
```

5. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Setup (Alternative)

If you prefer using Docker for the entire development environment:

### Prerequisites

- Docker and Docker Compose installed

### Quick Start with Docker

1. Clone the repository:

```bash
git clone https://github.com/Rafli-Dewanto/seefluencer
cd seefluencer
```

2. Start the services:

```bash
# Start PostgreSQL database
docker-compose up postgres -d

# Wait for database to be ready, then run migrations
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# Start the full application stack
docker-compose up
```

4. Access the application:

- **Application:** http://localhost:3000
- **Database:** localhost:5432

### Docker Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild and restart
docker-compose up --build
```

## Database Schema

The application uses the following main entities:

- **Users:** Authentication and profile data
- **Courses:** Course information with chapters and lessons
- **UserProgress:** Track lesson completion
- **Quizzes & QuizAttempts:** Quiz questions and user submissions
- **Plans & Subscriptions:** Subscription plans and user subscriptions

## API Routes

- `POST /api/auth/register` - User registration
- `POST /api/payment/create` - Create payment transaction
- `POST /api/payment/webhook` - Handle Midtrans webhooks

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── payment/
│   │   │   ├── create/route.ts
│   │   │   └── webhook/route.ts
│   │   └── plans/route.ts
│   ├── auth/              # Authentication pages
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── courses/           # Course pages
│   │   ├── [slug]/
│   │   │   ├── lessons/
│   │   │   │   └── [lessonSlug]/page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── dashboard/page.tsx # User dashboard
│   ├── page.tsx           # Home page
│   ├── subscription/page.tsx # Subscription page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── courses/no-content.tsx
│   ├── lessons/actions.tsx
│   ├── logout-button.tsx
│   ├── providers.tsx     # React providers
│   └── ui/               # UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── db/                   # Database configuration
│   ├── drizzle.ts        # Database connection
│   └── schema.ts         # Database schema
├── lib/                  # Utility libraries
│   ├── auth.ts           # auth configuration
│   └── utils.ts          # Helper functions
├── scripts/seed.ts       # Database seeding script
└── utils/currency.ts     # Currency utilities

Root files:
├── .dockerignore
├── .env
├── .env.example
├── .env.local
├── .gitignore
├── .prettierignore
├── .prettierrc
├── components.json
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
├── eslint.config.mjs
├── next-auth.d.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json
├── .husky/
│   ├── pre-commit
│   └── _/
├── .next/               # Build artifacts (generated)
├── drizzle/             # Database migrations (generated)
└── public/              # Static assets
```
