# Product Review Platform

Product Review Platform is a MERN-style full-stack review system built for product browsing, feedback capture, and authenticated review submission. It demonstrates how JWT-secured APIs and reusable React components can be shaped into a cleaner commerce-style experience.

## What This Project Shows

- Product catalog browsing
- Authenticated review posting with JWT
- Review summaries and customer sentiment display
- Frontend and backend separation for portfolio clarity
- A more polished storefront-style UI than a basic CRUD screen

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express, JSON Web Token

## Folder Structure

```text
product-review-platform/
  backend/
    src/
  frontend/
    src/
```

## Local Run Guide

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend URL: `http://localhost:4003`

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## API Endpoints

- `GET /health`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/reviews`

## Suggested GitHub Description

MERN-style product review platform with JWT authentication, storefront UI, and review submission workflows.
