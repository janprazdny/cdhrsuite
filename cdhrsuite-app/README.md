# CDHRSuite - Core HR Employee Database

A structured HR database application to store and manage core information about people working with the company – including employees and freelancers – across multiple legal entities and countries. This database serves as the single source of truth for HR operations and automation.

## Features

- Employee profile management with personal information, job details, and contract information
- Contract handling with fixed and variable remuneration
- Support for different currencies and remuneration frequencies
- Automatic monthly base remuneration calculation in EUR
- Working time reference configuration
- Currency exchange rate management
- Historical change tracking
- Export functionality for reporting

## Tech Stack

- **Frontend**: React, Next.js, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel with CI/CD

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/janprazdny/cdhrsuite.git
cd cdhrsuite
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory and add your PostgreSQL database URL:
```
DATABASE_URL="postgresql://username:password@localhost:5432/cdhrsuite?schema=public"
```

4. Create the database tables
```bash
npx prisma migrate dev --name init
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app` - Next.js application code
  - `/api` - API routes
  - `/components` - Reusable UI components
  - `/employees` - Employee-related pages 
  - `/settings` - Settings-related pages
  - `/lib` - Utility functions and database connection
- `/prisma` - Prisma schema and migrations
- `/public` - Static assets

## Database Schema

The database schema includes the following models:
- Employee - Core employee information
- Contract - Contract details with remuneration
- WorkingTimeReference - Configuration for time calculations
- CurrencyExchange - Exchange rates for currency conversions

## Development

### Running in Development Mode

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

## Deployment

The application is configured for deployment on Vercel with a PostgreSQL database.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
