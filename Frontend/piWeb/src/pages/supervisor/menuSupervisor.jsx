import React, { useEffect } from 'react';

export default function MenuSupervisor() {
  useEffect(() => {
    const btnMenu = document.getElementById('btnMenu');
    const container = document.getElementById('menuContainer');
    const backdrop = document.getElementById('menuBackdrop');
    const btnCerrar = container?.querySelector('.menu-hamburguesa__cerrar');

    function abrirMenu() {
      container?.classList.add('menu-overlay--abierto');
      backdrop?.classList.add('menu-overlay__backdrop--visible');
    }
    function cerrarMenu() {
      container?.classList.remove('menu-overlay--abierto');
      backdrop?.classList.remove('menu-overlay__backdrop--visible');
    }
    function toggleMenu() {
      container?.classList.contains('menu-overlay--abierto') ? cerrarMenu() : abrirMenu();
    }

    btnMenu?.addEventListener('click', toggleMenu);
    btnCerrar?.addEventListener('click', cerrarMenu);
    backdrop?.addEventListener('click', cerrarMenu);

    const current = window.location.pathname;
    container?.querySelectorAll('.menu-hamburguesa__item').forEach(item => {
      if (item.getAttribute('href') === current) {
        item.classList.add('menu-hamburguesa__item--activo');
      }
    });

    return () => {
      btnMenu?.removeEventListener('click', toggleMenu);
      btnCerrar?.removeEventListener('click', cerrarMenu);
      backdrop?.removeEventListener('click', cerrarMenu);
    };
  }, []);

  return (
    <nav className="menu-hamburguesa">
  <div className="menu-hamburguesa__cabecera">
    <div className="menu-hamburguesa__logo">
      <img src="/piWeb/images/logoSinFondo.png" alt="Metzvia" />
    </div>
    <h2 className="menu-hamburguesa__marca">METZVIA</h2>
    <button className="menu-hamburguesa__cerrar" aria-label="Cerrar menu">&times;</button>
  </div>
  <div className="menu-hamburguesa__links">
    <a href="/supervisor/dashboard" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9783;</span>
      Dashboard
    </a>
  
    <a href="/supervisor/gestion-repartidores" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9823;</span>
      Repartidores
    </a>
 
    <a href="/supervisor/incidencias" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9888;</span>
      Incidencias
    </a>
    <a href="/supervisor/reportes" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#128202;</span>
      Reportes
    </a>
    <a href="/supervisor/envios" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#128230;</span>
      Envíos
    </a>
    <a href="/supervisor/mi-cuenta" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9787;</span>
      Mi Perfil
    </a>
  </div>
  <div className="menu-hamburguesa__pie">
    <a href="/login" className="menu-hamburguesa__item menu-hamburguesa__item--salir">
      <span className="menu-hamburguesa__icono-txt">&#10154;</span>
      Salir
    </a>
  </div>
</nav>
  );
}
