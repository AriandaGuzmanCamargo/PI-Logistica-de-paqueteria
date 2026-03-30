import { API_BASE_URL } from '../config/api.js';

export async function getNotificacionesByUsuario(idUsuario) {
  const response = await fetch(`${API_BASE_URL}/api/notificaciones/usuario/${idUsuario}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudieron cargar las notificaciones');
  }

  return data.data || [];
}

export async function marcarNotificacionComoLeida({ idNotificacion, idUsuario }) {
  const response = await fetch(`${API_BASE_URL}/api/notificaciones/${idNotificacion}/leida`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idUsuario }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo marcar la notificacion como leida');
  }

  return data.data;
}

export async function marcarTodasComoLeidas(idUsuario) {
  const response = await fetch(`${API_BASE_URL}/api/notificaciones/usuario/${idUsuario}/leidas`, {
    method: 'PATCH',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudieron actualizar las notificaciones');
  }

  return data.data;
}
