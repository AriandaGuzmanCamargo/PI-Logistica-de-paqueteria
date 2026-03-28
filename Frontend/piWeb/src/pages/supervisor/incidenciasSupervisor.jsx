import React from 'react';
import MenuSupervisor from './menuSupervisor.jsx';

export default function IncidenciasSupervisor() {
  return (
    <>
      <style>{`
    /* ── Gestión de Incidencias ── */
    .ginc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 24px 0 18px;
      flex-wrap: wrap;
      gap: 10px;
    }
    .ginc-titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ginc-header__acciones {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ginc-header-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 7px 14px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
    }
    .ginc-header-btn:hover { background: #fff; }

    /* Barra búsqueda + filtros */
    .ginc-barra {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
      background: rgba(220,230,250,0.45);
      border: 1px solid rgba(200,215,240,0.4);
      border-radius: 14px;
      padding: 12px 16px;
    }
    .ginc-buscar {
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
    .ginc-buscar__icono { color: #8899b4; font-size: 18px; }
    .ginc-buscar input {
      border: none; background: transparent; outline: none;
      font-size: 14px; color: #2b3552; width: 100%;
    }
    .ginc-buscar input::placeholder { color: #9aa8c0; }

    .ginc-chip {
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
    .ginc-chip:hover { opacity: 0.85; }
    .ginc-chip--pendiente { background: #3b6aaa; }
    .ginc-chip--progreso  { background: #43a047; }
    .ginc-chip--resuelto  { background: #43a047; }
    .ginc-chip__count {
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      padding: 1px 8px;
      font-size: 12px;
    }
    .ginc-filtro-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
    }
    .ginc-filtro-btn:hover { background: #fff; }

    /* Tabla contenedor */
    .ginc-tabla-wrap {
      background: rgba(230,237,250,0.45);
      border-radius: 14px;
      overflow-x: auto;
      border: 1px solid rgba(200,215,240,0.4);
      padding: 4px 0;
    }
    .ginc-seccion-titulo {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      padding: 16px 20px 6px;
      margin: 0;
    }

    .ginc-tabla {
      width: 100%;
      border-collapse: collapse;
      min-width: 780px;
    }
    .ginc-tabla thead th {
      text-align: left;
      padding: 12px 18px;
      font-size: 13px;
      font-weight: 700;
      color: #3b5585;
      border-bottom: 2px solid rgba(180,200,230,0.4);
    }
    .ginc-tabla tbody tr {
      border-bottom: 1px solid rgba(200,215,240,0.35);
      transition: background 0.15s;
    }
    .ginc-tabla tbody tr:hover { background: rgba(220,232,250,0.35); }
    .ginc-tabla tbody td {
      padding: 14px 18px;
      font-size: 14px;
      color: #2b3552;
      vertical-align: middle;
    }

    .ginc-guia {
      font-weight: 600;
      color: #1a2d50;
      font-size: 13px;
      letter-spacing: 0.3px;
    }

    /* Repartidor cell */
    .ginc-rep {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ginc-rep__foto {
      width: 48px; height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .ginc-rep__nombre {
      font-weight: 700; color: #1a2d50; font-size: 15px;
      margin: 0 0 1px;
    }
    .ginc-rep__zona {
      font-size: 13px; color: #5a6d8a; margin: 0;
    }
    .ginc-rep__email {
      font-size: 12px; color: #8899b4; margin: 0;
      display: flex; align-items: center; gap: 4px;
    }

    /* Tipo de problema */
    .ginc-problema {
      font-weight: 700; color: #1a2d50; font-size: 14px;
      margin: 0 0 2px;
    }
    .ginc-problema-hora {
      font-size: 13px; color: #5a6d8a; margin: 0;
    }

    /* Badges de estado */
    .ginc-estado {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }
    .ginc-estado--pendiente {
      background: #fff3e0; color: #e68a00;
    }
    .ginc-estado--progreso {
      background: #e8f5e9; color: #2e7d32;
    }
    .ginc-estado--resuelto {
      background: #e0f7fa; color: #00838f;
    }

    .ginc-ver-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 13px; color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ginc-ver-btn:hover { background: #fff; }

    /* Paginación */
    .ginc-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .ginc-paginacion__info { font-size: 14px; color: #5a6d8a; }
    .ginc-paginacion__paginas {
      display: flex; align-items: center; gap: 4px;
    }
    .ginc-pag-btn {
      width: 34px; height: 34px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ginc-pag-btn:hover { background: #e8f0fb; }
    .ginc-pag-btn--activo {
      background: #3b6aaa; color: #fff; border-color: #3b6aaa;
    }

    @media (max-width: 768px) {
      .ginc-barra { flex-direction: column; align-items: stretch; }
      .ginc-buscar { min-width: auto; }
      .ginc-paginacion { flex-direction: column; align-items: flex-start; }
    }
  `}</style>
      <div className="tablero-operador tablero-operador--sin-sidebar">

    {/* Contenedor del menú hamburguesa */}
    <div id="menuContainer" className="menu-overlay"><MenuSupervisor /></div>
    <div id="menuBackdrop" className="menu-overlay__backdrop"></div>

    <main className="panel-principal panel-principal--full panel-principal--supervisor">
      <header className="barra-superior barra-superior--con-logo barra-superior--supervisor-fija">
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

      {/* Contenido Gestión de Incidencias */}
      <div className="ginc-header">
        <h2 className="ginc-titulo">Gestión de Incidencias</h2>
        <div className="ginc-header__acciones">
          <button className="ginc-header-btn">&#9776; Filtro &#9662;</button>
          <button className="ginc-header-btn">&#9776; &#9873; &#9662;</button>
        </div>
      </div>

      {/* Barra búsqueda + filtros */}
      <div className="ginc-barra">
        <div className="ginc-buscar">
          <span className="ginc-buscar__icono">&#128269;</span>
          <input type="text" placeholder="Buscar incidencia..." />
        </div>
        <button className="ginc-chip ginc-chip--pendiente">&#128203; Pendiente <span className="ginc-chip__count">5</span></button>
        <button className="ginc-chip ginc-chip--progreso">&#10004; En progreso <span className="ginc-chip__count">3</span></button>
        <button className="ginc-chip ginc-chip--resuelto">&#10004; Resuelto <span className="ginc-chip__count">14</span></button>
        <button className="ginc-filtro-btn">&#9776; Filtro &#9662;</button>
      </div>

      {/* Tabla de incidencias */}
      <div className="ginc-tabla-wrap">
        <h3 className="ginc-seccion-titulo">Información del Envio</h3>
        <table className="ginc-tabla">
          <thead>
            <tr>
              <th>Guía</th>
              <th>Repartidor</th>
              <th>Tipo de problema</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="ginc-guia">PAK123456789</span></td>
              <td>
                <div className="ginc-rep">
                  <img src="/piWeb/images/usuario.png" alt="Luis García" className="ginc-rep__foto" />
                  <div>
                    <p className="ginc-rep__nombre">Luis García</p>
                    <p className="ginc-rep__zona">Centro</p>
                    <p className="ginc-rep__email">&#9993; Minar Inn</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="ginc-problema">Cliente ausente</p>
                <p className="ginc-problema-hora">10:30 AM</p>
              </td>
              <td><span className="ginc-estado ginc-estado--pendiente">&#10004; Pendiente</span></td>
              <td><button className="ginc-ver-btn">&#128203; Ver detalle</button></td>
            </tr>
            <tr>
              <td><span className="ginc-guia">MXZ4567320</span></td>
              <td>
                <div className="ginc-rep">
                  <img src="/piWeb/images/usuario.png" alt="Jorge Sánchez" className="ginc-rep__foto" />
                  <div>
                    <p className="ginc-rep__nombre">Jorge Sánchez</p>
                    <p className="ginc-rep__zona">Coyoacán</p>
                    <p className="ginc-rep__email">&#9993; Minar Inn</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="ginc-problema">Dirección incorrecta</p>
                <p className="ginc-problema-hora">3:15 PM</p>
              </td>
              <td><span className="ginc-estado ginc-estado--progreso">&#10148; En progreso</span></td>
              <td><button className="ginc-ver-btn">&#128203; Ver detalle</button></td>
            </tr>
            <tr>
              <td><span className="ginc-guia">MXZ67584321</span></td>
              <td>
                <div className="ginc-rep">
                  <img src="/piWeb/images/usuario.png" alt="Carlos Ramirez" className="ginc-rep__foto" />
                  <div>
                    <p className="ginc-rep__nombre">Carlos Ramirez</p>
                    <p className="ginc-rep__zona">Norte</p>
                    <p className="ginc-rep__email">&#9993; Minar Inn</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="ginc-problema">Retraso logístico</p>
                <p className="ginc-problema-hora">12:45 PM</p>
              </td>
              <td><span className="ginc-estado ginc-estado--pendiente">&#10004; Pendiente</span></td>
              <td><button className="ginc-ver-btn">&#128203; Ver detalle</button></td>
            </tr>
            <tr>
              <td><span className="ginc-guia">MX274760219</span></td>
              <td>
                <div className="ginc-rep">
                  <img src="/piWeb/images/usuario.png" alt="Pilar Suarez" className="ginc-rep__foto" />
                  <div>
                    <p className="ginc-rep__nombre">Pilar Suarez</p>
                    <p className="ginc-rep__zona">Toluca</p>
                    <p className="ginc-rep__email">&#9993; Minar Inn</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="ginc-problema">Paquete dañado</p>
                <p className="ginc-problema-hora">4:45 PM</p>
              </td>
              <td><span className="ginc-estado ginc-estado--resuelto">&#10004; Resuelto</span></td>
              <td><button className="ginc-ver-btn">&#128203; Ver detalle</button></td>
            </tr>
            <tr>
              <td><span className="ginc-guia">MX967654321</span></td>
              <td>
                <div className="ginc-rep">
                  <img src="/piWeb/images/usuario.png" alt="Laura Gómez" className="ginc-rep__foto" />
                  <div>
                    <p className="ginc-rep__nombre">Laura Gómez</p>
                    <p className="ginc-rep__zona">Del Valle</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="ginc-problema">Retraso logístico</p>
                <p className="ginc-problema-hora">1:10 PM</p>
              </td>
              <td><span className="ginc-estado ginc-estado--pendiente">&#10004; Pendiente</span></td>
              <td><button className="ginc-ver-btn">&#128203; Ver detalle</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="ginc-paginacion">
        <span className="ginc-paginacion__info">Mostrando 5 de 122 incidencias</span>
        <div className="ginc-paginacion__paginas">
          <button className="ginc-pag-btn">&lt;</button>
          <button className="ginc-pag-btn ginc-pag-btn--activo">1</button>
          <button className="ginc-pag-btn">2</button>
          <button className="ginc-pag-btn">3</button>
          <button className="ginc-pag-btn">4</button>
          <button className="ginc-pag-btn">5</button>
          <button className="ginc-pag-btn">&gt;</button>
          <button className="ginc-pag-btn">&gt;</button>
          <button className="ginc-pag-btn">&gt;</button>
        </div>
      </div>

    </main>
  </div>
    </>
  );
}
