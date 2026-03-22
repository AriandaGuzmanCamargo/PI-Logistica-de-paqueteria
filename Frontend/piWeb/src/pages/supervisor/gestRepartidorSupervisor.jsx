import React from 'react';
import MenuSupervisor from './menuSupervisor.jsx';

export default function GestRepartidorSupervisor() {
  return (
    <>
      <style>{`
    /* ── Gestión de Repartidores ── */
    .grep-titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 24px 0 18px;
    }

    /* Barra búsqueda + filtros */
    .grep-barra {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 22px;
      background: rgba(220,230,250,0.45);
      border: 1px solid rgba(200,215,240,0.4);
      border-radius: 14px;
      padding: 12px 16px;
    }
    .grep-buscar {
      flex: 1;
      min-width: 200px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.7);
      border: 1px solid #d0d8e8;
      border-radius: 10px;
      padding: 10px 14px;
    }
    .grep-buscar__icono { color: #8899b4; font-size: 18px; }
    .grep-buscar input {
      border: none; background: transparent; outline: none;
      font-size: 14px; color: #2b3552; width: 100%;
    }
    .grep-buscar input::placeholder { color: #9aa8c0; }

    .grep-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      color: #fff;
      transition: opacity 0.2s;
    }
    .grep-chip:hover { opacity: 0.85; }
    .grep-chip--activos { background: #3b6aaa; }
    .grep-chip--enruta  { background: #43a047; }
    .grep-chip--sin     { background: #f5a623; }
    .grep-chip__count {
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      padding: 1px 8px;
      font-size: 12px;
    }

    .grep-filtro-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
    }
    .grep-filtro-btn:hover { background: #fff; }
    .grep-agregar-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 18px; border-radius: 10px;
      border: none;
      background: #1a2d50;
      font-size: 14px; font-weight: 600; color: #fff;
      cursor: pointer;
      transition: background 0.2s;
    }
    .grep-agregar-btn:hover { background: #2a4a7a; }

    /* Grid de tarjetas */
    .grep-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
      margin-bottom: 22px;
    }

    /* Tarjeta repartidor */
    .grep-card {
      background: rgba(230,237,250,0.5);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 14px;
      padding: 18px 20px 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .grep-card__top {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .grep-card__foto {
      width: 72px; height: 72px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .grep-card__info { flex: 1; }
    .grep-card__nombre {
      font-size: 18px; font-weight: 700; color: #1a2d50;
      margin: 0 0 2px;
    }
    .grep-card__zona {
      font-size: 14px; color: #5a6d8a; margin: 0 0 6px;
    }
    .grep-card__badge-zona {
      display: inline-block;
      padding: 3px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      background: #3b6aaa;
    }

    /* Estado del repartidor */
    .grep-estado {
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
    }
    .grep-estado--enruta  { color: #43a047; }
    .grep-estado--sin     { color: #f5a623; }
    .grep-estado--fuera   { color: #e53935; }
    .grep-estado__dot {
      display: inline-block;
      width: 10px; height: 10px;
      border-radius: 50%;
      margin-right: 4px;
    }
    .grep-estado--enruta .grep-estado__dot  { background: #43a047; }
    .grep-estado--sin .grep-estado__dot     { background: #f5a623; }
    .grep-estado--fuera .grep-estado__dot   { background: #e53935; }

    /* Botones de acción */
    .grep-card__acciones {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .grep-accion {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 13px;
      font-weight: 500;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .grep-accion:hover { background: #fff; }
    .grep-accion__icono { font-size: 15px; }

    /* Paginación */
    .grep-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .grep-paginacion__info {
      font-size: 14px; color: #5a6d8a;
    }
    .grep-paginacion__paginas {
      display: flex; align-items: center; gap: 4px;
    }
    .grep-pag-btn {
      width: 34px; height: 34px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .grep-pag-btn:hover { background: #e8f0fb; }
    .grep-pag-btn--activo {
      background: #3b6aaa; color: #fff; border-color: #3b6aaa;
    }

    @media (max-width: 860px) {
      .grep-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .grep-barra { flex-direction: column; align-items: stretch; }
      .grep-buscar { min-width: auto; }
      .grep-paginacion { flex-direction: column; align-items: flex-start; }
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

      {/* Contenido Gestión de Repartidores */}
      <h2 className="grep-titulo">Gestión de Repartidores</h2>

      {/* Barra búsqueda + filtros */}
      <div className="grep-barra">
        <div className="grep-buscar">
          <span className="grep-buscar__icono">&#128269;</span>
          <input type="text" placeholder="Buscar repartidor..." />
        </div>
        <button className="grep-chip grep-chip--activos">&#10004; Activos <span className="grep-chip__count">148</span></button>
        <button className="grep-chip grep-chip--enruta">&#9679; En ruta <span className="grep-chip__count">58</span></button>
        <button className="grep-chip grep-chip--sin">&#9679; Sin asignación</button>
        <button className="grep-filtro-btn">&#9776; Filtro &#9662;</button>
        <button className="grep-agregar-btn">&#128100; Agregar Repartidor</button>
      </div>

      {/* Grid de tarjetas */}
      <div className="grep-grid">

        {/* Luis Garcia */}
        <div className="grep-card">
          <div className="grep-card__top">
            <img src="/piWeb/images/usuario.png" alt="Luis Garcia" className="grep-card__foto" />
            <div className="grep-card__info">
              <p className="grep-card__nombre">Luis Garcia</p>
              <p className="grep-card__zona">Centro</p>
              <span className="grep-card__badge-zona">Centro</span>
            </div>
            <span className="grep-estado grep-estado--enruta">
              <span className="grep-estado__dot"></span> En ruta
            </span>
          </div>
          <div className="grep-card__acciones">
            <a href="/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128205;</span> Ver ruta</a>
            <a href="/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128203;</span> Ver entregas</a>
            <button className="grep-accion"><span className="grep-accion__icono">&#128260;</span> Reasignar &gt;</button>
          </div>
        </div>

        {/* Javier Torres (Sin asignación) */}
        <div className="grep-card">
          <div className="grep-card__top">
            <img src="/piWeb/images/usuario.png" alt="Javier Torres" className="grep-card__foto" />
            <div className="grep-card__info">
              <p className="grep-card__nombre">Javier Torres</p>
              <p className="grep-card__zona">Roma Norte</p>
              <span className="grep-card__badge-zona" style={{background: '#f5a623'}}>Perr.</span>
            </div>
            <span className="grep-estado grep-estado--sin">
              <span className="grep-estado__dot"></span> Sin asignación
            </span>
          </div>
          <div className="grep-card__acciones">
            <a href="/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128205;</span> Ver ruta</a>
            <a href="/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128203;</span> Ver entregas</a>
            <button className="grep-accion"><span className="grep-accion__icono">&#128260;</span> Reasignar paquetes</button>
          </div>
        </div>

        {/* Javier Torres (Sin asignación - 2) */}
        <div className="grep-card">
          <div className="grep-card__top">
            <img src="/piWeb/images/usuario.png" alt="Javier Torres" className="grep-card__foto" />
            <div className="grep-card__info">
              <p className="grep-card__nombre">Javier Torres</p>
              <p className="grep-card__zona">Roma Norte</p>
              <span className="grep-card__badge-zona" style={{background: '#f5a623'}}>Sert.</span>
            </div>
            <span className="grep-estado grep-estado--sin">
              <span className="grep-estado__dot"></span> Sin asignación
            </span>
          </div>
          <div className="grep-card__acciones">
            <a href="/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128205;</span> Ver ruta</a>
            <a href="/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128203;</span> Ver entregas</a>
            <button className="grep-accion"><span className="grep-accion__icono">&#128260;</span> Reasignar &gt;</button>
          </div>
        </div>

        {/* Ricardo Muñoz (En ruta) */}
        <div className="grep-card">
          <div className="grep-card__top">
            <img src="/piWeb/images/usuario.png" alt="Ricardo Muñoz" className="grep-card__foto" />
            <div className="grep-card__info">
              <p className="grep-card__nombre">Ricardo Muñoz</p>
              <p className="grep-card__zona">Del Valle</p>
              <span className="grep-card__badge-zona" style={{background: '#f5a623'}}>Perc.</span>
            </div>
            <span className="grep-estado grep-estado--enruta">
              <span className="grep-estado__dot"></span> En ruta
            </span>
          </div>
          <div className="grep-card__acciones">
            <a href="/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128205;</span> Ver ruta</a>
            <a href="/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128203;</span> Ver entregas</a>
            <button className="grep-accion"><span className="grep-accion__icono">&#128260;</span> Reasignar paquetes</button>
          </div>
        </div>

        {/* Pedro Sanchez (En ruta) */}
        <div className="grep-card">
          <div className="grep-card__top">
            <img src="/piWeb/images/usuario.png" alt="Pedro Sanchez" className="grep-card__foto" />
            <div className="grep-card__info">
              <p className="grep-card__nombre">Pedro Sanchez</p>
              <p className="grep-card__zona">Coyoacán</p>
              <span className="grep-card__badge-zona" style={{background: '#f5a623'}}>Perc.</span>
            </div>
            <span className="grep-estado grep-estado--enruta">
              <span className="grep-estado__dot"></span> En ruta
            </span>
          </div>
          <div className="grep-card__acciones">
            <a href="/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128205;</span> Ver ruta</a>
            <a href="/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128203;</span> Ver entregas</a>
            <button className="grep-accion"><span className="grep-accion__icono">&#128260;</span> Reasignar &gt;</button>
          </div>
        </div>

        {/* Sofia Lozano (Fuera de servicio) */}
        <div className="grep-card">
          <div className="grep-card__top">
            <img src="/piWeb/images/usuario.png" alt="Sofia Lozano" className="grep-card__foto" />
            <div className="grep-card__info">
              <p className="grep-card__nombre">Sofia Lozano</p>
              <p className="grep-card__zona">Toluca</p>
              <span className="grep-card__badge-zona" style={{background: '#f5a623'}}>Sert.</span>
            </div>
            <span className="grep-estado grep-estado--fuera">
              <span className="grep-estado__dot"></span> Fuera de servicio
            </span>
          </div>
          <div className="grep-card__acciones">
            <a href="/piWeb/src/pages/supervisor/rutaRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128205;</span> Ver ruta</a>
            <a href="/piWeb/src/pages/supervisor/entregasRepartidorSupervisor.html" className="grep-accion"><span className="grep-accion__icono">&#128203;</span> Ver entregas</a>
            <button className="grep-accion"><span className="grep-accion__icono">&#128260;</span> Reasignar paquetes</button>
          </div>
        </div>

      </div>

      {/* Paginación */}
      <div className="grep-paginacion">
        <span className="grep-paginacion__info">Mostrando 5 de 148 repartidores</span>
        <div className="grep-paginacion__paginas">
          <button className="grep-pag-btn">&lt;</button>
          <button className="grep-pag-btn grep-pag-btn--activo">1</button>
          <button className="grep-pag-btn">2</button>
          <button className="grep-pag-btn">3</button>
          <button className="grep-pag-btn">4</button>
          <button className="grep-pag-btn">&gt;</button>
        </div>
      </div>

    </main>
  </div>
    </>
  );
}
