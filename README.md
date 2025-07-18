# Cursor AI Demo - Express TypeScript Server

A starter Express.js server built with TypeScript for the "AI-Assisted Coding Like a Pro" tutorial.

## Features

- Express.js server with TypeScript
- Hot reloading with nodemon
- ESLint for code quality
- Health check endpoint
- Error handling middleware
- JSON API responses

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Debug Mode
```bash
npm run dev:debug
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run dev:debug` - Start development server with debugger
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests

## API Endpoints

- `GET /` - Welcome message with timestamp
- `GET /health` - Health check endpoint

## Project Structure

```
src/
├── index.ts          # Main server file
├── routes/           # Route handlers (future)
├── middleware/       # Custom middleware (future)
└── types/           # TypeScript type definitions (future)
```

## What's Different from Basic Setup

1. **Error Handling** - Proper error middleware and 404 handling
2. **Health Check** - `/health` endpoint for monitoring
3. **JSON Responses** - Consistent API responses
4. **Code Quality** - ESLint configuration
5. **Better Scripts** - Development, debug, and build scripts
6. **TypeScript Strict Mode** - Better type safety

## Next Steps

1. Add more routes in `src/routes/`
2. Implement database connection
3. Add authentication middleware
4. Set up environment variables
5. Add comprehensive testing 