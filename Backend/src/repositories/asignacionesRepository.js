import { pool } from '../db/pool.js';

const REQUIRED_TABLES = [
  'conductores',
  'asignaciones_ruta',
  'envio_ruta',
  'vehiculos',
  'rutas',
  'envios',
];

export async function hasAssignmentInfrastructure() {
  const result = await pool.query(
    `SELECT table_name
     FROM information_schema.tables
     WHERE table_schema = 'public'
       AND table_name = ANY($1::text[])`,
    [REQUIRED_TABLES]
  );

  const names = new Set(result.rows.map((row) => row.table_name));
  return REQUIRED_TABLES.every((tableName) => names.has(tableName));
}

export async function findShipmentStatus(idEnvio) {
  const result = await pool.query(
    `SELECT id_envio, estado_envio
     FROM envios
     WHERE id_envio = $1
     LIMIT 1`,
    [idEnvio]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function findActiveAssignmentForShipment(idEnvio) {
  const result = await pool.query(
    `SELECT
        ar.id_asignacion,
        ar.id_conductor,
        ar.id_vehiculo,
        ar.id_ruta,
        ar.estado_asignacion
     FROM envio_ruta er
     JOIN asignaciones_ruta ar ON ar.id_asignacion = er.id_asignacion
     WHERE er.id_envio = $1
       AND ar.estado_asignacion IN ('programada', 'en_proceso')
     ORDER BY ar.fecha_salida DESC NULLS LAST, ar.id_asignacion DESC
     LIMIT 1`,
    [idEnvio]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function findBestConductorId() {
  const result = await pool.query(
    `SELECT
        c.id_conductor,
        COUNT(er.id_envio) AS carga_activa
     FROM conductores c
     LEFT JOIN asignaciones_ruta ar
       ON ar.id_conductor = c.id_conductor
      AND ar.estado_asignacion IN ('programada', 'en_proceso')
     LEFT JOIN envio_ruta er ON er.id_asignacion = ar.id_asignacion
     GROUP BY c.id_conductor
     ORDER BY carga_activa ASC, c.id_conductor ASC
     LIMIT 1`
  );

  return result.rowCount > 0 ? result.rows[0].id_conductor : null;
}

export async function findBestVehicleId() {
  const preferred = await pool.query(
    `SELECT id_vehiculo
     FROM vehiculos
     WHERE estado = 'disponible'
     ORDER BY id_vehiculo ASC
     LIMIT 1`
  );

  if (preferred.rowCount > 0) {
    return preferred.rows[0].id_vehiculo;
  }

  const fallback = await pool.query(
    `SELECT id_vehiculo
     FROM vehiculos
     ORDER BY id_vehiculo ASC
     LIMIT 1`
  );

  return fallback.rowCount > 0 ? fallback.rows[0].id_vehiculo : null;
}

export async function findBestRouteId() {
  const preferred = await pool.query(
    `SELECT id_ruta
     FROM rutas
     WHERE estado = 'activa'
     ORDER BY id_ruta ASC
     LIMIT 1`
  );

  if (preferred.rowCount > 0) {
    return preferred.rows[0].id_ruta;
  }

  const fallback = await pool.query(
    `SELECT id_ruta
     FROM rutas
     ORDER BY id_ruta ASC
     LIMIT 1`
  );

  return fallback.rowCount > 0 ? fallback.rows[0].id_ruta : null;
}

export async function createActiveAssignment({ idConductor, idVehiculo, idRuta }) {
  const result = await pool.query(
    `INSERT INTO asignaciones_ruta (
      id_ruta,
      id_vehiculo,
      id_conductor,
      fecha_salida,
      fecha_llegada,
      estado_asignacion
    ) VALUES ($1, $2, $3, NOW(), NOW() + INTERVAL '8 hour', 'programada')
    RETURNING id_asignacion, id_ruta, id_vehiculo, id_conductor, estado_asignacion`,
    [idRuta, idVehiculo, idConductor]
  );

  return result.rows[0];
}

export async function linkShipmentToAssignment({ idEnvio, idAsignacion }) {
  const result = await pool.query(
    `INSERT INTO envio_ruta (id_envio, id_asignacion)
     VALUES ($1, $2)
     ON CONFLICT (id_envio, id_asignacion) DO NOTHING
     RETURNING id_envio`,
    [idEnvio, idAsignacion]
  );

  return result.rowCount > 0;
}

export async function markShipmentAsInRoute(idEnvio) {
  await pool.query(
    `UPDATE envios
     SET estado_envio = 'en_ruta'
     WHERE id_envio = $1
       AND estado_envio = 'pendiente'`,
    [idEnvio]
  );
}
