import { API_BASE_URL } from '../config/api.js';

export async function getEnviosByUsuario(idUsuario) {
  const response = await fetch(`${API_BASE_URL}/api/envios/usuario/${idUsuario}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudieron cargar los envios');
  }

  return data.data || [];
}

export async function getDetalleEnvio(idEnvio) {
  const response = await fetch(`${API_BASE_URL}/api/envios/detalle/${idEnvio}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo cargar el detalle del envio');
  }

  return data.data;
}

export async function updateEnvioByCliente({ idEnvio, idUsuario, direccion_destino, ciudad_destino }) {
  const response = await fetch(`${API_BASE_URL}/api/envios/${idEnvio}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      direccion_destino,
      ciudad_destino,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo actualizar el envio');
  }

  return data.data;
}

export async function cancelEnvioByCliente({ idEnvio, idUsuario }) {
  const response = await fetch(`${API_BASE_URL}/api/envios/${idEnvio}/cancelar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idUsuario }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo cancelar el envio');
  }

  return data.data;
}

export async function marcarEnvioComoEntregado({ idEnvio, idUsuario, fotoEntregaUrl, recibioEntregaNombre }) {
  const response = await fetch(`${API_BASE_URL}/api/envios/${idEnvio}/entregar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      foto_entrega_url: fotoEntregaUrl || null,
      recibio_entrega_nombre: recibioEntregaNombre ? String(recibioEntregaNombre).trim() : null,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo marcar el envio como entregado');
  }

  return data.data;
}

export async function cancelarEnvioComoConductor({ idEnvio, idUsuario }) {
  const response = await fetch(`${API_BASE_URL}/api/envios/${idEnvio}/cancelar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idUsuario }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo cancelar el envio');
  }

  return data.data;
}

export async function createEnvioByCliente({
  idUsuario,
  remitente,
  destinatario,
  paquete,
}) {
  const response = await fetch(`${API_BASE_URL}/api/envios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      remitente,
      destinatario,
      paquete,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo crear el envio');
  }

  return data.data;
}
