import React from 'react';
import MenuSupervisor from './menuSupervisor.jsx';

export default function DetalleEnvioSupervisor() {
  return (
    <>
      <style>{`
    /* ── Detalle del Envío ── */
    .det-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin: 20px 0 22px;
    }
    .det-header__titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .det-header__guia {
      display: inline-block;
      padding: 4px 16px;
      border-radius: 8px;
      background: #1a2d50;
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      font-family: monospace;
      letter-spacing: 0.5px;
    }

    /* Layout 2 columnas */
    .det-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 24px;
    }

    /* Tarjeta genérica */
    .det-card {
      background: rgba(220,230,250,0.35);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      padding: 20px 24px;
    }
    .det-card__titulo {
      font-size: 17px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 16px;
      padding-bottom: 10px;
      border-bottom: 1.5px solid rgba(200,215,240,0.4);
    }

    /* ── Info Paquete ── */
    .det-paq__guia-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 14px;
    }
    .det-paq__guia-icono {
      font-size: 18px;
      color: #3b6aaa;
    }
    .det-paq__guia {
      font-size: 16px;
      font-weight: 700;
      color: #1a2d50;
      font-family: monospace;
    }
    .det-paq__campo {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 1.5;
    }
    .det-paq__label {
      color: #5a6d8a;
      min-width: 90px;
      font-weight: 500;
    }
    .det-paq__valor {
      color: #1a2d50;
      font-weight: 600;
    }

    /* ── Timeline estado del envío ── */
    .det-timeline {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
      padding: 10px 0 0;
      margin-bottom: 10px;
    }
    .det-timeline::before {
      content: '';
      position: absolute;
      top: 30px;
      left: 32px;
      right: 32px;
      height: 3px;
      background: #d0d8e8;
      z-index: 0;
    }
    .det-timeline__step {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      flex: 1;
    }
    .det-timeline__circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #fff;
      margin-bottom: 8px;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .det-timeline__circle--done {
      background: #5a9bd5;
    }
    .det-timeline__circle--active {
      background: #3b6aaa;
      width: 50px;
      height: 50px;
      font-size: 22px;
    }
    .det-timeline__circle--pending {
      background: #b0c4de;
    }
    .det-timeline__label {
      font-size: 13px;
      font-weight: 700;
      color: #1a2d50;
      text-align: center;
    }
    .det-timeline__label--active {
      font-weight: 800;
    }
    .det-timeline__fecha {
      font-size: 11px;
      color: #8899b4;
      text-align: center;
      margin-top: 2px;
    }

    /* ── Repartidor asignado ── */
    .det-rep {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .det-rep__foto {
      width: 80px;
      height: 80px;
      border-radius: 14px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .det-rep__info {
      flex: 1;
      min-width: 120px;
    }
    .det-rep__nombre {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 4px;
    }
    .det-rep__zona {
      font-size: 14px;
      color: #5a6d8a;
      margin: 0 0 8px;
    }
    .det-rep__badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 8px;
      background: #3b6aaa;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
    }
    .det-rep__acciones {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .det-rep-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s;
      white-space: nowrap;
    }
    .det-rep-btn:hover { opacity: 0.88; }
    .det-rep-btn--reasignar {
      background: #3b6aaa;
      color: #fff;
    }
    .det-rep-btn--retraso {
      background: #f5a623;
      color: #fff;
    }
    .det-rep-btn--incidencia {
      background: #e53935;
      color: #fff;
    }
    .det-rep-btn__icono { font-size: 15px; }

    /* Vehículo */
    .det-vehiculo {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 0 0;
      border-top: 1px solid rgba(200,215,240,0.35);
      margin-top: 4px;
    }
    .det-vehiculo__img {
      width: 80px;
      height: 50px;
      object-fit: contain;
      border-radius: 8px;
      background: rgba(240,244,255,0.5);
      padding: 4px;
    }
    .det-vehiculo__nombre {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
    }

    /* ── Estado del envío (lista vertical) ── */
    .det-estado-lista {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .det-estado-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid rgba(200,215,240,0.25);
      position: relative;
    }
    .det-estado-item:last-child { border-bottom: none; }
    .det-estado-item__check {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }
    .det-estado-item__check--done {
      background: #43a047;
      color: #fff;
    }
    .det-estado-item__check--pending {
      background: #d0d8e8;
      color: #fff;
    }
    .det-estado-item__label {
      font-size: 15px;
      color: #1a2d50;
      font-weight: 600;
    }
    .det-estado-item__label--active {
      font-weight: 800;
    }
    .det-estado-item--line::before {
      content: '';
      position: absolute;
      left: 13px;
      top: 0;
      height: 12px;
      width: 2px;
      background: #43a047;
    }

    /* ── Acciones Supervisor ── */
    .det-acciones-sv {
      margin-top: 4px;
    }
    .det-acciones-sv__btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 14px;
    }
    .det-sv-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s, background 0.2s;
    }
    .det-sv-btn:hover { opacity: 0.88; }
    .det-sv-btn--reasignar {
      background: rgba(255,255,255,0.85);
      color: #3b5585;
      border: 1.5px solid #d0d8e8;
    }
    .det-sv-btn--reasignar:hover { background: #fff; }
    .det-sv-btn--retraso {
      background: #f5a623;
      color: #fff;
    }
    .det-sv-btn__icono { font-size: 16px; }
    .det-sv-btn__flecha {
      font-size: 14px;
      margin-left: 4px;
    }

    /* ── Barra inferior ── */
    .det-barra-inf {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0 24px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .det-barra-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .det-barra-btn:hover { opacity: 0.88; }
    .det-barra-btn--volver {
      background: #3b6aaa;
      color: #fff;
    }
    .det-barra-btn--detalles {
      background: rgba(255,255,255,0.85);
      color: #3b5585;
      border: 1px solid #d0d8e8;
    }
    .det-barra-btn--detalles:hover { background: #fff; }
    .det-barra-btn__icono { font-size: 16px; }

    /* Responsive */
    @media (max-width: 860px) {
      .det-layout { grid-template-columns: 1fr; }
      .det-timeline { flex-wrap: wrap; gap: 12px; }
      .det-timeline::before { display: none; }
    }
    @media (max-width: 600px) {
      .det-header { flex-direction: column; align-items: flex-start; }
      .det-rep { flex-direction: column; align-items: flex-start; }
      .det-rep__acciones { flex-direction: row; flex-wrap: wrap; }
      .det-acciones-sv__btns { flex-direction: column; }
      .det-barra-inf { flex-direction: column; align-items: stretch; }
      .det-barra-btn { justify-content: center; }
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

      {/* Encabezado */}
      <div className="det-header">
        <h2 className="det-header__titulo">Detalle del Envío</h2>
        <span className="det-header__guia">PAK123456789</span>
      </div>

      {/* Layout 2 columnas */}
      <div className="det-layout">

        {/* Col izquierda fila 1: Información del Paquete */}
        <div className="det-card">
          <h3 className="det-card__titulo">Información del Paquete</h3>
          <div className="det-paq__guia-row">
            <span className="det-paq__guia-icono">&#128230;</span>
            <span className="det-paq__guia">PAK123456789</span>
          </div>
          <div className="det-paq__campo">
            <span className="det-paq__label">Cliente</span>
            <span className="det-paq__valor">Ana Martínez</span>
          </div>
          <div className="det-paq__campo">
            <span className="det-paq__label">Teléfono</span>
            <span className="det-paq__valor">(55) 1234 5678</span>
          </div>
          <div className="det-paq__campo">
            <span className="det-paq__label">Dirección</span>
            <span className="det-paq__valor">Col. Roma Norte, CDMX</span>
          </div>
          <div className="det-paq__campo">
            <span className="det-paq__label">Peso</span>
            <span className="det-paq__valor">2.6 kg</span>
          </div>
          <div className="det-paq__campo">
            <span className="det-paq__label">Dimensiones</span>
            <span className="det-paq__valor">30 cm x 25 cm x 20 cm</span>
          </div>
        </div>

        {/* Col derecha fila 1: Estado del Envío (timeline) */}
        <div className="det-card">
          <h3 className="det-card__titulo">Estado del Envío</h3>
          <div className="det-timeline">
            <div className="det-timeline__step">
              <div className="det-timeline__circle det-timeline__circle--done">&#10004;</div>
              <span className="det-timeline__label">Registrado</span>
              <span className="det-timeline__fecha">24 abr 8:00 AM</span>
            </div>
            <div className="det-timeline__step">
              <div className="det-timeline__circle det-timeline__circle--active">&#10004;</div>
              <span className="det-timeline__label det-timeline__label--active">En almacén</span>
              <span className="det-timeline__fecha">24 abr 8:45 AM</span>
            </div>
            <div className="det-timeline__step">
              <div className="det-timeline__circle det-timeline__circle--done">&#10004;</div>
              <span className="det-timeline__label det-timeline__label--active">En ruta</span>
              <span className="det-timeline__fecha">24 abr 9:20 AM</span>
            </div>
            <div className="det-timeline__step">
              <div className="det-timeline__circle det-timeline__circle--done">&#10004;</div>
              <span className="det-timeline__label">Entregado</span>
              <span className="det-timeline__fecha">24 abr 10:30 AM</span>
            </div>
          </div>
        </div>

        {/* Col izquierda fila 2: Estado del Envío (lista) */}
        <div className="det-card">
          <h3 className="det-card__titulo">Estado del Envío</h3>
          <div className="det-estado-lista">
            <div className="det-estado-item">
              <span className="det-estado-item__check det-estado-item__check--done">&#10004;</span>
              <span className="det-estado-item__label">Registrado</span>
            </div>
            <div className="det-estado-item det-estado-item--line">
              <span className="det-estado-item__check det-estado-item__check--done">&#10004;</span>
              <span className="det-estado-item__label">En almacén</span>
            </div>
            <div className="det-estado-item det-estado-item--line">
              <span className="det-estado-item__check det-estado-item__check--done">&#10004;</span>
              <span className="det-estado-item__label det-estado-item__label--active">En ruta</span>
            </div>
            <div className="det-estado-item det-estado-item--line">
              <span className="det-estado-item__check det-estado-item__check--done">&#10004;</span>
              <span className="det-estado-item__label">Entregado</span>
            </div>
          </div>
        </div>

        {/* Col derecha fila 2: Repartidor Asignado */}
        <div className="det-card">
          <h3 className="det-card__titulo">Repartidor Asignado</h3>
          <div className="det-rep">
            <img src="/piWeb/images/usuario.png" alt="Luis García" className="det-rep__foto" />
            <div className="det-rep__info">
              <p className="det-rep__nombre">Luis García</p>
              <p className="det-rep__zona">Centro</p>
              <span className="det-rep__badge">Centro</span>
            </div>
            <div className="det-rep__acciones">
              <button className="det-rep-btn det-rep-btn--reasignar">
                <span className="det-rep-btn__icono">&#128230;</span> Reasignar repartidor
              </button>
              <button className="det-rep-btn det-rep-btn--retraso">
                <span className="det-rep-btn__icono">&#9888;</span> Marcar retraso
              </button>
              <button className="det-rep-btn det-rep-btn--incidencia">
                <span className="det-rep-btn__icono">&#9888;</span> Reportar incidencia
              </button>
            </div>
          </div>
          <div className="det-vehiculo">
            <img src="/piWeb/images/logoSinFondo.png" alt="Nissan NV200" className="det-vehiculo__img" />
            <span className="det-vehiculo__nombre">Nissan NV200</span>
          </div>
        </div>

      </div>

      {/* Acciones Supervisor */}
      <div className="det-card det-acciones-sv">
        <h3 className="det-card__titulo">Acciones Supervisor</h3>
        <div className="det-acciones-sv__btns">
          <button className="det-sv-btn det-sv-btn--reasignar">
            <span className="det-sv-btn__icono">&#128230;</span> Reasignar repartidor
            <span className="det-sv-btn__flecha">&rsaquo;</span>
          </button>
          <button className="det-sv-btn det-sv-btn--retraso">
            <span className="det-sv-btn__icono">&#9200;</span> Marcar retraso
          </button>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="det-barra-inf">
        <a href="/piWeb/src/pages/supervisor/enviosSupervisor.html" className="det-barra-btn det-barra-btn--volver">
          &lsaquo; Volver
        </a>
        <button className="det-barra-btn det-barra-btn--detalles">
          <span className="det-barra-btn__icono">&#9776;</span> Detalles
        </button>
      </div>

    </main>
  </div>
    </>
  );
}
