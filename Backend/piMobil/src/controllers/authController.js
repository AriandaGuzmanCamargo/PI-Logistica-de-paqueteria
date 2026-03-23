import { pool } from '../db.js';

const ACCESS_ROLE_MAP = {
  usuario: 'cliente',
  chofer: 'conductor',
  repartidor: 'conductor',
};

export const login = async (req, res) => {
  const { correo, contrasena, tipoAcceso } = req.body ?? {};

  if (!correo || !contrasena) {
    return res.status(400).json({
      ok: false,
      message: 'Correo y contrasena son obligatorios.',
    });
  }

  const accesoNormalizado = String(tipoAcceso ?? 'usuario').trim().toLowerCase();
  const rolSolicitado = ACCESS_ROLE_MAP[accesoNormalizado];

  if (!rolSolicitado) {
    return res.status(400).json({
      ok: false,
      message: 'Tipo de acceso no valido. Usa usuario o chofer.',
    });
  }

  try {
    const result = await pool.query(
      `SELECT id_usuario, nombre, apellido, correo, contrasena, rol, estado
       FROM usuarios
       WHERE correo = $1
       LIMIT 1`,
      [correo]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales invalidas.',
      });
    }

    const usuario = result.rows[0];

    if (usuario.estado !== 'activo') {
      return res.status(403).json({
        ok: false,
        message: 'Usuario inactivo.',
      });
    }

    if (usuario.rol !== 'cliente' && usuario.rol !== 'conductor') {
      return res.status(403).json({
        ok: false,
        message: 'Este rol no tiene acceso desde la app movil.',
      });
    }

    if (usuario.rol !== rolSolicitado) {
      return res.status(403).json({
        ok: false,
        message: 'El tipo de acceso no coincide con el rol del usuario.',
      });
    }

    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales invalidas.',
      });
    }

    return res.json({
      ok: true,
      message: 'Login exitoso.',
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error en login movil:', error);
    return res.status(500).json({
      ok: false,
      message: 'Error interno del servidor.',
    });
  }
};
