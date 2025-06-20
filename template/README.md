# JTC React Starter Kit

A modern React + TypeScript starter template with Vite, Tailwind CSS, and shadcn/ui pre-configured.

## Features

- ⚡️ Vite for fast development
- 🎨 Tailwind CSS for styling
- 🧩 shadcn/ui component system ready
- 📝 TypeScript for type safety
- 🔧 ESLint & Prettier pre-configured
- 📦 React Query for server state management
- 🛣️ React Router for navigation
- 📋 React Hook Form with Zod validation

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run pretty` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## Adding shadcn/ui Components

This template is pre-configured for shadcn/ui. To add components:

```bash
npx shadcn@latest add button
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # shadcn/ui components
├── pages/         # Page components
├── model/         # Data layer
│   ├── api/       # API configuration
│   ├── enums/     # TypeScript enums
│   └── interfaces/ # TypeScript interfaces
└── lib/           # Utility functions
```
