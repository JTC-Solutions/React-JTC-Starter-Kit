# React TypeScript Template

This is a starter template for building React applications with TypeScript, Tailwind CSS, and modern tooling.

## Template Features

### Core Technologies
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query (TanStack Query)** for server state management
- **React Hook Form** with Zod validation
- **Axios** for HTTP requests

### Pre-configured Components
- **Authentication System**:
  - Login page with form validation
  - Authentication API hooks (`useLoginMutation`, `useCurrentUserQuery`)
  - Token-based authentication with Axios interceptors
  - Protected routes pattern
  
- **UI Components**:
  - Button component with variants
  - Form components (Input, Select, etc.)
  - Toast notifications
  - Card components
  - Responsive layouts

### Project Structure
```
template/
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets (images, etc.)
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # Base UI components
│   │   │   └── WithPermissionsCheck.tsx
│   │   ├── lib/            # Utilities (cn function, etc.)
│   │   ├── model/          # Data layer
│   │   │   ├── api/        # API hooks and axios setup
│   │   │   ├── enums/      # TypeScript enums
│   │   │   ├── interfaces/ # TypeScript interfaces
│   │   │   ├── hooks/      # Custom hooks
│   │   │   └── utils/      # Utility functions
│   │   ├── pages/          # Page components
│   │   │   └── auth/       # Authentication pages
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # App entry point
│   ├── public/
│   └── index.html
```

### Authentication Flow
1. User submits login form with email/password
2. `useLoginMutation` sends credentials to `/api/v1/login`
3. Token is stored in localStorage
4. Axios interceptor adds token to all requests
5. On success, console warns: "Logged in, please define route"
6. Implement your own routing logic after login

### Permissions System
- Basic permission structure included (read/modify/delete)
- `WithPermissionsCheck` component for conditional rendering
- `usePermissions` hook for checking user permissions
- Extend as needed for your application

### API Integration
- Axios instance pre-configured with:
  - Base URL: `/api/v1`
  - Authentication interceptor
  - Error handling with toast notifications
  - Automatic token removal on 401 errors
  - Empty string to null conversion for PUT/POST

### Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run typecheck

# Format code
npm run pretty

# Lint code
npm run lint

# Build for production
npm run build
```

## Getting Started

1. **Clone/Copy this template** to your new project directory

2. **Update branding**:
   - Replace `src/assets/CTP-horizontal.jpg` with your logo
   - Update login page text and styling

3. **Configure API endpoint**:
   - Update base URL in `src/model/api/api.ts` if needed
   - Implement your backend API endpoints

4. **Extend authentication**:
   - Add user registration
   - Implement password reset flow
   - Add proper routing after login

5. **Add your features**:
   - Create new pages in `src/pages/`
   - Add new API hooks in `src/model/api/`
   - Extend enums and interfaces as needed

## Code Quality

### Before Committing
Always run these checks:
```bash
npm run typecheck
npm run pretty
npm run lint
```

### TypeScript Best Practices
- Use strict type checking
- Define interfaces for all API responses
- Use enums for constants
- Avoid `any` type

### Component Guidelines
- Keep components small and focused
- Use custom hooks for business logic
- Implement proper error boundaries
- Follow React best practices

## Customization

### Styling
- Tailwind configuration in `tailwind.config.js`
- Global styles in `src/index.css`
- Component variants using CVA (class-variance-authority)

### Routing
- Routes defined as enums in `src/model/enums/RoutesEnum.ts`
- Add new routes as needed
- Implement protected routes pattern

### State Management
- React Query for server state
- React Hook Form for form state
- Context API for global UI state (theme, etc.)

## Notes
- This template is designed as a starting point
- Remove unused code before production
- Update security measures based on your requirements
- Consider adding:
  - Error boundaries
  - Loading states
  - Offline support
  - PWA configuration
  - Testing setup (Jest, React Testing Library)
  - CI/CD pipeline configuration