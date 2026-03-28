import { API_BASE_URL } from '../config/api.js';

export async function getNotificacionesByUsuario(idUsuario) {
  const response = await fetch(`${API_BASE_URL}/api/notificaciones/usuario/${idUsuario}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudieron cargar las notificaciones');
  }

  return data.data || [];
}
