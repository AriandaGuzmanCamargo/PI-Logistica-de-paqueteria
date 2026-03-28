import { pool } from '../db/pool.js';

export async function findUserByEmail(correo) {
  const result = await pool.query(
    `SELECT id_usuario, nombre, apellido, correo, contrasena, rol, estado
     FROM usuarios
     WHERE LOWER(correo) = LOWER($1)
     LIMIT 1`,
    [correo]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function findUserById(idUsuario) {
  const result = await pool.query(
    `SELECT id_usuario, nombre, apellido, correo, telefono, rol, estado, fecha_registro
     FROM usuarios
     WHERE id_usuario = $1
     LIMIT 1`,
    [idUsuario]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

async function hasClientesUserIdColumn() {
  const result = await pool.query(
    `SELECT 1
     FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'clientes'
       AND column_name = 'id_usuario'
     LIMIT 1`
  );

  return result.rowCount > 0;
}

export async function createUser(payload) {
  const result = await pool.query(
    `INSERT INTO usuarios (
      nombre,
      apellido,
      correo,
      contrasena,
      telefono,
      rol,
      estado
    ) VALUES ($1, $2, $3, $4, $5, 'cliente', 'activo')
    RETURNING id_usuario, nombre, apellido, correo, rol`,
    [
      payload.nombre,
      payload.apellido,
      payload.correo,
      payload.contrasena,
      payload.telefono || null,
    ]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function createClientFromUser(payload) {
  const hasUserColumn = await hasClientesUserIdColumn();

  const baseColumns = [
    'nombre',
    'telefono',
    'correo',
    'direccion_principal',
    'ciudad',
    'estado',
    'codigo_postal',
  ];

  const baseValues = [
    payload.nombreCompleto,
    payload.telefono || null,
    payload.correo,
    payload.direccion_principal,
    payload.ciudad,
    payload.estado,
    payload.codigo_postal,
  ];

  if (hasUserColumn) {
    const result = await pool.query(
      `INSERT INTO clientes (
        ${baseColumns.join(', ')},
        id_usuario
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id_cliente`,
      [...baseValues, payload.id_usuario]
    );

    return result.rowCount > 0 ? result.rows[0] : null;
  }

  const result = await pool.query(
    `INSERT INTO clientes (
      ${baseColumns.join(', ')}
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id_cliente`,
    baseValues
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function updateUserPasswordById(idUsuario, nuevaContrasena) {
  const result = await pool.query(
    `UPDATE usuarios
     SET contrasena = $1
     WHERE id_usuario = $2
     RETURNING id_usuario`,
    [nuevaContrasena, idUsuario]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function findUserProfileById(idUsuario) {
  const user = await findUserById(idUsuario);

  if (!user) {
    return null;
  }

  const hasUserColumn = await hasClientesUserIdColumn();
  let ciudad = null;

  if (hasUserColumn) {
    const cityByUser = await pool.query(
      `SELECT ciudad
       FROM clientes
       WHERE id_usuario = $1
       LIMIT 1`,
      [idUsuario]
    );

    if (cityByUser.rowCount > 0) {
      ciudad = cityByUser.rows[0].ciudad;
    }
  }

  if (!ciudad) {
    const cityByEmail = await pool.query(
      `SELECT ciudad
       FROM clientes
       WHERE LOWER(correo) = LOWER($1)
       LIMIT 1`,
      [user.correo]
    );

    if (cityByEmail.rowCount > 0) {
      ciudad = cityByEmail.rows[0].ciudad;
    }
  }

  return {
    ...user,
    ciudad,
  };
}

export async function updateUserProfileById(idUsuario, payload) {
  const result = await pool.query(
    `UPDATE usuarios
     SET nombre = $1,
         apellido = $2,
         correo = $3,
         telefono = $4
     WHERE id_usuario = $5
     RETURNING id_usuario`,
    [payload.nombre, payload.apellido, payload.correo, payload.telefono, idUsuario]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function updateClientCityByUser({ idUsuario, oldCorreo, newCorreo, ciudad }) {
  const hasUserColumn = await hasClientesUserIdColumn();

  if (hasUserColumn) {
    const updateByUser = await pool.query(
      `UPDATE clientes
       SET ciudad = $1,
           correo = COALESCE($2, correo)
       WHERE id_usuario = $3
       RETURNING id_cliente`,
      [ciudad, newCorreo || null, idUsuario]
    );

    if (updateByUser.rowCount > 0) {
      return updateByUser.rows[0];
    }
  }

  const updateByEmail = await pool.query(
    `UPDATE clientes
     SET ciudad = $1,
         correo = COALESCE($2, correo)
     WHERE LOWER(correo) = LOWER($3)
     RETURNING id_cliente`,
    [ciudad, newCorreo || null, oldCorreo]
  );

  return updateByEmail.rowCount > 0 ? updateByEmail.rows[0] : null;
}
