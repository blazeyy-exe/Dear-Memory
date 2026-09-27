// ─── API Client ───────────────────────────────────────────────────────────────
// This is the frontend HTTP client that communicates with the backend API.
// All requests include auth headers automatically.

import type { ApiResponse } from "./types";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem("dm_token", token);
  } else {
    localStorage.removeItem("dm_token");
  }
}

export function getAuthToken(): string | null {
  if (!authToken) {
    authToken = localStorage.getItem("dm_token");
  }
  return authToken;
}

// ─── Request helpers ──────────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json: ApiResponse<T> = await res.json();

    if (!res.ok) {
      return { success: false, error: json.error ?? `Request failed (${res.status})` };
    }

    return json;
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

// ─── Public methods ───────────────────────────────────────────────────────────

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};