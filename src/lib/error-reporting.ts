type ErrorReportingOptions = {
  boundary?: string;
  route?: string;
  [key: string]: unknown;
};

/**
 * Global client-side error reporter.
 * Logs structured error details to console in development and provides
 * a clean extension point for third-party production monitoring (e.g., Sentry).
 */
export function reportError(error: unknown, context: ErrorReportingOptions = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    error,
    route: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...context,
  };

  if (process.env.NODE_ENV !== "production") {
    console.error("[DearMemory Error]", payload);
  }
}
