import type { ApiError } from "../domain/ErrorApi";

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    ...options,
    headers,
  });

  await handlErrors(response);

  return response.json();
}

export const handlErrors = async (response: Response) => {
  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    const error = new Error(errorBody.error || "Unknown error") as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }
};
