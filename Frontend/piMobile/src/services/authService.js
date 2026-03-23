import { API_BASE_URL } from '../config/api';

export const loginRequest = async ({ correo, contrasena, tipoAcceso }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      correo,
      contrasena,
      tipoAcceso,
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

  return data;
};
