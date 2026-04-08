const API_URL = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');

function resolveApiUrl(endpoint = '') {
  if (!endpoint) return API_URL || '';
  if (/^https?:\/\//i.test(endpoint)) return endpoint;

  const normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_URL ? `${API_URL}${normalized}` : normalized;
}

function withDefaultHeaders(options = {}) {
  const token = localStorage.getItem('token');

  return {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

export async function apiFetch(endpoint, options = {}) {
  return fetch(resolveApiUrl(endpoint), withDefaultHeaders(options));
}

async function requestJson(endpoint, options = {}) {
  const response = await apiFetch(endpoint, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Error HTTP: ${response.status}`);
  }

  return data;
}

export const api = {
  get(endpoint, options = {}) {
    return requestJson(endpoint, options);
  },

  post(endpoint, body, options = {}) {
    return requestJson(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
      ...options,
    });
  },

  patch(endpoint, body, options = {}) {
    return requestJson(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
      ...options,
    });
  },

  delete(endpoint, body, options = {}) {
    const hasBody = typeof body !== 'undefined';

    return requestJson(endpoint, {
      method: 'DELETE',
      headers: {
        ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
      ...(hasBody ? { body: JSON.stringify(body) } : {}),
      ...options,
    });
  },
};

export function getApiBaseUrl() {
  return API_URL;
}

export { resolveApiUrl };