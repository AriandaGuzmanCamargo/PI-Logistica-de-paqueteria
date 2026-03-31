const MAX_HISTORY_ITEMS = 10;

// Historial en memoria durante la sesion actual de la app, separado por usuario.
const trackingHistoryByUser = new Map();

function normalizeCode(codigo) {
  return String(codigo || '').trim().toUpperCase();
}

export function getTrackingHistoryByUser(idUsuario) {
  const key = Number(idUsuario);

  if (!Number.isInteger(key) || key <= 0) {
    return [];
  }

  return trackingHistoryByUser.get(key) || [];
}

export function addTrackingHistoryEntry({ idUsuario, codigo, trackingData }) {
  const key = Number(idUsuario);
  const code = normalizeCode(codigo);

  if (!Number.isInteger(key) || key <= 0 || !code) {
    return [];
  }

  const previous = trackingHistoryByUser.get(key) || [];
  const withoutDuplicatedCode = previous.filter((item) => item.codigo !== code);

  const nextEntry = {
    codigo: code,
    id_envio: trackingData?.envio?.id_envio || null,
    estado:
      trackingData?.tracking?.[0]?.estado_paquete ||
      trackingData?.envio?.estado ||
      null,
    fechaBusqueda: new Date().toISOString(),
  };

  const updated = [nextEntry, ...withoutDuplicatedCode].slice(0, MAX_HISTORY_ITEMS);
  trackingHistoryByUser.set(key, updated);

  return updated;
}
