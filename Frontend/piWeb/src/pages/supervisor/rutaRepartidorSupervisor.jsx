import React, { useEffect } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';

export default function RutaRepartidorSupervisor() {

  useEffect(() => {
    // ── Mapa Leaflet ──
        (function () {
          var map = L.map('rutaMapa', {
            zoomControl: false
          }).setView([19.4326, -99.1332], 14);
    
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
          }).addTo(map);
    
          // Icono almacén
          var iconAlmacen = L.divIcon({
            className: '',
            html: '<div style="background:#3b6aaa;color:#fff;border-radius:8px;padding:4px 8px;font-size:13px;font-weight:700;white-space:nowrap;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.2);">&#9642; Almacén</div>',
            iconSize: [80, 30],
            iconAnchor: [40, 15]
          });
    
          // Icono punto de entrega
          function iconEntrega(numero, color) {
            return L.divIcon({
              className: '',
              html: '<div style="background:' + color + ';color:#fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25);">' + numero + '</div>',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });
          }
    
          // Marcador del repartidor
          var iconRepartidor = L.divIcon({
            className: '',
            html: '<div style="background:#f5a623;color:#fff;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);">R</div>',
            iconSize: [32, 32],
            iconAnchor: [16, 16]
          });
    
          // Puntos de la ruta (simulados sobre CDMX)
          var almacen = [19.4280, -99.1480];
          var puntos = [
            { coord: [19.4230, -99.1400], nombre: 'Ana García', color: '#3b6aaa' },
            { coord: [19.4260, -99.1350], nombre: 'Carlos Ramírez', color: '#3b6aaa' },
            { coord: [19.4310, -99.1300], nombre: 'Laura Gómez', color: '#3b6aaa' },
            { coord: [19.4380, -99.1250], nombre: 'Jorge Sánchez', color: '#f5a623' },
            { coord: [19.4420, -99.1200], nombre: 'Pilar Suárez', color: '#3b6aaa' }
          ];
    
          // Marcador almacén
          L.marker(almacen, { icon: iconAlmacen }).addTo(map)
            .bindPopup('<strong>Almacén Central</strong><br>Punto de salida');
    
          // Marcadores de entrega
          puntos.forEach(function (p, i) {
            L.marker(p.coord, { icon: iconEntrega(i + 1, p.color) }).addTo(map)
              .bindPopup('<strong>' + p.nombre + '</strong>');
          });
    
          // Repartidor actual
          L.marker([19.4260, -99.1370], { icon: iconRepartidor }).addTo(map)
            .bindPopup('<strong>Luis García</strong><br>Repartidor en ruta');
    
          // Ruta como línea
          var rutaCoords = [almacen].concat(puntos.map(function (p) { return p.coord; }));
          L.polyline(rutaCoords, {
            color: '#3b6aaa',
            weight: 4,
            opacity: 0.8,
            dashArray: '8, 6'
          }).addTo(map);
    
          // Ajustar vista
          var bounds = L.latLngBounds(rutaCoords);
          map.fitBounds(bounds, { padding: [40, 40] });
    
          // Actualización automática simulada (cada 30 seg)
          var updateInterval = setInterval(function () {
            // En producción: fetch a API para obtener posición actual del repartidor
            console.log('Actualizando posición del repartidor...');
          }, 30000);
    
          // Limpiar interval al salir
          window.addEventListener('beforeunload', function () {
            clearInterval(updateInterval);
          });
        })();
    
        // ── Tabs ──
        (function () {
          var tabs = document.querySelectorAll('.ruta-tab');
          tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
              tabs.forEach(function (t) { t.classList.remove('ruta-tab--activo'); });
              tab.classList.add('ruta-tab--activo');
            });
          });
        })();
  }, []);
  return (
    <>
      <style>{`
    /* ── Ruta del Repartidor ── */
    .ruta-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0 18px;
    }
    .ruta-header__titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ruta-header__volver {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 18px;
      border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.85);
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }
    .ruta-header__volver:hover { background: #fff; }

    /* Layout principal */
    .ruta-layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 18px;
      min-height: 520px;
    }

    /* Panel izquierdo */
    .ruta-panel-izq {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: rgba(220,230,250,0.35);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      overflow: hidden;
    }

    /* Info del repartidor */
    .ruta-driver {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 22px 14px;
      background: rgba(230,237,250,0.55);
      border-bottom: 1px solid rgba(200,215,240,0.35);
      flex-wrap: wrap;
    }
    .ruta-driver__foto {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .ruta-driver__info {
      flex: 1;
      min-width: 180px;
    }
    .ruta-driver__nombre {
      font-size: 20px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 4px;
    }
    .ruta-driver__zona-text {
      font-size: 14px;
      color: #5a6d8a;
      margin: 0 0 8px;
    }
    .ruta-driver__badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .ruta-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
    }
    .ruta-badge--zona { background: #3b6aaa; }
    .ruta-badge--vehiculo { background: #4a6fa5; }
    .ruta-badge--vehiculo::before { content: ""; }

    .ruta-driver__estado {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }
    .ruta-estado-label {
      font-size: 13px;
      color: #5a6d8a;
    }
    .ruta-estado-valor {
      font-size: 15px;
      font-weight: 700;
      color: #43a047;
    }
    .ruta-estado-valor::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #43a047;
      margin-right: 6px;
    }

    /* Mapa */
    .ruta-mapa-wrap {
      position: relative;
      flex: 1;
      min-height: 320px;
    }
    #rutaMapa {
      width: 100%;
      height: 100%;
      min-height: 320px;
      z-index: 1;
    }
    .ruta-mapa__zoom {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 500;
    }
    .ruta-mapa__zoom-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.92);
      font-size: 20px;
      font-weight: 700;
      color: #3b5585;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .ruta-mapa__zoom-btn:hover { background: #fff; }

    /* Panel entregas sobre el mapa */
    .ruta-entregas-mapa {
      position: absolute;
      bottom: 14px;
      left: 14px;
      right: 60px;
      background: rgba(255,255,255,0.95);
      border: 1px solid rgba(200,215,240,0.5);
      border-radius: 14px;
      padding: 14px 18px 12px;
      z-index: 500;
      backdrop-filter: blur(6px);
    }
    .ruta-entregas-mapa__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .ruta-entregas-mapa__titulo {
      font-size: 16px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ruta-entregas-mapa__meta {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .ruta-tiempo {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: #5a6d8a;
      font-weight: 600;
    }
    .ruta-tiempo__icono { font-size: 16px; }
    .ruta-entregas-mapa__more {
      border: none;
      background: none;
      font-size: 20px;
      color: #5a6d8a;
      cursor: pointer;
      letter-spacing: 2px;
    }

    .ruta-entregas-mapa__tabla {
      width: 100%;
      border-collapse: collapse;
    }
    .ruta-entregas-mapa__tabla th {
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      color: #8899b4;
      padding: 4px 8px 8px;
      border-bottom: 1px solid #e4eaf4;
    }
    .ruta-entregas-mapa__tabla td {
      font-size: 14px;
      color: #2b3552;
      padding: 8px;
      vertical-align: middle;
    }
    .ruta-entregas-mapa__tabla .td-icono {
      width: 30px;
      text-align: center;
      color: #3b6aaa;
      font-size: 18px;
    }
    .ruta-entregas-mapa__tabla .td-guia {
      font-size: 12px;
      color: #8899b4;
    }
    .ruta-entregas-mapa__tabla .td-nombre {
      font-weight: 600;
    }

    /* Badges estado entrega */
    .entrega-estado {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
    .entrega-estado--enruta { background: #43a047; }
    .entrega-estado--pendiente { background: #f5a623; }
    .entrega-estado--completada { background: #3b6aaa; }
    .entrega-estado__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
    }
    .entrega-estado__flecha { font-size: 14px; }

    /* ── Panel derecho: lista entregas ── */
    .ruta-panel-der {
      background: rgba(230,237,250,0.5);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .ruta-lista__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px 0;
    }
    .ruta-lista__titulo {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .ruta-lista__view-toggle {
      display: flex;
      gap: 4px;
    }
    .ruta-lista__view-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 16px;
      color: #3b5585;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ruta-lista__view-btn--activo {
      background: #3b6aaa;
      color: #fff;
      border-color: #3b6aaa;
    }

    /* Tabs */
    .ruta-lista__tabs {
      display: flex;
      gap: 0;
      padding: 14px 18px 0;
      border-bottom: 2px solid #e4eaf4;
    }
    .ruta-tab {
      padding: 8px 18px;
      font-size: 14px;
      font-weight: 600;
      color: #5a6d8a;
      border: none;
      background: none;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      transition: color 0.2s, border-color 0.2s;
    }
    .ruta-tab:hover { color: #1a2d50; }
    .ruta-tab--activo {
      color: #1a2d50;
      border-bottom-color: #3b6aaa;
    }
    .ruta-tab--completadas {
      color: #3b6aaa;
    }

    /* Encabezados tabla lista */
    .ruta-lista__cols {
      display: grid;
      grid-template-columns: 36px 1fr 100px;
      gap: 6px;
      padding: 12px 18px 6px;
      font-size: 13px;
      font-weight: 600;
      color: #8899b4;
    }

    /* Tarjetas de entrega */
    .ruta-lista__items {
      flex: 1;
      overflow-y: auto;
      padding: 0 12px 12px;
    }
    .ruta-entrega-card {
      display: grid;
      grid-template-columns: 36px 1fr 100px;
      gap: 6px;
      align-items: center;
      padding: 14px 8px;
      border-bottom: 1px solid rgba(200,215,240,0.35);
      transition: background 0.15s;
    }
    .ruta-entrega-card:hover { background: rgba(255,255,255,0.5); }
    .ruta-entrega-card:last-child { border-bottom: none; }
    .ruta-entrega-card__icono {
      font-size: 20px;
      color: #3b6aaa;
      text-align: center;
    }
    .ruta-entrega-card__info {
      min-width: 0;
    }
    .ruta-entrega-card__nombre {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ruta-entrega-card__dir {
      font-size: 13px;
      color: #5a6d8a;
      margin: 0 0 2px;
    }
    .ruta-entrega-card__hora {
      font-size: 12px;
      color: #8899b4;
      margin: 0;
    }
    .ruta-entrega-card__estado {
      text-align: right;
    }

    /* Paginación */
    .ruta-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0 18px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .ruta-paginacion__info {
      font-size: 14px;
      color: #5a6d8a;
    }
    .ruta-paginacion__paginas {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .ruta-pag-btn {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 14px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ruta-pag-btn:hover { background: #e8f0fb; }
    .ruta-pag-btn--activo {
      background: #3b6aaa;
      color: #fff;
      border-color: #3b6aaa;
    }

    /* Responsive */
    @media (max-width: 960px) {
      .ruta-layout {
        grid-template-columns: 1fr;
      }
      .ruta-panel-der {
        max-height: 400px;
      }
    }
    @media (max-width: 600px) {
      .ruta-header { flex-direction: column; align-items: flex-start; gap: 10px; }
      .ruta-driver { flex-direction: column; align-items: flex-start; }
      .ruta-driver__estado { align-items: flex-start; }
      .ruta-entregas-mapa { right: 14px; }
      .ruta-lista__cols { grid-template-columns: 30px 1fr 90px; }
      .ruta-entrega-card { grid-template-columns: 30px 1fr 90px; }
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
      </header>

      {/* Encabezado de la ruta */}
      <div className="ruta-header">
        <h2 className="ruta-header__titulo">Ruta del Repartidor</h2>
        <a href="/piWeb/src/pages/supervisor/gestRepartidorSupervisor.html" className="ruta-header__volver">
          &lsaquo; Volver
        </a>
      </div>

      {/* Layout 2 columnas */}
      <div className="ruta-layout">

        {/* Panel izquierdo: info + mapa */}
        <div className="ruta-panel-izq">

          {/* Info del repartidor */}
          <div className="ruta-driver">
            <img src="/piWeb/images/usuario.png" alt="Luis García" className="ruta-driver__foto" />
            <div className="ruta-driver__info">
              <p className="ruta-driver__nombre">Luis García</p>
              <p className="ruta-driver__zona-text">Centro</p>
              <div className="ruta-driver__badges">
                <span className="ruta-badge ruta-badge--zona">Centro</span>
                <span className="ruta-badge ruta-badge--vehiculo">Nissan NV200</span>
              </div>
            </div>
            <div className="ruta-driver__estado">
              <span className="ruta-estado-label">Estado</span>
              <span className="ruta-estado-valor">En ruta</span>
            </div>
          </div>

          {/* Mapa */}
          <div className="ruta-mapa-wrap">
            <div id="rutaMapa"></div>

            {/* Panel entregas sobre el mapa */}
            <div className="ruta-entregas-mapa">
              <div className="ruta-entregas-mapa__header">
                <h3 className="ruta-entregas-mapa__titulo">Entregas de la Ruta</h3>
                <div className="ruta-entregas-mapa__meta">
                  <span className="ruta-tiempo">Tiempo restante</span>
                  <button className="ruta-entregas-mapa__more" aria-label="Más opciones">&#8943;</button>
                </div>
              </div>
              <table className="ruta-entregas-mapa__tabla">
                <thead>
                  <tr>
                    <th></th>
                    <th>Guía</th>
                    <th>Cliente</th>
                    <th>Dirección</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-icono">&#9776;</td>
                    <td>
                      <span className="td-nombre">Ana Martínez</span><br />
                      <span className="td-guia">PAK123456299</span>
                    </td>
                    <td></td>
                    <td>Roma Norte<br />10:00 – 11:00 AM</td>
                    <td>
                      <span className="entrega-estado entrega-estado--enruta">
                        <span className="entrega-estado__dot"></span> En ruta
                        <span className="entrega-estado__flecha">&rsaquo;</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Panel derecho: lista de entregas */}
        <div className="ruta-panel-der">
          <div className="ruta-lista__header">
            <h3 className="ruta-lista__titulo">Entregas de la Ruta</h3>
            <div className="ruta-lista__view-toggle">
              <button className="ruta-lista__view-btn ruta-lista__view-btn--activo" aria-label="Lista">&#9776;</button>
              <button className="ruta-lista__view-btn" aria-label="Compacto">&#9135;</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="ruta-lista__tabs">
            <button className="ruta-tab ruta-tab--activo">En ruta</button>
            <button className="ruta-tab">Pendientes</button>
            <button className="ruta-tab ruta-tab--completadas">Completadas</button>
          </div>

          {/* Encabezados */}
          <div className="ruta-lista__cols">
            <span>Guía</span>
            <span>Cliente</span>
            <span>Estado</span>
          </div>

          {/* Lista de entregas */}
          <div className="ruta-lista__items">

            {/* Ana García */}
            <div className="ruta-entrega-card">
              <span className="ruta-entrega-card__icono">&#9776;</span>
              <div className="ruta-entrega-card__info">
                <p className="ruta-entrega-card__nombre">Ana García</p>
                <p className="ruta-entrega-card__dir">Roma Norte</p>
                <p className="ruta-entrega-card__hora">10:00 – 11:00 AM</p>
              </div>
              <div className="ruta-entrega-card__estado">
                <span className="entrega-estado entrega-estado--enruta">
                  <span className="entrega-estado__dot"></span> En ruta
                </span>
              </div>
            </div>

            {/* Carlos Ramírez */}
            <div className="ruta-entrega-card">
              <span className="ruta-entrega-card__icono">&#9776;</span>
              <div className="ruta-entrega-card__info">
                <p className="ruta-entrega-card__nombre">Carlos Ramírez</p>
                <p className="ruta-entrega-card__dir">Tecnológico 210</p>
                <p className="ruta-entrega-card__hora">12:00 – 1:00 PM</p>
              </div>
              <div className="ruta-entrega-card__estado">
                <span className="entrega-estado entrega-estado--enruta">
                  <span className="entrega-estado__dot"></span> En ruta
                </span>
              </div>
            </div>

            {/* Laura Gómez */}
            <div className="ruta-entrega-card">
              <span className="ruta-entrega-card__icono">&#9776;</span>
              <div className="ruta-entrega-card__info">
                <p className="ruta-entrega-card__nombre">Laura Gómez</p>
                <p className="ruta-entrega-card__dir">Revolución 456</p>
                <p className="ruta-entrega-card__hora">1:00 – 3:00 PM</p>
              </div>
              <div className="ruta-entrega-card__estado">
                <span className="entrega-estado entrega-estado--enruta">
                  <span className="entrega-estado__dot"></span> En ruta
                </span>
              </div>
            </div>

            {/* Jorge Sánchez */}
            <div className="ruta-entrega-card">
              <span className="ruta-entrega-card__icono">&#9776;</span>
              <div className="ruta-entrega-card__info">
                <p className="ruta-entrega-card__nombre">Jorge Sánchez</p>
                <p className="ruta-entrega-card__dir">Universidad 789</p>
                <p className="ruta-entrega-card__hora">2:00 – 3:30 PM</p>
              </div>
              <div className="ruta-entrega-card__estado">
                <span className="entrega-estado entrega-estado--enruta">
                  <span className="entrega-estado__dot"></span> En ruta
                </span>
              </div>
            </div>

            {/* Pilar Suárez */}
            <div className="ruta-entrega-card">
              <span className="ruta-entrega-card__icono">&#9776;</span>
              <div className="ruta-entrega-card__info">
                <p className="ruta-entrega-card__nombre">Pilar Suárez</p>
                <p className="ruta-entrega-card__dir">Oriente 230, Toluca</p>
                <p className="ruta-entrega-card__hora">3:00 – 4:30 PM</p>
              </div>
              <div className="ruta-entrega-card__estado">
                <span className="entrega-estado entrega-estado--enruta">
                  <span className="entrega-estado__dot"></span> En ruta
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Paginación */}
      <div className="ruta-paginacion">
        <span className="ruta-paginacion__info">Mostrando 5 de 148 repartidores</span>
        <div className="ruta-paginacion__paginas">
          <button className="ruta-pag-btn">&lt;</button>
          <button className="ruta-pag-btn">1</button>
          <button className="ruta-pag-btn ruta-pag-btn--activo">2</button>
          <button className="ruta-pag-btn">3</button>
          <button className="ruta-pag-btn">4</button>
          <button className="ruta-pag-btn">5</button>
          <button className="ruta-pag-btn">&gt;</button>
        </div>
      </div>

    </main>
  </div>
    </>
  );
}
