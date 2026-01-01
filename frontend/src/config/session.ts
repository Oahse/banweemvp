// frontend/src/config/session.ts

interface SessionConfig {
  warningThreshold: number; // in milliseconds
  warningDisplayDuration: number; // in milliseconds
  showSessionWarnings: boolean;
  sessionStatusCheckInterval: number; // in milliseconds
}

export const getSessionConfig = (): SessionConfig => {
  return {
    warningThreshold: 10 * 60 * 1000, // 10 minutes
    warningDisplayDuration: 15 * 1000, // 15 seconds
    showSessionWarnings: true,
    sessionStatusCheckInterval: 60 * 1000, // 1 minute
  };
};