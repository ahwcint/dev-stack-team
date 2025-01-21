// logger.ts
import pino from 'pino';

// Conditionally enable pretty printing based on environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Set up the Pino logger
const logger = pino(
  isDevelopment
    ? {
        level: 'debug', // Log level for development
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true, // Colorize output
            translateTime: 'SYS:standard', // Human-readable timestamp
          },
        },
      }
    : {
        level: 'info', // Log level for production
      },
);

export default logger;
