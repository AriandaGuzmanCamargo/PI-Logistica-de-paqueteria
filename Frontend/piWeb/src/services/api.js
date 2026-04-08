const apiBaseUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');

function resolveApiUrl(path) {
  if (!path) {
    return apiBaseUrl || '';
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (apiBaseUrl) {
    return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export async function apiFetch(path, options = {}) {
  return fetch(resolveApiUrl(path), options);
}

export function getApiBaseUrl() {
  return apiBaseUrl;
}

export { resolveApiUrl };