import React from 'react';
import MenuOperador from './menuOperador.jsx';

export default function MiCuenta() {
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
      </header>

      <h2 className="titulo-pagina-operador">Mi Cuenta</h2>

      <section className="modulo-cuenta">
        <div className="cuenta-fondo-superior"></div>

        <div className="cuenta-perfil-principal">
          <img src="/piWeb/images/usuario.png" alt="Foto de perfil" className="cuenta-perfil-principal__avatar" />
          <h2>Juan Pérez</h2>
          <p className="cuenta-perfil-principal__estado">
            <span className="cuenta-perfil-principal__punto"></span>
            Operador Logístico
          </p>
        </div>

        <div className="cuenta-datos">
          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Trabajo:</span>
            <span className="cuenta-datos__valor">Operador Logístico</span>
          </div>
          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Email:</span>
            <span className="cuenta-datos__valor">juanperes@email.com</span>
          </div>
          <div className="cuenta-datos__fila">
            <span className="cuenta-datos__etiqueta">Teléfono:</span>
            <span className="cuenta-datos__valor">+52 55 1234 5678</span>
          </div>
          <div className="cuenta-datos__fila cuenta-datos__fila--select">
            <label htmlFor="centro-distribucion" className="cuenta-datos__etiqueta">Centro de Distribución:</label>
            <select id="centro-distribucion" className="cuenta-datos__selector">
              <option selected>🇲🇽 CDMX-CD01</option>
              <option>🇲🇽 GDL-CD02</option>
              <option>🇲🇽 MTY-CD03</option>
            </select>
          </div>
        </div>
      </section>
    </main>
  </div>
  );
}
