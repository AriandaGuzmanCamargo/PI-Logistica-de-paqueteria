export function getWebUser() {
  const raw = localStorage.getItem('piWebUser');

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

export async function getEnviosOperador() {
  const user = getWebUser();

  if (!user?.id_usuario) {
    throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
  }

  const response = await fetch(`/api/envios/usuario/${user.id_usuario}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar los envios.');
  }

  return payload.data || [];
}

export async function getDetalleEnvio(idEnvio) {
  const response = await fetch(`/api/envios/detalle/${idEnvio}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cargar el detalle del envio.');
  }

  return payload.data;
}

function normalizeEstado(estado) {
  return String(estado || '').toLowerCase().trim().replace(/\s+/g, '_');
}

export function estadoEnvioTexto(estado) {
  const normalized = normalizeEstado(estado);

  const map = {
    pendiente: 'Pendiente',
    en_ruta: 'En ruta',
    en_transito: 'En transito',
    entregado: 'Entregado',
    retrasado: 'Retrasado',
    cancelado: 'Cancelado',
  };

  return map[normalized] || 'Sin estado';
}

export function estadoEnvioClase(estado) {
  const normalized = normalizeEstado(estado);

  if (normalized === 'en_ruta' || normalized === 'en_transito') return 'estado--transito';
  if (normalized === 'retrasado') return 'estado--retrasado';
  if (normalized === 'entregado') return 'estado--entregado';
  if (normalized === 'cancelado') return 'estado--cancelado';

  return 'estado--pendiente';
}
