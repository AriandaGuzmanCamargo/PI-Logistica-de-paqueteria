import React, { useState } from 'react';
import { apiFetch } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

export default function RecuperarContrasenaAdmin() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
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
    }, 3200);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !nuevaContrasena || !confirmarContrasena) {
      showToast('error', 'Completa correo, nueva contraseña y confirmación.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiFetch('/api/auth/recuperar-contrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correoLimpio,
          nuevaContrasena,
          confirmarContrasena,
        }),
      });

      let data = null;

      try {
        data = await response.json();
      } catch (_jsonError) {
        data = null;
      }

      if (!response.ok || !data?.ok) {
        showToast('error', data?.message || 'No se pudo actualizar la contraseña.');
        return;
      }

      showToast('ok', data?.message || 'Contraseña actualizada correctamente.');
      setCorreo('');
      setNuevaContrasena('');
      setConfirmarContrasena('');

      window.setTimeout(() => {
        navigate('/login');
      }, 900);
    } catch (_error) {
      showToast('error', 'No se pudo conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="contenedor-pagina">
      <main className="contenedor-inicio">
        <section className="contenedor-inicio__izquierda">
          <div className="bloque-marca">
            <div className="marca">
              <img src="/piWeb/images/logoSinFondo.png" alt="Sistema de Logistica" />
            </div>
            <h1>
              Recuperación de contraseña<br />
              para cuenta admin
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

            <h2>Olvidaste tu contraseña</h2>
            <p className="tarjeta-formulario__subtitulo">
              Este formulario solo permite actualizar la contraseña de usuarios con rol admin.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grupo-campo">
                <span className="grupo-campo__icono">
                  <img src="/piWeb/images/gmail.png" alt="Correo" />
                </span>
                <input
                  type="email"
                  placeholder="Correo del admin"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                />
              </div>

              <div className="grupo-campo grupo-campo--contrasena">
                <span className="grupo-campo__icono">
                  <img src="/piWeb/images/candado.png" alt="Nueva contraseña" />
                </span>
                <input
                  type="password"
                  className="input-contrasena"
                  placeholder="Nueva contraseña"
                  value={nuevaContrasena}
                  onChange={(event) => setNuevaContrasena(event.target.value)}
                />
              </div>

              <div className="grupo-campo grupo-campo--contrasena">
                <span className="grupo-campo__icono">
                  <img src="/piWeb/images/candado.png" alt="Confirmar contraseña" />
                </span>
                <input
                  type="password"
                  className="input-contrasena"
                  placeholder="Confirmar nueva contraseña"
                  value={confirmarContrasena}
                  onChange={(event) => setConfirmarContrasena(event.target.value)}
                />
              </div>

              <button className="boton boton--primario" type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar nueva contraseña'}
              </button>
            </form>

            <p className="tarjeta-formulario__nota">
              ¿Recordaste tu contraseña? <a href="/login">Inicia sesión</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="pie-pagina">
        <p className="derechos-reservados">
          2026 Sistema de Logistica de Transporte de Paqueteria. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}