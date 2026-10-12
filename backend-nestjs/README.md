# Titli NestJS Backend

A production-minded NestJS + TypeScript starting point for the Titli Foundation project. It is intentionally located in `backend-nestjs/` so it does **not** replace or change the existing Python/FastAPI service in `backend/`.

This scaffold provides environment loading and validation, a global configuration module, basic HTTP hardening, CORS configuration, request validation, a health endpoint, and tests for the environment schema. It does not yet migrate existing FastAPI routes or connect the NestJS process to MongoDB, Stripe, or the email provider.

## Requirements

Use Node.js **24 LTS** (or at least `22.22.3`) and npm 10.9 or newer. The NestJS 12 CLI's generators require a newer Node.js patch level than the application runtime itself.

Check your versions:

```bash
node --version
npm --version
```

## Local setup

From the repository root:

```bash
cd backend-nestjs
npm install
```

Create a local environment file:

**PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run start:dev
```

The health endpoint should respond at `http://localhost:3001/api/health`.

## Useful commands

```bash
npm run build       # Compile the production build into dist/
npm run start:prod  # Run the compiled application
npm run typecheck   # Type-check application source
npm run lint        # Check formatting
npm test            # Run environment configuration tests
npm run test:watch  # Run tests in watch mode
```

## Environment and secrets

`src/config/env.validation.ts` is the single validation point for application configuration. `ConfigModule` loads `.env.local` and `.env`, validates values at startup, and makes `ConfigService` globally available. Environment variables injected by a deployment platform take precedence over local files.

| Variable | Purpose | Default / status |
| --- | --- | --- |
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | HTTP listening port | `3001` |
| `CORS_ORIGINS` | Comma-separated allowed browser origins | `http://localhost:3000` |
| `DB_NAME` | Intended MongoDB database name | `titli_foundation` |
| `MONGO_URL` | MongoDB connection string | Optional until database integration is implemented |
| `JWT_SECRET` | Secret for future token-signing integration | Optional for this scaffold; if supplied, must be at least 32 characters |
| `STRIPE_API_KEY` | Stripe secret API key | Optional until payment integration is implemented |
| `EMERGENT_EMAIL_KEY` | Email provider secret | Optional until email integration is implemented |
| `EMAIL_FROM_NAME` | Display name used for outgoing email | `Titli Foundation` |

Generate a unique JWT secret when the authentication module is implemented:

```bash
node --input-type=module -e "import { randomBytes } from 'node:crypto'; console.log(randomBytes(32).toString('hex'))"
```

Keep real credentials in your local `.env` or your deployment provider's secret manager. Never commit `.env`, credentials, API keys, tokens, or production secrets. `.env.example` contains only placeholders and is safe to share.

For production, set `NODE_ENV=production`, configure `CORS_ORIGINS` with the exact HTTPS frontend origin(s), and add only the secrets required by the modules that have actually been implemented. Do not use production credentials in local development.

## Integration boundary

The existing `backend/` remains the current FastAPI backend and its existing deployment configuration is untouched by this scaffold. Treat this NestJS service as a separate starting point until the project owner confirms the migration plan, API compatibility requirements, and deployment cutover. Do not deploy it as a replacement for FastAPI yet.
