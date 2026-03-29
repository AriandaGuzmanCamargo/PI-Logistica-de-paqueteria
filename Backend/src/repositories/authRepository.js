import { pool } from '../db/pool.js';

async function ensureUserPhotoColumn() {
  await pool.query(
    `ALTER TABLE usuarios
     ADD COLUMN IF NOT EXISTS foto_perfil_url TEXT`
  );
}

async function ensureUserCityColumn() {
  await pool.query(
    `ALTER TABLE usuarios
     ADD COLUMN IF NOT EXISTS ciudad VARCHAR(100)`
  );
}

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
  await ensureUserPhotoColumn();
  await ensureUserCityColumn();

  const result = await pool.query(
    `SELECT id_usuario, nombre, apellido, correo, telefono, rol, estado, fecha_registro, foto_perfil_url, ciudad
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
  await ensureUserCityColumn();

  const result = await pool.query(
    `INSERT INTO usuarios (
      nombre,
      apellido,
      correo,
      contrasena,
      telefono,
      ciudad,
      rol,
      estado
    ) VALUES ($1, $2, $3, $4, $5, $6, 'cliente', 'activo')
    RETURNING id_usuario, nombre, apellido, correo, rol`,
    [
      payload.nombre,
      payload.apellido,
      payload.correo,
      payload.contrasena,
      payload.telefono || null,
      payload.ciudad || null,
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
  let ciudad = user.ciudad || null;

  if (!ciudad && hasUserColumn) {
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
  await ensureUserPhotoColumn();
  await ensureUserCityColumn();

  const result = await pool.query(
    `UPDATE usuarios
     SET nombre = $1,
         apellido = $2,
         correo = $3,
         telefono = $4,
         foto_perfil_url = $5,
         ciudad = $6
     WHERE id_usuario = $7
     RETURNING id_usuario`,
    [
      payload.nombre,
      payload.apellido,
      payload.correo,
      payload.telefono,
      payload.foto_perfil_url || null,
      payload.ciudad || null,
      idUsuario,
    ]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function updateUserPhotoById(idUsuario, fotoPerfilUrl) {
  await ensureUserPhotoColumn();

  const result = await pool.query(
    `UPDATE usuarios
     SET foto_perfil_url = $1
     WHERE id_usuario = $2
     RETURNING id_usuario`,
    [fotoPerfilUrl || null, idUsuario]
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

export async function listManageableUsersByRoles(roles = []) {
  await ensureUserPhotoColumn();
  await ensureUserCityColumn();

  const defaultRoles = ['conductor', 'operador'];
  const safeRoles = Array.isArray(roles) && roles.length > 0 ? roles : defaultRoles;

  const result = await pool.query(
    `SELECT
        id_usuario,
        nombre,
        apellido,
        correo,
        contrasena,
        telefono,
        ciudad,
        rol,
        estado,
        fecha_registro,
        foto_perfil_url
     FROM usuarios
        WHERE rol::text = ANY($1::text[])
     ORDER BY rol ASC, nombre ASC, apellido ASC, id_usuario ASC`,
    [safeRoles]
  );

  return result.rows;
}

export async function createOperationalUser(payload) {
  await ensureUserPhotoColumn();
  await ensureUserCityColumn();

  const result = await pool.query(
    `INSERT INTO usuarios (
      nombre,
      apellido,
      correo,
      contrasena,
      telefono,
      ciudad,
      foto_perfil_url,
      rol,
      estado
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'activo')
    RETURNING id_usuario, nombre, apellido, correo, telefono, ciudad, rol, estado, fecha_registro, foto_perfil_url`,
    [
      payload.nombre,
      payload.apellido,
      payload.correo,
      payload.contrasena,
      payload.telefono || null,
      payload.ciudad || null,
      payload.foto_perfil_url || null,
      payload.rol,
    ]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function createConductorFromUser(payload) {
  const result = await pool.query(
    `INSERT INTO conductores (
      id_usuario,
      licencia,
      tipo_licencia,
      fecha_contratacion,
      estado
    ) VALUES ($1, $2, $3, $4, 'activo')
    RETURNING id_conductor, id_usuario, licencia, tipo_licencia, fecha_contratacion, estado`,
    [
      payload.id_usuario,
      payload.licencia,
      payload.tipo_licencia,
      payload.fecha_contratacion,
    ]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}
