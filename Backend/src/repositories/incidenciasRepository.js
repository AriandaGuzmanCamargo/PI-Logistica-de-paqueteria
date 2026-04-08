import { pool } from '../config/db.js';

async function ensurePhotoColumn() {
  await pool.query(
    `ALTER TABLE incidencias
     ADD COLUMN IF NOT EXISTS foto_evidencia TEXT`
  );
}

async function ensureCanceladaEstadoValue() {
  await pool.query(
    `DO $$
     BEGIN
       IF EXISTS (
         SELECT 1
         FROM pg_type
         WHERE typname = 'estado_incidencia_enum'
       ) THEN
         BEGIN
           ALTER TYPE estado_incidencia_enum ADD VALUE IF NOT EXISTS 'cancelada';
         EXCEPTION
           WHEN duplicate_object THEN
             NULL;
         END;
       END IF;
     END$$;`
  );
}

export async function findUserById(userId) {
  const result = await pool.query(
    `SELECT id_usuario, rol
     FROM usuarios
     WHERE id_usuario = $1
     LIMIT 1`,
    [userId]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function listIncidenciasForOperator() {
  await ensurePhotoColumn();
  
  const result = await pool.query(
    `SELECT
        i.id_incidencia,
        i.tipo_incidencia,
        i.descripcion,
        i.fecha_reporte,
        i.estado,
        i.foto_evidencia,
        u.id_usuario AS reportado_por_id,
        CONCAT(u.nombre, ' ', u.apellido) AS reportado_por_nombre,
        e.id_envio,
        p.codigo_rastreo,
        e.estado_envio
     FROM incidencias i
     JOIN usuarios u ON u.id_usuario = i.id_usuario
     JOIN envios e ON e.id_envio = i.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = i.id_paquete
     ORDER BY i.fecha_reporte DESC`
  );

  return result.rows;
}

export async function listIncidenciasByReporter(userId) {
  await ensurePhotoColumn();
  
  const result = await pool.query(
    `SELECT
        i.id_incidencia,
        i.tipo_incidencia,
        i.descripcion,
        i.fecha_reporte,
        i.estado,
        i.foto_evidencia,
        u.id_usuario AS reportado_por_id,
        CONCAT(u.nombre, ' ', u.apellido) AS reportado_por_nombre,
        e.id_envio,
        p.codigo_rastreo,
        e.estado_envio
     FROM incidencias i
     JOIN usuarios u ON u.id_usuario = i.id_usuario
     JOIN envios e ON e.id_envio = i.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = i.id_paquete
     WHERE i.id_usuario = $1
     ORDER BY i.fecha_reporte DESC`,
    [userId]
  );

  return result.rows;
}

export async function findShipmentPackageById(idEnvio) {
  const result = await pool.query(
    `SELECT ep.id_paquete
     FROM envio_paquete ep
     WHERE ep.id_envio = $1
     ORDER BY ep.id_paquete ASC
     LIMIT 1`,
    [idEnvio]
  );

  return result.rowCount > 0 ? result.rows[0].id_paquete : null;
}

export async function findIncidenciaById(idIncidencia) {
  const result = await pool.query(
    `SELECT id_incidencia, estado
     FROM incidencias
     WHERE id_incidencia = $1
     LIMIT 1`,
    [idIncidencia]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function createIncidenciaRow({
  idEnvio,
  idPaquete,
  idUsuario,
  tipoIncidencia,
  descripcion,
  fotoEvidencia,
}) {
  await ensurePhotoColumn();
  
  const result = await pool.query(
    `INSERT INTO incidencias (
      id_envio,
      id_paquete,
      id_usuario,
      tipo_incidencia,
      descripcion,
      foto_evidencia,
      fecha_reporte,
      estado
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), 'abierta')
    RETURNING id_incidencia, id_envio, id_paquete, id_usuario, tipo_incidencia, descripcion, foto_evidencia, fecha_reporte, estado`,
    [idEnvio, idPaquete, idUsuario, tipoIncidencia, descripcion, fotoEvidencia || null]
  );

  return result.rows[0];
}


export async function updateIncidenciaEstado(idIncidencia, nuevoEstado) {
  await ensureCanceladaEstadoValue();

  const result = await pool.query(
    `UPDATE incidencias
     SET estado = $1
     WHERE id_incidencia = $2
     RETURNING id_incidencia, estado`,
    [nuevoEstado, idIncidencia]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}
