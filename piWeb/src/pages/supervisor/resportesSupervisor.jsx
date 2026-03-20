import React from 'react';

export default function ResportesSupervisor() {
  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">

    {/* Menú hamburguesa */}
    <div id="menuContainer" className="menu-overlay"></div>
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

      {/* Título + controles fecha/exportar */}
      <div className="rep-header">
        <h2 className="rep-header__titulo">Reportes</h2>
        <div className="rep-header__controles">
          <button className="rep-header__fecha">
            &#128197; 15 – 21 Abr, 2024 <span>&#8964;</span>
          </button>
          <button className="rep-header__exportar">
            &#128196; Exportar PDF
          </button>
          <button className="rep-header__flecha">&#8593;</button>
        </div>
      </div>

      {/* Tarjetas resumen reportes */}
      <section className="rep-resumen">
        <article className="rep-card rep-card--azul">
          <span className="rep-card__icono">&#128230;</span>
          <div>
            <p className="rep-card__numero">1,152</p>
            <p className="rep-card__label">Entregas Totales</p>
          </div>
        </article>
        <article className="rep-card rep-card--verde">
          <span className="rep-card__icono">&#10004;</span>
          <div>
            <p className="rep-card__numero">1,050</p>
            <p className="rep-card__label">Entregas Completadas</p>
          </div>
        </article>
        <article className="rep-card rep-card--rojo">
          <span className="rep-card__icono">&#9650;</span>
          <div>
            <p className="rep-card__numero">84</p>
            <p className="rep-card__label">Entregas Retrasadas</p>
          </div>
        </article>
        <article className="rep-card rep-card--amarillo">
          <span className="rep-card__icono">&#128172;</span>
          <div>
            <p className="rep-card__numero">34</p>
            <p className="rep-card__label">Incidencias Registradas</p>
          </div>
        </article>
        <article className="rep-card rep-card--gris">
          <span className="rep-card__icono">&#9201;</span>
          <div>
            <p className="rep-card__numero">39 min</p>
            <p className="rep-card__label">Nivel de cumplimiento</p>
            <div className="rep-card__stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
          </div>
        </article>
      </section>

      {/* Grid: Entregas por Día + Rendimiento por Repartidor */}
      <section className="rep-grid-top">

        {/* Entregas por Día */}
        <div className="rep-panel">
          <div className="rep-panel__header">
            <h3>Entregas por Día</h3>
            <button className="rep-panel__more">&#8943;</button>
          </div>
          <div className="rep-entregas-dia">
            <div className="rep-barras">
              <div className="rep-barra-row">
                <span className="rep-barra-row__label">Lunes</span>
                <div className="rep-barra-row__track">
                  <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{width: '70%'}}></div>
                  <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{width: '12%'}}></div>
                </div>
              </div>
              <div className="rep-barra-row">
                <span className="rep-barra-row__label">Martes</span>
                <div className="rep-barra-row__track">
                  <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{width: '85%'}}></div>
                  <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{width: '10%'}}></div>
                </div>
              </div>
              <div className="rep-barra-row">
                <span className="rep-barra-row__label">Martes</span>
                <div className="rep-barra-row__track">
                  <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{width: '60%'}}></div>
                  <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{width: '15%'}}></div>
                </div>
              </div>
              <div className="rep-barra-row">
                <span className="rep-barra-row__label">Jues</span>
                <div className="rep-barra-row__track">
                  <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{width: '75%'}}></div>
                  <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{width: '8%'}}></div>
                </div>
              </div>
              <div className="rep-barra-row">
                <span className="rep-barra-row__label">Viern</span>
                <div className="rep-barra-row__track">
                  <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{width: '90%'}}></div>
                  <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{width: '5%'}}></div>
                </div>
              </div>
              <div className="rep-barra-row">
                <span className="rep-barra-row__label">Sab</span>
                <div className="rep-barra-row__track">
                  <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{width: '50%'}}></div>
                  <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{width: '10%'}}></div>
                </div>
              </div>
              <div className="rep-barra-row">
                <span className="rep-barra-row__label">Dom</span>
                <div className="rep-barra-row__track">
                  <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{width: '30%'}}></div>
                  <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{width: '10%'}}></div>
                </div>
              </div>
            </div>
            <div className="rep-donut-wrap">
              <div className="rep-donut">
                <svg viewBox="0 0 36 36" className="rep-donut__svg">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8ecf4" strokeWidth="3.5"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b6aaa" strokeWidth="3.5"
                    strokeDasharray="70 30" strokeDashoffset="25"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4caf50" strokeWidth="3.5"
                    strokeDasharray="12 88" strokeDashoffset="55"/>
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f2c44e" strokeWidth="3.5"
                    strokeDasharray="9 91" strokeDashoffset="43"/>
                </svg>
              </div>
              <div className="rep-donut-legend">
                <p><span className="rep-donut-legend__val">70%</span> Entregado</p>
                <p><span className="rep-donut-legend__val">12%</span> En ruta</p>
                <p><span className="rep-donut-legend__val">9%</span> Retrasado</p>
              </div>
            </div>
          </div>
          <div className="rep-panel__footer">
            <span className="rep-leyenda"><span className="rep-leyenda__dot rep-leyenda__dot--azul"></span> Entregado</span>
            <span className="rep-leyenda"><span className="rep-leyenda__dot rep-leyenda__dot--verde"></span> En ruta</span>
          </div>
          <p className="rep-panel__promedio">Promedio: 165 entregas</p>
        </div>

        {/* Rendimiento por Repartidor (barras) */}
        <div className="rep-panel">
          <div className="rep-panel__header">
            <h3>Rendimiento por Repartidor</h3>
            <button className="rep-panel__more">&#8943;</button>
          </div>
          <table className="rep-tabla-rendimiento">
            <thead>
              <tr>
                <th>Repartidor</th>
                <th>Entregas completadas</th>
                <th>Tiempo promedio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Luis Garcia</td>
                <td>
                  <span className="rep-rend__num">232</span>
                  <div className="rep-rend__bar"><div className="rep-rend__fill" style={{width: '95%', background: '#4caf50'}}></div></div>
                </td>
                <td>4 h 12 min</td>
                <td><span className="rep-rend__estado rep-rend__estado--ok">&#10004;</span></td>
              </tr>
              <tr>
                <td>Javier Torres</td>
                <td>
                  <span className="rep-rend__num">189</span>
                  <div className="rep-rend__bar"><div className="rep-rend__fill" style={{width: '78%', background: '#4caf50'}}></div></div>
                </td>
                <td>4 h 45 min</td>
                <td><span className="rep-rend__estado rep-rend__estado--ok">&#10004;</span></td>
              </tr>
              <tr>
                <td>Ricardo Muñoz</td>
                <td>
                  <span className="rep-rend__num">156</span>
                  <div className="rep-rend__bar"><div className="rep-rend__fill" style={{width: '64%', background: '#4caf50'}}></div></div>
                </td>
                <td>5 h 20 min</td>
                <td><span className="rep-rend__estado rep-rend__estado--warn">&#9679;</span></td>
              </tr>
              <tr>
                <td>Jorge Medina</td>
                <td>
                  <span className="rep-rend__num">134</span>
                  <div className="rep-rend__bar"><div className="rep-rend__fill" style={{width: '55%', background: '#f2c44e'}}></div></div>
                </td>
                <td>4 h 05 min</td>
                <td><span className="rep-rend__estado rep-rend__estado--warn">&#9679;</span></td>
              </tr>
              <tr>
                <td>Jose Herrera</td>
                <td>
                  <span className="rep-rend__num">98</span>
                  <div className="rep-rend__bar"><div className="rep-rend__fill" style={{width: '40%', background: '#f2c44e'}}></div></div>
                </td>
                <td>4 h 30 min</td>
                <td><span className="rep-rend__estado rep-rend__estado--warn">&#9679;</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Grid: Estados de Envios + Rendimiento por Repartidor (tabla detallada) */}
      <section className="rep-grid-bottom">

        {/* Estados de Envíos */}
        <div className="rep-panel">
          <div className="rep-panel__header">
            <h3>Estados de Envíos</h3>
            <button className="rep-panel__more">&#8943;</button>
          </div>
          <div className="rep-estados">
            <div className="rep-estados__donut">
              <svg viewBox="0 0 36 36" className="rep-donut__svg rep-donut__svg--grande">
                <circle cx="18" cy="18" r="13" fill="none" stroke="#e8ecf4" strokeWidth="5"/>
                <circle cx="18" cy="18" r="13" fill="none" stroke="#4caf50" strokeWidth="5"
                  strokeDasharray="50 50" strokeDashoffset="25"/>
                <circle cx="18" cy="18" r="13" fill="none" stroke="#3b6aaa" strokeWidth="5"
                  strokeDasharray="20 80" strokeDashoffset="75"/>
                <circle cx="18" cy="18" r="13" fill="none" stroke="#e53935" strokeWidth="5"
                  strokeDasharray="15 85" strokeDashoffset="55"/>
                <circle cx="18" cy="18" r="13" fill="none" stroke="#f2c44e" strokeWidth="5"
                  strokeDasharray="10 90" strokeDashoffset="40"/>
              </svg>
              <div className="rep-estados__centro">
                <span className="rep-estados__total">100+</span>
                <span className="rep-estados__sub">Entregas</span>
              </div>
            </div>
            <div className="rep-estados__leyenda">
              <p><span className="rep-leyenda__dot rep-leyenda__dot--verde-check"></span> Entregado</p>
              <p><span className="rep-leyenda__dot rep-leyenda__dot--azul"></span> En ruta</p>
              <p><span className="rep-leyenda__dot rep-leyenda__dot--rojo"></span> Retrasado</p>
              <p><span className="rep-leyenda__dot rep-leyenda__dot--amarillo-inc"></span> Incidencia</p>
            </div>
          </div>
          <p className="rep-panel__promedio">Promedio: 165 entregas</p>
          <table className="rep-tabla-mini">
            <thead>
              <tr><th>Guía</th><th>Cliente</th><th>Repartidor</th><th>Entrega completada</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>PAK12345789</td><td>Ana Martinez</td><td>Luis Garcia</td>
                <td>10 Abr 2024, ra <span className="rep-badge rep-badge--selccion">Selcción</span></td>
              </tr>
              <tr>
                <td>MX267584321</td><td>Carlos Ramirez</td><td>Javier Torres</td>
                <td>10 Abr 2024, <span className="rep-badge rep-badge--gestion">Gestión</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Rendimiento por Repartidor (tabla detallada) */}
        <div className="rep-panel">
          <div className="rep-panel__header">
            <h3>Rendimiento por Repartidor</h3>
          </div>
          <table className="rep-tabla-detalle">
            <thead>
              <tr>
                <th>Guía</th>
                <th>Cliente</th>
                <th>Repartidor</th>
                <th>Entrega completada</th>
                <th>Tiempo de entrega</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PAK12345789</td>
                <td><strong>Ana Martinez</strong></td>
                <td>Luis Garcia</td>
                <td>10 Abr 2024, 10:43 am</td>
                <td><strong>45 min</strong></td>
                <td><span className="rep-badge rep-badge--entregado">Entregado</span></td>
              </tr>
              <tr>
                <td>MX267584321</td>
                <td><strong>Carlos Ramirez</strong></td>
                <td>Javier Torres</td>
                <td>10 Abr 2024, 12:38 pm</td>
                <td><strong>36 min</strong></td>
                <td><span className="rep-badge rep-badge--retrasado">Retrasado</span></td>
              </tr>
              <tr>
                <td>PAK987694321</td>
                <td><strong>Laura Gómez</strong></td>
                <td>Ricardo Muñoz</td>
                <td>10 Abr 2024, 1:40 am</td>
                <td><strong>2 horas 40 min</strong></td>
                <td><span className="rep-badge rep-badge--selccion">Selción</span></td>
              </tr>
              <tr>
                <td>MX247360210</td>
                <td><strong>Sofia Lozano</strong></td>
                <td>Luis Garcia</td>
                <td>10 Abr 2024, 1:52 pm</td>
                <td><strong>52 min</strong></td>
                <td><span className="rep-badge rep-badge--retrasado">Retrasado</span></td>
              </tr>
              <tr>
                <td>MX266495201</td>
                <td><strong>Pedro Sanchez</strong></td>
                <td>Javier Torres</td>
                <td>10 Abr 2024, 2:22 pm</td>
                <td><strong>1 hr 20 min</strong></td>
                <td><span className="rep-badge rep-badge--pendiente">Pendiente</span></td>
              </tr>
            </tbody>
          </table>
          <div className="rep-filtros-bottom">
            <button className="rep-filtro-btn">Filtro <span>&#8964;</span></button>
            <button className="rep-filtro-btn">Zona – <span>&#8964;</span></button>
            <button className="rep-filtro-btn">Estado <span>&#8964;</span></button>
            <input type="text" className="rep-filtro-search" placeholder="Buscar..." />
            <button className="rep-filtro-btn rep-filtro-btn--primary">Ver detalle</button>
          </div>
        </div>
      </section>

    </main>
  </div>
  );
}
