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
    throw new Error('No hay sesion activa. Inicia sesion nuevamente.');
  }

  return user;
}

export async function getEnviosSupervisor() {
  const user = ensureSession();

  const response = await fetch(`/api/envios/usuario/${user.id_usuario}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar los envios.');
  }

  return payload.data || [];
}

export async function getDetalleEnvioSupervisor(idEnvio) {
  const response = await fetch(`/api/envios/detalle/${idEnvio}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cargar el detalle del envio.');
  }

  return payload.data;
}

export async function getIncidenciasSupervisor() {
  const user = ensureSession();

  const response = await fetch(`/api/incidencias/usuario/${user.id_usuario}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar las incidencias.');
  }

  return payload.data || [];
}

export async function getConductoresResumenSupervisor() {
  const user = ensureSession();

  const response = await fetch(`/api/asignaciones/conductores-resumen?idUsuario=${encodeURIComponent(user.id_usuario)}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cargar el resumen de conductores.');
  }

  return payload.data || [];
}

export async function getDetalleConductorSupervisor(idConductor) {
  const user = ensureSession();

  const response = await fetch(
    `/api/asignaciones/conductor-detalle?idUsuario=${encodeURIComponent(user.id_usuario)}&idConductor=${encodeURIComponent(idConductor)}`
  );
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cargar el detalle del conductor.');
  }

  return payload.data;
}

export async function getPerfilSupervisor() {
  const user = ensureSession();

  const response = await fetch(`/api/auth/perfil/${encodeURIComponent(user.id_usuario)}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cargar el perfil del usuario.');
  }

  return payload.data;
}

export async function actualizarPerfilSupervisor(payload) {
  const user = ensureSession();

  const response = await fetch(`/api/auth/perfil/${encodeURIComponent(user.id_usuario)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'No se pudo actualizar el perfil.');
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
    })
  );

  return data.data;
}

export async function cambiarContrasenaSupervisor({ contrasenaActual, nuevaContrasena, confirmarContrasena }) {
  const user = ensureSession();

  const response = await fetch(`/api/auth/cambiar-contrasena/${encodeURIComponent(user.id_usuario)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contrasenaActual,
      nuevaContrasena,
      confirmarContrasena,
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo actualizar la contrasena.');
  }

  return payload.data;
}

export async function getUsuariosGestionAdmin(rol = 'todos') {
  const user = ensureSession();

  const rolQuery = rol && rol !== 'todos' ? `&rol=${encodeURIComponent(rol)}` : '';
  const response = await fetch(
    `/api/auth/usuarios-gestion?idAdmin=${encodeURIComponent(user.id_usuario)}${rolQuery}`
  );
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar los usuarios gestionables.');
  }

  return payload.data || [];
}

export async function cambiarContrasenaUsuarioPorAdmin({ idUsuario, nuevaContrasena, confirmarContrasena }) {
  const user = ensureSession();

  const response = await fetch(`/api/auth/cambiar-contrasena-admin/${encodeURIComponent(idUsuario)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idAdmin: user.id_usuario,
      nuevaContrasena,
      confirmarContrasena,
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo cambiar la contrasena del usuario.');
  }

  return payload.data;
}

export async function crearUsuarioGestionPorAdmin(payload) {
  const user = ensureSession();

  const response = await fetch('/api/auth/usuarios-gestion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idAdmin: user.id_usuario,
      ...payload,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || 'No se pudo crear el usuario.');
  }

  return data.data;
}

export async function eliminarUsuarioGestionPorAdmin(idUsuario) {
  const user = ensureSession();

  const response = await fetch(`/api/auth/usuarios-gestion/${encodeURIComponent(idUsuario)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idAdmin: user.id_usuario,
    }),
  });

  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo eliminar el usuario.');
  }

  return payload.data;
}

export async function getConductoresDisponiblesSupervisor(fechaAsignacion) {
  const query = fechaAsignacion ? `?fecha=${encodeURIComponent(fechaAsignacion)}` : '';
  const response = await fetch(`/api/asignaciones/conductores-disponibles${query}`);
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudieron cargar conductores disponibles.');
  }

  return payload.data || [];
}

export async function reasignarEnvioSupervisor({ idEnvio, idConductor, fechaAsignacion }) {
  const user = ensureSession();

  const response = await fetch(`/api/asignaciones/reasignar/${idEnvio}`, {
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
    throw new Error(payload.message || 'No se pudo completar la reasignacion del envio.');
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
