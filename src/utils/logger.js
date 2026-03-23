export const createLogEntry = (level, message, metadata = {}) => {
  const entry = {
    level,
    timestamp: new Date().toISOString(),
    message,
    ...metadata,
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(entry));
};

export const logger = {
  info: (message, metadata) => createLogEntry('info', message, metadata),
  warn: (message, metadata) => createLogEntry('warn', message, metadata),
  error: (message, metadata) => createLogEntry('error', message, metadata),
};
