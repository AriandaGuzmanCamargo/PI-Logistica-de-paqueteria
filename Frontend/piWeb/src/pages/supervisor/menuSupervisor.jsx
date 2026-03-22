import React from 'react';

export default function MenuSupervisor() {
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
    <a href="/piWeb/src/pages/supervisor/dashboardSupervisor.html" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9783;</span>
      Dashboard
    </a>
  
    <a href="/piWeb/src/pages/supervisor/gestRepartidorSupervisor.html" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9823;</span>
      Repartidores
    </a>
 
    <a href="/piWeb/src/pages/supervisor/incidenciasSupervisor.html" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9888;</span>
      Incidencias
    </a>
    <a href="/piWeb/src/pages/supervisor/resportesSupervisor.html" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#128202;</span>
      Reportes
    </a>
    <a href="/piWeb/src/pages/supervisor/enviosSupervisor.html" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#128230;</span>
      Envíos
    </a>
    <a href="/piWeb/src/pages/supervisor/miCuentaSupervisor.html" className="menu-hamburguesa__item">
      <span className="menu-hamburguesa__icono-txt">&#9787;</span>
      Mi Perfil
    </a>
  </div>
  <div className="menu-hamburguesa__pie">
    <a href="/piWeb/login.html" className="menu-hamburguesa__item menu-hamburguesa__item--salir">
      <span className="menu-hamburguesa__icono-txt">&#10154;</span>
      Salir
    </a>
  </div>
</nav>
  );
}
