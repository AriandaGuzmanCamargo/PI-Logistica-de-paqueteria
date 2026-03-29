import { API_BASE_URL } from '../config/api.js';

export async function getIncidenciasByUsuario(idUsuario) {
  const response = await fetch(`${API_BASE_URL}/api/incidencias/usuario/${idUsuario}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudieron cargar las incidencias.');
  }

  return data.data || [];
}

export async function createIncidenciaByUsuario({
  idUsuario,
  idEnvio,
  tipoIncidencia,
  descripcion,
  fotoEvidencia,
}) {
  const response = await fetch(`${API_BASE_URL}/api/incidencias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      idEnvio,
      tipoIncidencia,
      descripcion,
      fotoEvidencia,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo registrar la incidencia.');
  }

  return data.data;
}
