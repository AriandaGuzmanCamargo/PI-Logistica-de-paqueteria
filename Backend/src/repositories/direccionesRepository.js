import { pool } from '../db/pool.js';

let isTableReady = false;

async function ensureDireccionesTable() {
  if (isTableReady) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS direcciones_guardadas (
      id_direccion SERIAL PRIMARY KEY,
      id_usuario INT NOT NULL,
      alias VARCHAR(100) NOT NULL,
      direccion VARCHAR(255) NOT NULL,
      ciudad VARCHAR(100) NOT NULL,
      estado VARCHAR(100),
      codigo_postal VARCHAR(10),
      referencias TEXT,
      es_predeterminada BOOLEAN NOT NULL DEFAULT FALSE,
      fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    )
  `);

  await pool.query(
    `CREATE INDEX IF NOT EXISTS idx_direcciones_guardadas_usuario
     ON direcciones_guardadas (id_usuario)`
  );

  isTableReady = true;
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

export async function listDireccionesByUsuario(idUsuario) {
  await ensureDireccionesTable();

  const result = await pool.query(
    `SELECT
      id_direccion,
      alias,
      direccion,
      ciudad,
      estado,
      codigo_postal,
      referencias,
      es_predeterminada,
      fecha_registro
     FROM direcciones_guardadas
     WHERE id_usuario = $1
     ORDER BY es_predeterminada DESC, fecha_registro DESC`,
    [idUsuario]
  );

  return result.rows;
}

export async function findDireccionById(idDireccion) {
  await ensureDireccionesTable();

  const result = await pool.query(
    `SELECT
      id_direccion,
      id_usuario,
      alias,
      direccion,
      ciudad,
      estado,
      codigo_postal,
      referencias,
      es_predeterminada,
      fecha_registro
     FROM direcciones_guardadas
     WHERE id_direccion = $1
     LIMIT 1`,
    [idDireccion]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

async function clearDefaultDireccion(idUsuario) {
  await pool.query(
    `UPDATE direcciones_guardadas
     SET es_predeterminada = FALSE
     WHERE id_usuario = $1`,
    [idUsuario]
  );
}

export async function createDireccionByUsuario(idUsuario, payload) {
  await ensureDireccionesTable();

  if (payload.es_predeterminada) {
    await clearDefaultDireccion(idUsuario);
  }

  const result = await pool.query(
    `INSERT INTO direcciones_guardadas (
      id_usuario,
      alias,
      direccion,
      ciudad,
      estado,
      codigo_postal,
      referencias,
      es_predeterminada
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id_direccion`,
    [
      idUsuario,
      payload.alias,
      payload.direccion,
      payload.ciudad,
      payload.estado,
      payload.codigo_postal,
      payload.referencias,
      payload.es_predeterminada,
    ]
  );

  return findDireccionById(result.rows[0].id_direccion);
}

export async function updateDireccionById(idDireccion, payload) {
  await ensureDireccionesTable();

  const original = await findDireccionById(idDireccion);

  if (!original) {
    return null;
  }

  if (payload.es_predeterminada) {
    await clearDefaultDireccion(original.id_usuario);
  }

  const result = await pool.query(
    `UPDATE direcciones_guardadas
     SET alias = $1,
         direccion = $2,
         ciudad = $3,
         estado = $4,
         codigo_postal = $5,
         referencias = $6,
         es_predeterminada = $7
     WHERE id_direccion = $8
     RETURNING id_direccion`,
    [
      payload.alias,
      payload.direccion,
      payload.ciudad,
      payload.estado,
      payload.codigo_postal,
      payload.referencias,
      payload.es_predeterminada,
      idDireccion,
    ]
  );

  return result.rowCount > 0 ? findDireccionById(result.rows[0].id_direccion) : null;
}

export async function deleteDireccionById(idDireccion) {
  await ensureDireccionesTable();

  const result = await pool.query(
    `DELETE FROM direcciones_guardadas
     WHERE id_direccion = $1
     RETURNING id_direccion`,
    [idDireccion]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}
