# MedTriage-AI

UI-first medical triage system built with Next.js for frontend workflow prototyping.

## Project Scope

This repository currently focuses on the frontend experience for:

- Dashboard summary
- New triage assessment
- Prediction result screen
- Patient queue board
- Reusable UI components such as `TriageForm`, `ResultCard`, `QueueTable`, and summary cards

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules

## Project Structure

```text
src/
  app/
frontend/
  src/
    components/
```

## Run Locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

The repository root is configured as the deployable Next.js app, so Vercel can
deploy directly from the repository without changing the Root Directory.

## Notes

- The current implementation is frontend-only.
- Large local assets such as the raw CSV dataset and presentation PDF are excluded from Git by default.
