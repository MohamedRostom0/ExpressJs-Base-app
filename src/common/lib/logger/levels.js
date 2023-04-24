export const customLevels = {
  levels: {
    fatal: 0, // Internal server error
    error: 1, // API Errors
    warn: 2, // Something is faulty but not reported to user (like s3, etc.)
    info: 3, // API calls, sockets action
    debug: 4, // Additional data used only for debugging (imports, cron jobs, etc.)
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'green',
  },
};
