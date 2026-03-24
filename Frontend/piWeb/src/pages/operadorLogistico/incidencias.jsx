import React from 'react';
import MenuOperador from './menuOperador.jsx';

export default function Incidencias() {
  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">

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

      <section className="modulo-incidencias">
        <div className="incidencias-encabezado">
          <span className="incidencias-encabezado__icono">▣</span>
          <h2>Incidencias</h2>
        </div>

        <div className="tabla-incidencias">
          <table>
            <thead>
              <tr>
                <th>Número de Guía</th>
                <th>Estado</th>
                <th>Repartidor</th>
                <th>Motivo</th>
                <th>Reportado el</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>PAK00281356</strong></td>
                <td><span className="estado-incidencia">En Incidencia</span></td>
                <td>
                  <div className="repartidor-celda">
                    <img src="/piWeb/images/usuario.png" alt="Javier Torres" />
                    <span>Javier Torres</span>
                  </div>
                </td>
                <td>Dirección incorrecta, cliente no encontrado</td>
                <td>Hoy, 9:30 AM</td>
              </tr>
              <tr>
                <td><strong>PAK00271234</strong></td>
                <td><span className="estado-incidencia">En Incidencia</span></td>
                <td>
                  <div className="repartidor-celda">
                    <img src="/piWeb/images/usuario.png" alt="Juan Morales" />
                    <span>Juan Morales</span>
                  </div>
                </td>
                <td>Destinatario no estaba disponible</td>
                <td>Ayer, 3:45 PM</td>
              </tr>
              <tr>
                <td><strong>PAK00236290</strong></td>
                <td><span className="estado-incidencia">En Incidencia</span></td>
                <td>
                  <div className="repartidor-celda">
                    <img src="/piWeb/images/usuario.png" alt="Miguel López" />
                    <span>Miguel López</span>
                  </div>
                </td>
                <td>Rechazo de entrega por el cliente</td>
                <td>Ayer, 10:20 AM</td>
              </tr>
              <tr>
                <td><strong>PAK00196745</strong></td>
                <td><span className="estado-incidencia">En Incidencia</span></td>
                <td>
                  <div className="repartidor-celda">
                    <img src="/piWeb/images/usuario.png" alt="Javier Torres" />
                    <span>Javier Torres</span>
                  </div>
                </td>
                <td>Paquete dañado durante el trayecto</td>
                <td>22/04/2024, 7:00 PM</td>
              </tr>
              <tr>
                <td><strong>PAK00193210</strong></td>
                <td><span className="estado-incidencia">En Incidencia</span></td>
                <td>
                  <div className="repartidor-celda">
                    <img src="/piWeb/images/usuario.png" alt="Javier Torres" />
                    <span>Javier Torres</span>
                  </div>
                </td>
                <td>Cliente solicitó reprogramación de entrega</td>
                <td>22/04/2024, 2:18 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
  );
}
