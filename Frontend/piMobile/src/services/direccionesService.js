import { API_BASE_URL } from '../config/api';

async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function getDireccionesByUsuario(idUsuario) {
  const response = await fetch(`${API_BASE_URL}/api/direcciones/usuario/${idUsuario}`);
  const data = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudieron cargar las direcciones.');
  }

  return data?.data || [];
}

export async function createDireccionRequest(payload) {
  const response = await fetch(`${API_BASE_URL}/api/direcciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo guardar la direccion.');
  }

  return data?.data;
}

export async function updateDireccionRequest(idDireccion, payload) {
  const response = await fetch(`${API_BASE_URL}/api/direcciones/${idDireccion}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo actualizar la direccion.');
  }

  return data?.data;
}

export async function deleteDireccionRequest(idDireccion, payload) {
  const response = await fetch(`${API_BASE_URL}/api/direcciones/${idDireccion}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafe(response);

  if (!response.ok) {
    throw new Error(data?.message || 'No se pudo eliminar la direccion.');
  }

  return data?.data;
}
