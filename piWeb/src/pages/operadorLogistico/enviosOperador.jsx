import React, { useEffect } from 'react';
import MenuOperador from './menuOperador.jsx';

export default function EnviosOperador() {

  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
        const alertaRegistro = document.getElementById('alerta-registro');
    
        if (parametros.get('registro') === 'ok') {
          const guia = parametros.get('guia');
          if (guia) {
            alertaRegistro.textContent = `Envío registrado correctamente con guía ${guia}.`;
          }
    
          alertaRegistro.classList.remove('alerta-registro--oculta');
          window.setTimeout(() => {
            alertaRegistro.classList.add('alerta-registro--oculta');
          }, 3500);
    
          if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
  }, []);
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
          <h1 className="barra-superior__titulo">Envíos</h1>
        </div>
        <div className="barra-superior__perfil">
          <img src="/piWeb/images/usuario.png" alt="Operador" className="barra-superior__avatar" />
          <span className="barra-superior__chevron">▾</span>
        </div>
      </header>

      <section className="modulo-envios">
        <div className="alerta-registro alerta-registro--oculta" id="alerta-registro">
          Envío registrado correctamente.
        </div>

        <div className="envios-encabezado">
          <h2 className="envios-encabezado__titulo">// Envíos</h2>
          <a href="#" className="envios-encabezado__ver">Ver Todo</a>
        </div>

        <div className="filtros-envios">
          <div className="filtros-envios__fila">
            <div className="campo-filtro">
              <label htmlFor="filtro-estado">Estado</label>
              <select id="filtro-estado">
                <option>Estado</option>
                <option>Pendiente</option>
                <option>En Tránsito</option>
                <option>Retrasado</option>
              </select>
            </div>
            <div className="campo-filtro campo-filtro--fecha">
              <label htmlFor="filtro-fecha">Fecha:</label>
              <input id="filtro-fecha" type="text" defaultValue="24/04/2024 - 24/04/2024" />
            </div>
            <div className="buscador-envios">
              <input type="text" placeholder="Buscar ID o destinatario..." />
              <button>Buscar</button>
            </div>
          </div>

          <div className="tabla-envios">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Ruta</th>
                  <th>Última Actualización</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PAK123456789</td>
                  <td><strong>Ana Martínez</strong></td>
                  <td><span className="estado estado--pendiente">● Pendiente</span></td>
                  <td><span className="prioridad prioridad--expres">□ Exprés</span></td>
                  <td>CDMX-015</td>
                  <td><strong>Hoy; 12:45 PM</strong></td>
                  <td><a className="boton-detalles" href="/operador/detalle-envio?id=PAK123456789">Ver Detalles</a></td>
                </tr>
                <tr>
                  <td>PAK987654321</td>
                  <td><strong>Carlos Ramírez</strong></td>
                  <td><span className="estado estado--transito">● En Tránsito</span></td>
                  <td><span className="prioridad prioridad--normal">□ Normal</span></td>
                  <td>GDL-024</td>
                  <td><strong>Hoy; 12:32 PM</strong></td>
                  <td><a className="boton-detalles" href="/operador/detalle-envio?id=PAK987654321">Ver Detalles</a></td>
                </tr>
                <tr>
                  <td>PAK456123789</td>
                  <td><strong>Juan Pérez</strong></td>
                  <td><span className="estado estado--retrasado">● Retrasado</span></td>
                  <td><span className="prioridad prioridad--expres">□ Exprés</span></td>
                  <td>CDMX-030</td>
                  <td><strong>Hoy; 11:54 AM</strong></td>
                  <td><a className="boton-detalles" href="/operador/detalle-envio?id=PAK456123789">Ver Detalles</a></td>
                </tr>
                <tr>
                  <td>PAK789654123</td>
                  <td><strong>Lorena Morales</strong></td>
                  <td><span className="estado estado--pendiente">● Pendiente</span></td>
                  <td><span className="prioridad prioridad--normal">□ Normal</span></td>
                  <td>MTY-042</td>
                  <td><strong>Hoy; 09:51 AM</strong></td>
                  <td><a className="boton-detalles" href="/operador/detalle-envio?id=PAK789654123">Ver Detalles</a></td>
                </tr>
                <tr>
                  <td>PAK654987213</td>
                  <td><strong>Samuel Torres</strong></td>
                  <td><span className="estado estado--transito">● En Tránsito</span></td>
                  <td><span className="prioridad prioridad--normal">□ Normal</span></td>
                  <td>QRO-018</td>
                  <td><strong>Pasa 2 días ago, 3:45 PM</strong></td>
                  <td><a className="boton-detalles" href="/operador/detalle-envio?id=PAK654987213">Ver Detalles</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

  </div>
  );
}
