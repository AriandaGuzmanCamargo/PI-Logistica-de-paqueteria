import React from 'react';
import MenuSupervisor from './menuSupervisor.jsx';

export default function DashboardSupervisor() {
  return (
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

      {/* Bienvenida */}
      <section className="bienvenida-sv">
        <img src="/piWeb/images/usuario.png" alt="" className="bienvenida-sv__avatar" />
        <div className="bienvenida-sv__info">
          <h2>Bienvenido, <strong>Juan Pérez</strong></h2>
          <span className="bienvenida-sv__estado"><span className="header-sv__punto-verde"></span> En servicio</span>
        </div>
      </section>

      {/* Tarjetas resumen */}
      <section className="resumen-sv">
        <article className="tarjeta-sv tarjeta-sv--azul">
          <span className="tarjeta-sv__icono">&#128230;</span>
          <div>
            <p className="tarjeta-sv__numero">148</p>
            <p className="tarjeta-sv__label">Entregas hoy</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--amarillo">
          <span className="tarjeta-sv__icono">&#9888;</span>
          <div>
            <p className="tarjeta-sv__numero">32</p>
            <p className="tarjeta-sv__label">Pendientes</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--rojo">
          <span className="tarjeta-sv__icono">&#9650;</span>
          <div>
            <p className="tarjeta-sv__numero">8</p>
            <p className="tarjeta-sv__label">Retrasadas</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--gris">
          <span className="tarjeta-sv__icono">&#128187;</span>
          <div>
            <p className="tarjeta-sv__numero">5</p>
            <p className="tarjeta-sv__label">Incidencias</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--morado">
          <span className="tarjeta-sv__icono">&#128101;</span>
          <div>
            <p className="tarjeta-sv__numero">-</p>
            <p className="tarjeta-sv__label">Entregados</p>
          </div>
        </article>
      </section>

      {/* Contenido grid: lista envíos + panel derecho */}
      <section className="contenido-sv">

        {/* Panel izquierdo: envíos activos */}
        <div className="envios-sv">
          <div className="envios-sv__header">
            <h2>Envíos Activos</h2>
            <div className="envios-sv__buscar-wrap">
              <input type="text" placeholder="Buscar dirección o número de guía" className="envios-sv__busqueda" />
              <button className="envios-sv__btn-todos">Todos <span>&#8964;</span></button>
            </div>
          </div>

          {/* Filtros */}
          <div className="envios-sv__filtros">
            <button className="filtro-sv filtro-sv--activo">Todos <span>&#8964;</span></button>
            <button className="filtro-sv"><span className="filtro-sv__dot filtro-sv__dot--amarillo"></span> Pendiente</button>
            <button className="filtro-sv"><span className="filtro-sv__dot filtro-sv__dot--verde"></span> En ruta</button>
            <button className="filtro-sv"><span className="filtro-sv__dot filtro-sv__dot--rojo"></span> Retrasado <span>&#8964;</span></button>
            <button className="filtro-sv"><span className="filtro-sv__dot filtro-sv__dot--teal"></span> Entregado <span>&#8964;</span></button>
            <button className="filtro-sv filtro-sv--more">&#8943;</button>
          </div>

          {/* Lista de envíos */}
          <div className="envios-sv__lista">

            <div className="envio-card">
              <div className="envio-card__top">
                <div className="envio-card__info">
                  <span className="envio-card__id">PAK123456789</span>
                  <span className="envio-card__dots">&#9679; &#9679; &#9679;</span>
                </div>
                <span className="envio-card__horario">10:00 – 11:00</span>
              </div>
              <div className="envio-card__body">
                <p className="envio-card__nombre"><strong>Ana Martínez</strong> · Col. Roma Norte, CDMX</p>
                <p className="envio-card__repartidor">Luis Garcia · Luis Garcia</p>
              </div>
              <div className="envio-card__footer">
                <span className="envio-card__estado envio-card__estado--pendiente">&#9679; Pendiente</span>
                <div className="envio-card__acciones">
                  <button className="envio-card__btn">Ver detalle</button>
                  <button className="envio-card__btn">Reasignar</button>
                </div>
              </div>
            </div>

            <div className="envio-card">
              <div className="envio-card__top">
                <div className="envio-card__info">
                  <span className="envio-card__id">MX267584321</span>
                  <span className="envio-card__dots">&#9679; &#9679; &#9679;</span>
                </div>
                <span className="envio-card__horario">12:00 – 1:00</span>
              </div>
              <div className="envio-card__body">
                <p className="envio-card__nombre"><strong>Carlos Ramírez</strong> · Av. Tecnológico 210,</p>
                <p className="envio-card__repartidor">Javier Torres · Javier Torres</p>
              </div>
              <div className="envio-card__footer">
                <span className="envio-card__estado envio-card__estado--enruta">&#10004; En ruta</span>
                <div className="envio-card__acciones">
                  <button className="envio-card__btn">Ver detalle</button>
                  <button className="envio-card__btn">Reasignar</button>
                </div>
              </div>
            </div>

            <div className="envio-card">
              <div className="envio-card__top">
                <div className="envio-card__info">
                  <span className="envio-card__id">PAK987654321</span>
                  <span className="envio-card__dots">&#9679; &#9679; &#9679;</span>
                </div>
                <span className="envio-card__horario">1:00 – 3:00</span>
              </div>
              <div className="envio-card__body">
                <p className="envio-card__nombre"><strong>Laura Gómez</strong> · Av. Revolución 456, Col. Del Valle, CDMX</p>
                <p className="envio-card__repartidor">CDMX · Ricardo Muñoz</p>
              </div>
              <div className="envio-card__footer">
                <span className="envio-card__estado envio-card__estado--retrasado">&#9650; Retrasado</span>
                <div className="envio-card__acciones">
                  <button className="envio-card__btn">Ver detalle</button>
                  <button className="envio-card__btn">Reasignar</button>
                </div>
              </div>
            </div>

            <div className="envio-card">
              <div className="envio-card__top">
                <div className="envio-card__info">
                  <span className="envio-card__id">MX247360219</span>
                  <span className="envio-card__dots">&#9679; &#9679; &#9679;</span>
                </div>
                <span className="envio-card__horario">2:00 – 3:00</span>
              </div>
              <div className="envio-card__body">
                <p className="envio-card__nombre"><strong>Pedro Sánchez</strong> · Av. Universidad 789, Col. Coyoacán, CDMX</p>
                <p className="envio-card__repartidor">CDMX · Jorge Medina</p>
              </div>
              <div className="envio-card__footer">
                <span className="envio-card__estado envio-card__estado--entregado">&#10004; Entregado</span>
                <div className="envio-card__acciones">
                  <button className="envio-card__btn">Ver detalle</button>
                  <button className="envio-card__btn">Reasignar</button>
                </div>
              </div>
            </div>

            <div className="envio-card">
              <div className="envio-card__top">
                <div className="envio-card__info">
                  <span className="envio-card__id">MX247260219</span>
                  <span className="envio-card__dots">&#9679; &#9679; &#9679;</span>
                </div>
                <span className="envio-card__horario">3:00 – 4:30</span>
              </div>
              <div className="envio-card__body">
                <p className="envio-card__nombre"><strong>Sofía Lozano</strong> · Centro Oriente 230</p>
                <p className="envio-card__repartidor">CDMX · José Herrera</p>
              </div>
              <div className="envio-card__footer">
                <span className="envio-card__estado envio-card__estado--entregado">&#10004; Entregado</span>
                <div className="envio-card__acciones">
                  <button className="envio-card__btn">Ver detalle</button>
                  <button className="envio-card__btn">Reasignar</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Panel derecho: estadísticas */}
        <aside className="stats-sv">
          <div className="stats-sv__header">
            <button className="stats-sv__filtro-btn">Filtro <span>&#8964;</span></button>
            <button className="stats-sv__export-btn">&#128196; Exportar PDF <span>&#8964;</span></button>
          </div>

          <div className="stats-sv__card">
            <p className="stats-sv__label">Entregas completadas hoy</p>
            <p className="stats-sv__valor">116</p>
          </div>
          <div className="stats-sv__card">
            <p className="stats-sv__label">Tiempo promedio</p>
            <p className="stats-sv__valor">42 min</p>
          </div>
          <div className="stats-sv__card">
            <p className="stats-sv__label">Cumplimiento</p>
            <p className="stats-sv__valor">93%</p>
          </div>

          <div className="stats-sv__card stats-sv__card--resumen">
            <p className="stats-sv__label">Entregas completadas hoy</p>
            <p className="stats-sv__valor">116</p>
            <p className="stats-sv__cumpl">Cumplimiento &#10004;</p>
            <button className="stats-sv__reporte-btn">Ver reporte completo</button>
          </div>
        </aside>
      </section>

    </main>

  </div>
  );
}
