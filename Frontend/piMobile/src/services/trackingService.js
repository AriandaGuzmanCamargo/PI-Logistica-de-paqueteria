import { API_BASE_URL } from '../config/api.js';

async function parseResponse(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (_error) {
    return {};
  }
}

function getErrorMessage(data, fallback) {
  return data?.message || data?.error || fallback;
}

export async function getTrackingByCodigo(codigo) {
  if (!codigo || !codigo.trim()) {
    throw new Error('El codigo de rastreo es obligatorio.');
  }

  const response = await fetch(`${API_BASE_URL}/api/tracking/${codigo.trim()}`);
  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, 'Error al obtener el rastreo.'));
  }

  return data.data;
}

export async function getTrackingPublico({ codigo, correo, telefono }) {
  const normalizedCode = String(codigo || '').trim();
  const normalizedEmail = String(correo || '').trim();
  const normalizedPhone = String(telefono || '').trim();

  if (!normalizedCode) {
    throw new Error('El codigo de rastreo es obligatorio.');
  }

  if (!normalizedEmail && !normalizedPhone) {
    throw new Error('Ingresa correo o telefono para validar la consulta.');
  }

  const response = await fetch(`${API_BASE_URL}/api/tracking/publico/${encodeURIComponent(normalizedCode)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      correo: normalizedEmail || undefined,
      telefono: normalizedPhone || undefined,
    }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, 'No fue posible consultar el envio.'));
  }

  return data.data;
}
