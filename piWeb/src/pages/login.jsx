import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const ojoBotones = document.querySelectorAll('.grupo-campo__ojo');
    ojoBotones.forEach(boton => {
      boton.addEventListener('click', (e) => {
        e.preventDefault();
        const input = boton.parentElement.querySelector('.input-contrasena');
        const ojoAbierto = boton.querySelector('.ojo-abierto');
        const ojoCerrado = boton.querySelector('.ojo-cerrado');

        if (input.type === 'password') {
          input.type = 'text';
          ojoAbierto.style.display = 'none';
          ojoCerrado.style.display = 'block';
        } else {
          input.type = 'password';
          ojoAbierto.style.display = 'block';
          ojoCerrado.style.display = 'none';
        }
      });
    });
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
            <h2>Iniciar Sesión</h2>
            <p className="tarjeta-formulario__subtitulo">Bienvenido. Por favor inicie sesión para continuar.</p>

            <div className="grupo-campo">
              <span className="grupo-campo__icono">
                <img src="/piWeb/images/gmail.png" alt="Correo" />
              </span>
              <input type="email" placeholder="Correo electrónico" />
            </div>

            <div className="grupo-campo grupo-campo--contrasena">
              <span className="grupo-campo__icono">
                <img src="/piWeb/images/candado.png" alt="Contraseña" />
              </span>
              <input type="password" placeholder="Contraseña" className="input-contrasena" />
              <button className="grupo-campo__ojo" type="button" aria-label="Mostrar/ocultar contraseña">
                <img src="/piWeb/images/ojo-abierto.png" alt="Ver contraseña" className="ojo-abierto" />
                <img src="/piWeb/images/ojo.png" alt="Ocultar contraseña" className="ojo-cerrado" style={{display: 'none'}} />
              </button>
            </div>

            <button className="boton boton--primario" onClick={() => navigate('/operador/dashboard')}>Iniciar Sesión</button>
            <a className="enlace-olvido" href="/recuperacionContraseña.html">¿Olvidaste tu contraseña?</a>

            <p className="tarjeta-formulario__nota">¿No tienes cuenta? <a href="/registro.html">Regístrate</a></p>
            <div className="tarjeta-formulario__divisor">o</div>

            <button className="boton boton--social boton--google">
              <span className="boton__icono">G</span>
              Iniciar sesión con Google
            </button>
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
