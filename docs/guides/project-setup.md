# 🚀 Project Setup

This guide walks through the steps to set up the CYOA Portfolio project for local development.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DouglasMacKrell/douglas-mackrell-cyoa-portfolio.git
   cd douglas-mackrell-cyoa-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will start in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm start` - Runs the production server
- `npm run lint` - Runs the linter to check for code quality issues
- `npm test` - Runs the Jest test suite
- `npm run test:watch` - Runs tests in watch mode

## Project Structure

```
douglas-mackrell-cyoa-portfolio/
├── app/                # Next.js app directory with page components
├── components/         # Reusable UI components
├── lib/                # Utility functions and shared code
├── public/             # Static assets
├── docs/               # Project documentation
├── __tests__/          # Test files
├── .cursor/            # Cursor AI configuration
├── components.json     # UI components configuration
├── PLANNING.md         # Project plan and architecture
├── TASK.md             # Current development tasks
├── SUMMARY.md          # Project progress summary
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Branching Strategy

We follow a modified Git Flow approach:

- `main` - Production-ready code
- `develop` - Main development branch, all features merge here
- `feature/*` - Individual feature branches
- `docs/*` - Documentation branches
- `bugfix/*` - Bug fix branches

## Next Steps After Setup

1. Read the [PLANNING.md](../../PLANNING.md) document to understand the project architecture
2. Check [TASK.md](../../TASK.md) for current development priorities
3. Review the [Style Guide](./style-guide.md) before making changes
4. Run the tests to ensure everything is working: `npm test` 