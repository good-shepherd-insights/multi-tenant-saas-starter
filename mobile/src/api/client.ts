/**
 * HTTP client for the FixPro backend API.
 *
 * All requests go through `apiFetch` which:
 * - Prepends the configured API_URL
 * - Injects the Better Auth session cookie/token from secure storage
 * - Sets JSON content-type by default
 * - Throws typed errors on non-OK responses
 */

import { ENV } from "@/constants/env";

/** Custom error class that carries the HTTP status and parsed body. */
export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    const message =
      typeof body === "object" && body !== null && "message" in body
        ? String((body as { message: unknown }).message)
        : `API error ${status}`;

    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

/**
 * Low-level fetch wrapper.
 *
 * Automatically adds the base URL and auth headers. Returns parsed JSON.
 * Throws `ApiError` on non-2xx responses.
 */
export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${ENV.API_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // send cookies for Better Auth session
  });

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }
    throw new ApiError(res.status, body);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

/** Convenience helpers */

export function apiGet<T = unknown>(path: string) {
  return apiFetch<T>(path, { method: "GET" });
}

export function apiPost<T = unknown>(path: string, body?: unknown) {
  return apiFetch<T>(path, {
    method: "POST",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiPut<T = unknown>(path: string, body?: unknown) {
  return apiFetch<T>(path, {
    method: "PUT",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiPatch<T = unknown>(path: string, body?: unknown) {
  return apiFetch<T>(path, {
    method: "PATCH",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiDelete<T = unknown>(path: string) {
  return apiFetch<T>(path, { method: "DELETE" });
}