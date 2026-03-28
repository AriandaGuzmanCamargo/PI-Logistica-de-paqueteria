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
      <img src="/piWeb/images/dasboard.png" alt="" className="menu-hamburguesa__icono-img" />
      Dashboard
    </a>
  
    <a href="/supervisor/gestion-repartidores" className="menu-hamburguesa__item">
      <img src="/piWeb/images/supervisor/repartidores.png" alt="" className="menu-hamburguesa__icono-img" />
      Repartidores
    </a>
 
    <a href="/supervisor/incidencias" className="menu-hamburguesa__item">
      <img src="/piWeb/images/incidencias.png" alt="" className="menu-hamburguesa__icono-img" />
      Incidencias
    </a>
    <a href="/supervisor/reportes" className="menu-hamburguesa__item">
      <img src="/piWeb/images/registrar.png" alt="" className="menu-hamburguesa__icono-img" />
      Reportes
    </a>
    <a href="/supervisor/envios" className="menu-hamburguesa__item">
      <img src="/piWeb/images/envio.png" alt="" className="menu-hamburguesa__icono-img" />
      Envíos
    </a>
    <a href="/supervisor/mi-cuenta" className="menu-hamburguesa__item">
      <img src="/piWeb/images/perfil.png" alt="" className="menu-hamburguesa__icono-img" />
      Mi Perfil
    </a>
  </div>
  <div className="menu-hamburguesa__pie">
    <a href="/login" className="menu-hamburguesa__item menu-hamburguesa__item--salir">
      <img src="/piWeb/images/salida.png" alt="" className="menu-hamburguesa__icono-img" />
      Salir
    </a>
  </div>
</nav>
  );
}
