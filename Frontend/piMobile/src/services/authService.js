import { API_BASE_URL } from '../config/api';

let currentUser = null;
let currentToken = null;

export const getCurrentUser = () => currentUser;
export const getCurrentToken = () => currentToken;

export const clearCurrentUser = () => {
  currentUser = null;
  currentToken = null;
};

function withAuthHeaders(baseHeaders = {}) {
  return {
    ...baseHeaders,
    ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
  };
}

export const loginRequest = async ({ correo, contrasena }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      correo,
      contrasena,
      origenAplicacion: 'mobile',
    }),
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo iniciar sesion.');
  }

  currentUser = data?.usuario ?? null;
  currentToken = data?.token ?? null;

  return data;
};

export const getPerfilUsuarioRequest = async (idUsuario) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/perfil/${idUsuario}`, {
    headers: withAuthHeaders(),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo cargar el perfil.');
  }

  return data?.data;
};

export const updatePerfilUsuarioRequest = async (idUsuario, payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/perfil/${idUsuario}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...withAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo actualizar el perfil.');
  }

  return data?.data;
};

export const registerRequest = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo crear la cuenta.');
  }

  return data?.data;
};

export const recoverPasswordRequest = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/recuperar-contrasena`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo procesar la recuperacion.');
  }

  return data?.data;
};

export const changePasswordRequest = async (idUsuario, payload) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/cambiar-contrasena/${idUsuario}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...withAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo actualizar la contrasena.');
  }

  return data?.data;
};
