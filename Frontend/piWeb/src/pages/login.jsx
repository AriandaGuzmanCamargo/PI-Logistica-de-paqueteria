import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api.js';

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(type, text) {
    setToast({ type, text });
    window.setTimeout(() => {
      setToast((current) => {
        if (!current || current.text !== text) {
          return current;
        }

        return null;
      });
    }, 2800);
  }

  function normalizeRole(value) {
    return String(value || '')
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function getRouteByRole(rolValue) {
    const rol = normalizeRole(rolValue);

    if (rol === 'admin' || rol === 'administrador' || rol === 'supervisor') {
      return '/supervisor/dashboard';
    }

    if (rol === 'operador' || rol === 'operadorlogistico' || rol === 'logistico') {
      return '/operador/dashboard';
    }

    return null;
  }

  function redirectByRole(rolValue) {
    const target = getRouteByRole(rolValue);

    if (!target) {
      return false;
    }

    window.location.replace(target);
    return true;
  }

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }

    setToast(null);

    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !contrasena) {
      showToast('error', 'Completa correo y contrasena.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: correoLimpio, contrasena }),
      });

      let data = null;

      try {
        data = await response.json();
      } catch (_jsonError) {
        data = null;
      }

      if (!response.ok || !data?.ok) {
        const backendMessage = String(data?.message || '').trim();
        const isInvalidCredentials = response.status === 401 || /credenciales invalidas/i.test(backendMessage);

        if (isInvalidCredentials) {
          showToast('error', 'Credenciales invalidas. Verifica tu correo y contrasena.');
          return;
        }

        showToast('error', backendMessage || 'No se pudo iniciar sesion.');
        return;
      }

      localStorage.setItem('piWebUser', JSON.stringify(data.usuario));

      if (redirectByRole(data.usuario?.rol)) {
        return;
      }

      showToast('error', 'Rol sin pantalla asignada en web.');
    } catch (_error) {
      showToast('error', 'No se pudo conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setShowPassword(false);
  }, []);

  return (
    <div className="contenedor-pagina">
      <main className="contenedor-inicio">
        <section className="contenedor-inicio__izquierda">
          <div className="bloque-marca">
            <div className="marca">
              <img src="/piWeb/images/logoSinFondo.png" alt="Sistema de Logistica" />
            </div>
            <h1>
              Sistema de Logística<br />
              de Transporte de Paquetería
            </h1>
          </div>
        </section>

        <section className="contenedor-inicio__derecha">
          <div className="tarjeta-formulario">
            {toast ? (
              <div
                style={{
                  marginBottom: '12px',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: toast.type === 'error' ? '#b4232f' : '#1d7a43',
                  background: toast.type === 'error' ? '#fff0f2' : '#ecfff1',
                  border: toast.type === 'error' ? '1px solid #f7c6cf' : '1px solid #bdeccc',
                }}
              >
                {toast.text}
              </div>
            ) : null}
            <h2>Iniciar Sesión</h2>
            <p className="tarjeta-formulario__subtitulo">Bienvenido. Por favor inicie sesión para continuar.</p>

            <div className="grupo-campo">
              <span className="grupo-campo__icono">
                <img src="/piWeb/images/gmail.png" alt="Correo" />
              </span>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
            </div>

            <div className="grupo-campo grupo-campo--contrasena">
              <span className="grupo-campo__icono">
                <img src="/piWeb/images/candado.png" alt="Contraseña" />
              </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                className="input-contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
              <button
                className="grupo-campo__ojo"
                type="button"
                aria-label="Mostrar/ocultar contraseña"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  src="/piWeb/images/ojo-abierto.png"
                  alt="Ver contraseña"
                  className="ojo-abierto"
                  style={{ display: showPassword ? 'none' : 'block' }}
                />
                <img
                  src="/piWeb/images/ojo.png"
                  alt="Ocultar contraseña"
                  className="ojo-cerrado"
                  style={{ display: showPassword ? 'block' : 'none' }}
                />
              </button>
            </div>

              <button className="boton boton--primario" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Validando...' : 'Iniciar Sesión'}
            </button>
            <a className="enlace-olvido" href="/recuperar-contrasena-admin">¿Olvidaste tu contraseña?</a>
          </div>
        </section>
      </main>

      <footer className="pie-pagina">
        <p className="derechos-reservados">
          2026 Sistema de Logística de Transporte de Paquetería. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
