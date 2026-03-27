import { pool } from '../db/pool.js';

export async function findUserByEmail(correo) {
  const result = await pool.query(
    `SELECT id_usuario, nombre, apellido, correo, contrasena, rol, estado
     FROM usuarios
     WHERE correo = $1
     LIMIT 1`,
    [correo]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}
