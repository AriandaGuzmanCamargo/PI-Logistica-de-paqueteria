import React from 'react';
import MenuOperador from './menuOperador.jsx';

export default function DashboardOperador() {
  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">

    {/* Contenedor del menú hamburguesa */}
    <div id="menuContainer" className="menu-overlay"><MenuOperador /></div>
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
          <h1 className="barra-superior__titulo">Operador logístico</h1>
        </div>
        <div className="barra-superior__perfil">
          <img src="/piWeb/images/usuario.png" alt="Operador" className="barra-superior__avatar" />
          <span className="barra-superior__chevron">▾</span>
        </div>
      </header>

      <section className="bienvenida">
        <img src="/piWeb/images/usuario.png" alt="" className="bienvenida__avatar" />
        <p>Bienvenido de vuelta, <strong>Alejandro Ríos</strong></p>
      </section>

      <section className="resumen-operador">
        <article className="tarjeta-resumen">
          <span className="tarjeta-resumen__icono"></span>
          <div>
            <h3>Pendientes por Procesar</h3>
            <p>5</p>
          </div>
        </article>
        <article className="tarjeta-resumen">
          <span className="tarjeta-resumen__icono"></span>
          <div>
            <h3>En Proceso</h3>
            <p>8</p>
          </div>
        </article>
        <article className="tarjeta-resumen tarjeta-resumen--alerta">
          <span className="tarjeta-resumen__icono"></span>
          <div>
            <h3>Pendientes de Entrega</h3>
            <p>2</p>
          </div>
        </article>
        <article className="tarjeta-resumen">
          <span className="tarjeta-resumen__icono"></span>
          <div>
            <h3>Total de Envíos Hoy</h3>
            <p>25</p>
          </div>
        </article>
      </section>

      <section className="contenido-operador">
        <div className="panel-tabla">
          <div className="panel-tabla__encabezado">
            <input type="text" placeholder="Buscar ID o destinatario..." className="panel-tabla__busqueda" />
            <a href="/operador/envios" className="panel-tabla__ver">Ver Todo</a>
          </div>
          <div className="tabla-envios">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Destinatario</th>
                  <th>Estado</th>
                  <th>Repartidor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PAK123456789</td>
                  <td><strong>Ana Martínez</strong></td>
                  <td><span className="estado estado--transito">● En Tránsito</span></td>
                  <td>Juan Morales</td>
                  <td><button className="boton-detalles">Ver Detalles</button></td>
                </tr>
                <tr>
                  <td>PAK987654321</td>
                  <td><strong>Carlos Ramírez</strong></td>
                  <td><span className="estado estado--pendiente">● Recogido</span></td>
                  <td>Miguel López</td>
                  <td><button className="boton-detalles">Ver Detalles</button></td>
                </tr>
                <tr>
                  <td>PAK456123789</td>
                  <td><strong>Juan Pérez</strong></td>
                  <td><span className="estado estado--retrasado">● Pendiente</span></td>
                  <td>Javier Torres</td>
                  <td><button className="boton-detalles">Ver Detalles</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <aside className="panel-escaneo">
          <h2>Escaneo de Paquetes</h2>
          <div className="control-escaneo">
            <input type="text" placeholder="||||||||||||" />
            <button>Escanear</button>
          </div>
        </aside>
      </section>
    </main>

  </div>
  );
}
