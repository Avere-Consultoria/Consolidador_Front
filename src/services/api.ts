export const API_BASE_URL = 'http://localhost:3333';

export async function fetchApi(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `Erro na API: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
