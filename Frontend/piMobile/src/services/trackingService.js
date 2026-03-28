import { API_BASE_URL } from '../config/api.js';

export async function getTrackingByCodigo(codigo) {
  if (!codigo || !codigo.trim()) {
    throw new Error('El codigo de rastreo es obligatorio.');
  }

  const response = await fetch(`${API_BASE_URL}/api/tracking/${codigo.trim()}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener el rastreo');
  }

  return data.data;
}
