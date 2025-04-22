import { PrismaClient } from '@prisma/client';

// Add better error handling for connection issues
const createPrismaClient = () => {
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' 
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
    });
    
    // Verify database connectivity
    client.$connect()
      .then(() => console.log('Database connection established'))
      .catch(e => console.error('Database connection failed:', e.message));
      
    return client;
  } catch (error) {
    console.error('Failed to initialize Prisma Client:', error);
    // Return a dummy client that won't crash the app if DB is unavailable
    return {
      $connect: async () => console.log('Using fallback Prisma client'),
      $disconnect: async () => console.log('Disconnecting fallback Prisma client'),
    } as unknown as PrismaClient;
  }
};

// Use global to prevent multiple instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || createPrismaClient();

// Only save prisma to global in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;