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
frontend/
  src/
    app/
    components/
```

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

## Notes

- The current implementation is frontend-only.
- Large local assets such as the raw CSV dataset and presentation PDF are excluded from Git by default.
