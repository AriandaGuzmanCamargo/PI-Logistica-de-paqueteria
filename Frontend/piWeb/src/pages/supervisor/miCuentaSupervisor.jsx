import React from 'react';
import MenuSupervisor from './menuSupervisor.jsx';

export default function MiCuentaSupervisor() {
  return (
    <>
      <style>{`
    /* ── Contenido Mi Cuenta ── */
    .perfil-contenedor {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }
    .perfil-card {
      background: rgba(220,230,245,0.75);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      width: min(520px, 100%);
      padding: 36px 40px 32px;
      position: relative;
      box-shadow: 0 12px 40px rgba(30,54,96,0.18);
      border: 1px solid rgba(255,255,255,0.3);
    }
    .perfil-card__cerrar {
      position: absolute;
      top: 16px;
      right: 18px;
      background: none;
      border: none;
      font-size: 28px;
      color: #4c5880;
      cursor: pointer;
      line-height: 1;
      text-decoration: none;
    }
    .perfil-card__cerrar:hover { color: #1a2d50; }

    /* Avatar */
    .perfil-avatar-wrap {
      text-align: center;
      margin-bottom: 14px;
    }
    .perfil-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid rgba(255,255,255,0.6);
      box-shadow: 0 4px 20px rgba(30,54,96,0.2);
    }
    .perfil-nombre {
      text-align: center;
      margin: 0 0 2px;
      font-size: 24px;
      font-weight: 700;
      color: #1a2d50;
    }
    .perfil-rol {
      text-align: center;
      font-size: 14px;
      color: #4c5880;
      margin: 0 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .perfil-rol__dot {
      width: 10px;
      height: 10px;
      background: #4caf50;
      border-radius: 50%;
      display: inline-block;
    }

    /* Info datos */
    .perfil-datos {
      margin-bottom: 20px;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .perfil-datos__left {
      flex: 1;
      min-width: 220px;
    }
    .perfil-datos__right {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-end;
    }
    .perfil-dato {
      margin: 0 0 8px;
      font-size: 15px;
      color: #2b3552;
    }
    .perfil-dato strong {
      color: #3b6aaa;
      font-weight: 700;
    }
    .perfil-dato .perfil-dato__pin {
      color: #e53935;
    }

    /* Botones editar / cambiar */
    .perfil-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #d8e0f0;
      background: rgba(255,255,255,0.7);
      color: #3b6aaa;
      transition: background 0.2s;
    }
    .perfil-btn:hover {
      background: rgba(255,255,255,0.95);
    }
    .perfil-btn__icon {
      font-size: 16px;
    }

    /* Formulario contraseñas */
    .perfil-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 18px;
    }
    .perfil-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.55);
      border: 1px solid rgba(200,210,230,0.5);
      border-radius: 8px;
      padding: 10px 14px;
    }
    .perfil-input-row label {
      font-size: 13px;
      color: #4c5880;
      min-width: 160px;
      flex-shrink: 0;
    }
    .perfil-input-row input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 14px;
      color: #2b3552;
      outline: none;
    }

    /* Botón guardar */
    .perfil-guardar {
      display: block;
      margin: 0 auto;
      background: linear-gradient(180deg, #f2c44e 0%, #d4a235 100%);
      color: #fff;
      border: none;
      padding: 12px 40px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
    }
    .perfil-guardar:hover {
      background: linear-gradient(180deg, #d4a235 0%, #f2c44e 100%);
    }

    @media (max-width: 540px) {
      .perfil-card { padding: 24px 20px; }
      .perfil-datos { flex-direction: column; }
      .perfil-datos__right { align-items: stretch; }
      .perfil-input-row { flex-direction: column; align-items: flex-start; }
      .perfil-input-row label { min-width: auto; }
    }
  `}</style>
      <div className="tablero-operador tablero-operador--sin-sidebar">

    {/* Contenedor del menú hamburguesa */}
    <div id="menuContainer" className="menu-overlay"><MenuSupervisor /></div>
    <div id="menuBackdrop" className="menu-overlay__backdrop"></div>

    <main className="panel-principal panel-principal--full">
      <header className="barra-superior barra-superior--con-logo">
        <div className="barra-superior__left">
          <button id="btnMenu" className="btn-menu-hamburguesa" aria-label="Abrir menú">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div className="header-logo">
            <img src="/piWeb/images/logoSinFondo.png" alt="Metzvia" />
          </div>
          <h1 className="barra-superior__titulo">Supervisor</h1>
        </div>
        <div className="barra-superior__perfil">
          <span className="badge-servicio">
            <span className="header-sv__punto-verde"></span> En servicio
          </span>
          <img src="/piWeb/images/usuario.png" alt="Supervisor" className="barra-superior__avatar" />
          <span className="barra-superior__chevron">&#9662;</span>
        </div>
      </header>

      {/* Contenido Mi Cuenta */}
      <section className="perfil-contenedor">
        <div className="perfil-card">
          <a href="/piWeb/src/pages/supervisor/dashboardSupervisor.html" className="perfil-card__cerrar">&times;</a>

          <div className="perfil-avatar-wrap">
            <img src="/piWeb/images/usuario.png" alt="Roberto Salazar" className="perfil-avatar" />
          </div>
          <h2 className="perfil-nombre">Roberto Salazar</h2>
          <p className="perfil-rol"><span className="perfil-rol__dot"></span> Supervisor</p>

          <div className="perfil-datos">
            <div className="perfil-datos__left">
              <p className="perfil-dato"><strong>Trabajo:</strong> Supervisor</p>
              <p className="perfil-dato"><strong>Zona asignada:</strong> <span className="perfil-dato__pin">&#128205;</span> Centro</p>
              <p className="perfil-dato"><strong>Correo:</strong> roberto.salazar@metzvia.com</p>
              <p className="perfil-dato"><strong>Teléfono:</strong> +32 55 1234 5678</p>
            </div>
            <div className="perfil-datos__right">
              <button className="perfil-btn">
                <span className="perfil-btn__icon">&#9998;</span> Editar perfil
              </button>
              <button className="perfil-btn">
                <span className="perfil-btn__icon">&#128274;</span> Cambiar contraseña
              </button>
            </div>
          </div>

          <div className="perfil-form">
            <div className="perfil-input-row">
              <label>Contraseña Actual</label>
              <input type="password" />
            </div>
            <div className="perfil-input-row">
              <label>Nueva Contraseña</label>
              <input type="password" />
            </div>
            <div className="perfil-input-row">
              <label>Confirmar Contraseña</label>
              <input type="password" />
            </div>
          </div>

          <button className="perfil-guardar">Guardar Cambios</button>
        </div>
      </section>

    </main>
  </div>
    </>
  );
}
