export function getWebUser() {
  const raw = localStorage.getItem('piWebUser');

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

function ensureSession() {
  const user = getWebUser();

  if (!user?.id_usuario) {
    throw new Error('No hay sesión activa. Inicia sesión nuevamente.');
  }

  return user;
}

export async function getPerfilOperador() {
  const user = ensureSession();

  const response = await fetch(`/api/auth/perfil/${encodeURIComponent(user.id_usuario)}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cargar el perfil del operador.');
  }

  return payload.data;
}

export async function actualizarFotoPerfilOperador(fotoPerfilUrl) {
  const user = ensureSession();

  const response = await fetch(`/api/auth/perfil/${encodeURIComponent(user.id_usuario)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      foto_perfil_url: fotoPerfilUrl || '',
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'No se pudo actualizar la foto de perfil.');
  }

  localStorage.setItem(
    'piWebUser',
    JSON.stringify({
      ...(getWebUser() || {}),
      id_usuario: data.data.id_usuario,
      nombre: data.data.nombre,
      apellido: data.data.apellido,
      correo: data.data.correo,
      rol: data.data.rol,
      foto_perfil_url: data.data.foto_perfil_url || null,
    })
  );

  return data.data;
}

export async function getEnviosOperador() {
  const user = ensureSession();

  const response = await fetch(`/api/envios/usuario/${user.id_usuario}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar los envíos.');
  }

  return payload.data || [];
}

export async function getDetalleEnvio(idEnvio) {
  const response = await fetch(`/api/envios/detalle/${idEnvio}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cargar el detalle del envío.');
  }

  return payload.data;
}

export async function autoAsignarEnvio({ idEnvio, idUsuario }) {
  const response = await fetch(`/api/asignaciones/auto/${idEnvio}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idUsuario }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo autoasignar el envío.');
  }

  return payload.data;
}

export async function asignarEnvioConConductor({ idEnvio, idConductor, fechaAsignacion }) {
  const user = ensureSession();

  const response = await fetch(`/api/asignaciones/manual/${idEnvio}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario: user.id_usuario,
      idConductor,
      fechaAsignacion,
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo asignar el envío al conductor seleccionado.');
  }

  return payload.data;
}

export async function getIncidenciasOperador() {
  const user = ensureSession();

  const response = await fetch(`/api/incidencias/usuario/${user.id_usuario}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar las incidencias.');
  }

  return payload.data || [];
}

export async function getNotificacionesOperador() {
  const user = ensureSession();

  const response = await fetch(`/api/notificaciones/usuario/${encodeURIComponent(user.id_usuario)}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar las notificaciones.');
  }

  return payload.data || [];
}

export async function updateIncidenciaStatus(idIncidencia, nuevoEstado) {
  const user = ensureSession();

  const response = await fetch(`/api/incidencias/${encodeURIComponent(idIncidencia)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      estado: nuevoEstado,
      idUsuario: user.id_usuario,
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo actualizar el estado de la incidencia.');
  }

  return payload.data;
}

export async function createEnvioWeb(payload) {
  const user = ensureSession();

  const response = await fetch('/api/envios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario: user.id_usuario,
      ...payload,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'No se pudo registrar el paquete.');
  }

  return data.data;
}

export async function getConductoresDisponibles(fechaAsignacion) {
  const query = fechaAsignacion ? `?fecha=${encodeURIComponent(fechaAsignacion)}` : '';
  const response = await fetch(`/api/asignaciones/conductores-disponibles${query}`);
  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'No se pudieron cargar los conductores disponibles.');
  }

  return data.data || [];
}

function normalizeEstado(estado) {
  return String(estado || '').toLowerCase().trim().replace(/\s+/g, '_');
}

export function estadoEnvioTexto(estado) {
  const normalized = normalizeEstado(estado);

  const map = {
    pendiente: 'Pendiente',
    en_ruta: 'En ruta',
    en_transito: 'En tránsito',
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

export function estadoIncidenciaTexto(estado) {
  const normalized = String(estado || '').toLowerCase().trim();

  const map = {
    abierta: 'Abierta',
    en_proceso: 'En proceso',
    cerrada: 'Cerrada',
    cancelada: 'Cancelada',
  };

  return map[normalized] || 'Sin estado';
}

export function estadoIncidenciaClase(estado) {
  const normalized = String(estado || '').toLowerCase().trim();

  if (normalized === 'cerrada' || normalized === 'cancelada') return 'estado-incidencia--cerrada';
  if (normalized === 'en_proceso') return 'estado-incidencia--proceso';

  return 'estado-incidencia--abierta';
}
