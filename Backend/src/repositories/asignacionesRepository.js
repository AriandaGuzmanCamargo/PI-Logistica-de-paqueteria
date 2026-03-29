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

export async function createActiveAssignment({ idConductor, idVehiculo, idRuta, fechaProgramada }) {
  const result = await pool.query(
    `INSERT INTO asignaciones_ruta (
      id_ruta,
      id_vehiculo,
      id_conductor,
      fecha_salida,
      fecha_llegada,
      estado_asignacion
    ) VALUES (
      $1,
      $2,
      $3,
      CASE WHEN $4::date IS NULL THEN NOW() ELSE ($4::date + TIME '08:00') END,
      CASE WHEN $4::date IS NULL THEN NOW() + INTERVAL '8 hour' ELSE ($4::date + TIME '16:00') END,
      'programada'
    )
    RETURNING id_asignacion, id_ruta, id_vehiculo, id_conductor, estado_asignacion`,
    [idRuta, idVehiculo, idConductor, fechaProgramada || null]
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

export async function markShipmentAsPending(idEnvio) {
  await pool.query(
    `UPDATE envios
     SET estado_envio = 'pendiente'
     WHERE id_envio = $1
       AND estado_envio IN ('en_ruta', 'retrasado')`,
    [idEnvio]
  );
}

export async function cancelActiveAssignmentForShipment(idEnvio) {
  const result = await pool.query(
    `UPDATE asignaciones_ruta ar
     SET estado_asignacion = 'finalizada'
     FROM envio_ruta er
     WHERE er.id_asignacion = ar.id_asignacion
       AND er.id_envio = $1
       AND ar.estado_asignacion IN ('programada', 'en_proceso')
     RETURNING ar.id_asignacion, ar.id_conductor, ar.id_ruta, ar.id_vehiculo, ar.estado_asignacion`,
    [idEnvio]
  );

  return result.rows;
}

export async function listAvailableDrivers(fechaAsignacion) {
  const result = await pool.query(
    `SELECT
        c.id_conductor,
        c.id_usuario,
        u.nombre,
        u.apellido,
        u.correo
     FROM conductores c
     JOIN usuarios u ON u.id_usuario = c.id_usuario
     LEFT JOIN asignaciones_ruta ar
       ON ar.id_conductor = c.id_conductor
      AND ar.estado_asignacion IN ('programada', 'en_proceso')
      AND DATE(ar.fecha_salida) = COALESCE($1::date, CURRENT_DATE)
     WHERE u.estado = 'activo'
       AND c.estado = 'activo'
       AND ar.id_asignacion IS NULL
     ORDER BY u.nombre ASC, u.apellido ASC, c.id_conductor ASC`,
    [fechaAsignacion || null]
  );

  return result.rows;
}

export async function findAvailableDriverById(idConductor, fechaAsignacion) {
  const result = await pool.query(
    `SELECT
        c.id_conductor,
        c.id_usuario,
        u.nombre,
        u.apellido,
        u.correo
     FROM conductores c
     JOIN usuarios u ON u.id_usuario = c.id_usuario
     LEFT JOIN asignaciones_ruta ar
       ON ar.id_conductor = c.id_conductor
      AND ar.estado_asignacion IN ('programada', 'en_proceso')
      AND DATE(ar.fecha_salida) = COALESCE($2::date, CURRENT_DATE)
     WHERE c.id_conductor = $1
       AND u.estado = 'activo'
       AND c.estado = 'activo'
       AND ar.id_asignacion IS NULL
     LIMIT 1`,
    [idConductor, fechaAsignacion || null]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function listDriversSummary() {
  const result = await pool.query(
    `SELECT
        c.id_conductor,
        c.id_usuario,
        u.nombre,
        u.apellido,
        u.correo,
        u.estado AS estado_usuario,
        c.estado AS estado_conductor,
        active_assignment.id_asignacion,
        active_assignment.estado_asignacion,
        active_assignment.fecha_salida,
        active_assignment.ruta_nombre,
        active_assignment.ruta_destino,
        active_assignment.vehiculo_placa,
        COALESCE(active_assignment.total_envios, 0) AS total_envios
     FROM conductores c
     JOIN usuarios u ON u.id_usuario = c.id_usuario
     LEFT JOIN LATERAL (
       SELECT
         ar.id_asignacion,
         ar.estado_asignacion,
         ar.fecha_salida,
         r.nombre_ruta AS ruta_nombre,
         r.destino AS ruta_destino,
         v.placa AS vehiculo_placa,
         COUNT(er.id_envio) AS total_envios
       FROM asignaciones_ruta ar
       LEFT JOIN rutas r ON r.id_ruta = ar.id_ruta
       LEFT JOIN vehiculos v ON v.id_vehiculo = ar.id_vehiculo
       LEFT JOIN envio_ruta er ON er.id_asignacion = ar.id_asignacion
       WHERE ar.id_conductor = c.id_conductor
         AND ar.estado_asignacion IN ('programada', 'en_proceso')
       GROUP BY ar.id_asignacion, ar.estado_asignacion, ar.fecha_salida, r.nombre_ruta, r.destino, v.placa
       ORDER BY
         CASE WHEN ar.estado_asignacion = 'en_proceso' THEN 0 ELSE 1 END,
         ar.fecha_salida DESC,
         ar.id_asignacion DESC
       LIMIT 1
     ) AS active_assignment ON TRUE
     ORDER BY u.nombre ASC, u.apellido ASC, c.id_conductor ASC`
  );

  return result.rows;
}

export async function findDriverByConductorId(idConductor) {
  const result = await pool.query(
    `SELECT
        c.id_conductor,
        c.id_usuario,
        c.estado AS estado_conductor,
        u.nombre,
        u.apellido,
        u.correo,
        u.telefono,
        u.estado AS estado_usuario
     FROM conductores c
     JOIN usuarios u ON u.id_usuario = c.id_usuario
     WHERE c.id_conductor = $1
     LIMIT 1`,
    [idConductor]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function listDriverAssignedShipmentsByConductorId(idConductor) {
  const result = await pool.query(
    `SELECT
        e.id_envio,
        e.estado_envio,
        e.direccion_origen,
        e.direccion_destino,
        e.ciudad_origen,
        e.ciudad_destino,
        e.fecha_creacion,
        e.fecha_estimada_entrega,
        e.costo_total,
        p.codigo_rastreo,
        p.tipo_servicio,
        p.estado_actual AS estado_paquete,
        c_des.nombre AS destinatario_nombre,
        c_des.telefono AS destinatario_telefono,
        ar.id_asignacion,
        ar.estado_asignacion,
        ar.fecha_salida,
        ar.fecha_llegada,
        r.nombre_ruta,
        r.origen AS ruta_origen,
        r.destino AS ruta_destino,
        v.placa AS vehiculo_placa
     FROM conductores c
     JOIN asignaciones_ruta ar ON ar.id_conductor = c.id_conductor
     JOIN envio_ruta er ON er.id_asignacion = ar.id_asignacion
     JOIN envios e ON e.id_envio = er.id_envio
     LEFT JOIN envio_paquete ep ON ep.id_envio = e.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = ep.id_paquete
     LEFT JOIN clientes c_des ON c_des.id_cliente = e.id_cliente_destinatario
     LEFT JOIN rutas r ON r.id_ruta = ar.id_ruta
     LEFT JOIN vehiculos v ON v.id_vehiculo = ar.id_vehiculo
     WHERE c.id_conductor = $1
       AND ar.estado_asignacion IN ('programada', 'en_proceso')
     ORDER BY ar.fecha_salida DESC, e.fecha_creacion DESC`,
    [idConductor]
  );

  return result.rows;
}
