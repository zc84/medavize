# Medavize

[![Deploy to Netlify](https://github.com/zc84/medavize/actions/workflows/deploy.yml/badge.svg)](https://github.com/zc84/medavize/actions/workflows/deploy.yml)

Health data management and caregiver coordination platform.

## Features

- **Authentication**: Sign up/Login with email, phone, or OAuth (Google/Apple)
- **Onboarding**: 7-step guided setup process
- **Data Sources**: Connect and manage 8 health data sources:
  - EHR (Particle Health integration)
  - Apple Health
  - Google Health (Health Connect)
  - Manual vitals entry
  - Document upload with OCR
  - Audio recordings with transcription
  - Text notes with NLP extraction
  - Document scanning

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- LocalStorage (mock backend)

## Deployment Setup

This project uses GitHub Actions for automatic deployment to Netlify.

### Required Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **NETLIFY_AUTH_TOKEN**: Get from [Netlify User Settings](https://app.netlify.com/user/applications/personal)
2. **NETLIFY_SITE_ID**: Get from your Netlify site settings → Site information → Site ID

### Manual Deployment (Alternative)

```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

## Development

```bash
npm install
npm run dev
```

App runs on http://localhost:3002 by default.

## Branches

- `main` - Production branch (auto-deploys)
- `dev` - Development branch
- `ios_ux` - iOS UX improvements branch