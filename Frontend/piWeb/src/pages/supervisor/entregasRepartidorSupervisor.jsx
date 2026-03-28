import React, { useEffect } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';

export default function EntregasRepartidorSupervisor() {

  useEffect(() => {
    (function () {
          var backdrop = document.getElementById('modalReasignarBackdrop');
          var cerrarBtn = document.getElementById('modalCerrarBtn');
          var cancelarBtn = document.getElementById('modalCancelarBtn');
          var confirmarBtn = document.getElementById('modalConfirmarBtn');
          var repItems = document.querySelectorAll('.modal-rep');
          var buscarInput = document.getElementById('modalBuscarInput');
          var modalGuia = document.getElementById('modalGuia');
          var modalCliente = document.getElementById('modalCliente');
          var modalDir = document.getElementById('modalDir');
          var selectedRep = null;
    
          // Abrir modal desde botones "Reasignar" en la tabla
          document.querySelectorAll('.ent-accion-btn--reasignar').forEach(function (btn) {
            btn.addEventListener('click', function () {
              var row = btn.closest('tr');
              if (row) {
                var guia = row.querySelector('.td-guia');
                var cliente = row.querySelector('.td-cliente');
                var dir = row.querySelector('.td-dir');
                if (guia) modalGuia.textContent = guia.textContent.trim().split('\n')[0];
                if (cliente) modalCliente.textContent = cliente.textContent;
                if (dir) modalDir.textContent = dir.textContent;
              }
              abrirModal();
            });
          });
    
          // Botón "Reasignar paquete" de la barra inferior
          document.querySelector('.ent-bar-btn--reasignar').addEventListener('click', function () {
            modalGuia.textContent = '—';
            modalCliente.textContent = 'Seleccione desde la tabla';
            modalDir.textContent = '';
            abrirModal();
          });
    
          function abrirModal() {
            selectedRep = null;
            repItems.forEach(function (r) { r.classList.remove('modal-rep--selected'); });
            confirmarBtn.disabled = true;
            document.getElementById('modalMotivo').value = '';
            buscarInput.value = '';
            filtrarRepartidores('');
            backdrop.classList.add('modal-reasignar-backdrop--visible');
          }
    
          function cerrarModal() {
            backdrop.classList.remove('modal-reasignar-backdrop--visible');
          }
    
          cerrarBtn.addEventListener('click', cerrarModal);
          cancelarBtn.addEventListener('click', cerrarModal);
          backdrop.addEventListener('click', function (e) {
            if (e.target === backdrop) cerrarModal();
          });
    
          // Seleccionar repartidor
          repItems.forEach(function (item) {
            item.addEventListener('click', function () {
              repItems.forEach(function (r) { r.classList.remove('modal-rep--selected'); });
              item.classList.add('modal-rep--selected');
              selectedRep = item.getAttribute('data-rep');
              confirmarBtn.disabled = false;
            });
          });
    
          // Buscar repartidor
          buscarInput.addEventListener('input', function () {
            filtrarRepartidores(buscarInput.value.toLowerCase());
          });
    
          function filtrarRepartidores(query) {
            repItems.forEach(function (item) {
              var nombre = item.querySelector('.modal-rep__nombre').textContent.toLowerCase();
              var zona = item.querySelector('.modal-rep__zona').textContent.toLowerCase();
              item.style.display = (nombre.indexOf(query) !== -1 || zona.indexOf(query) !== -1) ? '' : 'none';
            });
          }
    
          // Confirmar
          confirmarBtn.addEventListener('click', function () {
            if (!selectedRep) return;
            var repName = document.querySelector('.modal-rep--selected .modal-rep__nombre').textContent;
            alert('Paquete reasignado exitosamente a ' + repName);
            cerrarModal();
          });
        })();
  }, []);
  return (
    <>
      <style>{`
    /* ── Entregas del Repartidor ── */
    .ent-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 20px 0 18px;
      gap: 12px;
      background: #ffffff;
      border: 1px solid #d8dff8;
      border-radius: 12px;
      padding: 16px 22px;
      box-shadow: 0 4px 16px rgba(47,64,120,0.06);
    }
    .ent-header__titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
      text-align: center;
    }
    .ent-header__volver {
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
    .ent-header__volver:hover { background: #fff; }

    /* Info del repartidor */
    .ent-driver {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px 24px;
      background: rgba(220,230,250,0.4);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 16px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .ent-driver__foto {
      width: 72px;
      height: 72px;
      border-radius: 14px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .ent-driver__info {
      flex: 1;
      min-width: 170px;
    }
    .ent-driver__nombre {
      font-size: 20px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 4px;
    }
    .ent-driver__zona-text {
      font-size: 14px;
      color: #5a6d8a;
      margin: 0 0 8px;
    }
    .ent-driver__badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .ent-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
    }
    .ent-badge--zona { background: #3b6aaa; }
    .ent-badge--vehiculo { background: #4a6fa5; }

    /* Tarjetas resumen */
    .ent-resumen {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      align-items: stretch;
    }
    .ent-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 14px 22px;
      border-radius: 12px;
      border: 1.5px solid rgba(200,215,240,0.5);
      background: rgba(255,255,255,0.75);
      min-width: 110px;
      text-align: center;
    }
    .ent-stat__numero {
      font-size: 28px;
      font-weight: 800;
      margin: 0;
    }
    .ent-stat__numero--azul { color: #3b6aaa; }
    .ent-stat__numero--verde { color: #43a047; }
    .ent-stat__numero--naranja { color: #f5a623; }
    .ent-stat__numero--rojo { color: #e53935; }
    .ent-stat__label {
      font-size: 13px;
      color: #5a6d8a;
      font-weight: 600;
      margin: 2px 0 0;
    }

    /* Estado repartidor */
    .ent-estado-row {
      padding: 12px 24px 0;
      font-size: 15px;
      color: #1a2d50;
    }
    .ent-estado-row strong {
      color: #1a2d50;
    }
    .ent-estado-valor {
      font-weight: 700;
      color: #43a047;
    }
    .ent-estado-valor::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #43a047;
      margin-right: 6px;
    }

    /* Tabla de entregas */
    .ent-seccion {
      margin-top: 22px;
    }
    .ent-seccion__titulo {
      font-size: 18px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 14px;
    }
    .ent-tabla-wrap {
      background: rgba(230,237,250,0.4);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 14px;
      overflow: hidden;
    }
    .ent-tabla {
      width: 100%;
      border-collapse: collapse;
    }
    .ent-tabla thead th {
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      color: #8899b4;
      padding: 14px 16px 10px;
      border-bottom: 1.5px solid #e4eaf4;
      background: rgba(240,244,255,0.5);
    }
    .ent-tabla tbody tr {
      transition: background 0.15s;
    }
    .ent-tabla tbody tr:hover {
      background: rgba(255,255,255,0.5);
    }
    .ent-tabla tbody td {
      font-size: 14px;
      color: #2b3552;
      padding: 14px 16px;
      border-bottom: 1px solid rgba(200,215,240,0.3);
      vertical-align: middle;
    }
    .ent-tabla tbody tr:last-child td {
      border-bottom: none;
    }
    .ent-tabla .td-guia {
      font-size: 13px;
      font-weight: 600;
      color: #5a6d8a;
      font-family: monospace;
    }
    .ent-tabla .td-cliente {
      font-weight: 700;
      color: #1a2d50;
    }
    .ent-tabla .td-cliente-sub {
      font-size: 12px;
      color: #8899b4;
      font-weight: 400;
    }
    .ent-tabla .td-dir {
      color: #3b5585;
      max-width: 200px;
    }
    .ent-tabla .td-hora {
      white-space: nowrap;
    }

    /* Badges estado */
    .ent-estado-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
    .ent-estado-badge--pendiente { background: #f5a623; }
    .ent-estado-badge--enruta { background: #43a047; }
    .ent-estado-badge--retrasado { background: #e53935; }
    .ent-estado-badge--completada { background: #3b6aaa; }
    .ent-estado-badge__icono { font-size: 14px; }

    /* Botón acción en tabla */
    .ent-accion-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.8);
      font-size: 13px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.2s;
    }
    .ent-accion-btn:hover { background: #fff; }
    .ent-accion-btn--reasignar {
      border-color: #f5a623;
      color: #e68a00;
    }
    .ent-accion-btn--reasignar:hover { background: #fff8ec; }
    .ent-accion-btn__icono { font-size: 15px; }

    /* Paginación interna */
    .ent-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      flex-wrap: wrap;
      gap: 10px;
      border-top: 1px solid rgba(200,215,240,0.3);
    }
    .ent-paginacion__info {
      font-size: 13px;
      color: #5a6d8a;
    }
    .ent-paginacion__paginas {
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .ent-pag-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid #d0d8e8;
      background: #fff;
      font-size: 13px;
      font-weight: 600;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ent-pag-btn:hover { background: #e8f0fb; }
    .ent-pag-btn--activo {
      background: #3b6aaa;
      color: #fff;
      border-color: #3b6aaa;
    }

    /* Barra de acciones inferior */
    .ent-acciones-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 22px;
      padding-bottom: 24px;
      flex-wrap: wrap;
    }
    .ent-bar-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 10px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s, background 0.2s;
      text-decoration: none;
    }
    .ent-bar-btn:hover { opacity: 0.88; }
    .ent-bar-btn--volver {
      background: #3b6aaa;
      color: #fff;
    }
    .ent-bar-btn--reasignar {
      background: rgba(255,255,255,0.85);
      color: #3b5585;
      border: 1px solid #d0d8e8;
    }
    .ent-bar-btn--reasignar:hover { background: #fff; }
    .ent-bar-btn--contactar {
      background: #43a047;
      color: #fff;
    }
    .ent-bar-btn--incidencia {
      background: #e53935;
      color: #fff;
    }
    .ent-bar-btn__icono { font-size: 16px; }

    /* ── Modal Reasignar ── */
    .modal-reasignar-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(20,30,55,0.55);
      z-index: 1000;
      backdrop-filter: blur(3px);
    }
    .modal-reasignar-backdrop--visible { display: flex; align-items: center; justify-content: center; }

    .modal-reasignar {
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 12px 48px rgba(20,30,55,0.25);
      width: 520px;
      max-width: 94vw;
      max-height: 90vh;
      overflow-y: auto;
      animation: modalIn 0.25s ease;
    }
    @keyframes modalIn {
      from { opacity: 0; transform: translateY(24px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .modal-reasignar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px 14px;
      border-bottom: 1.5px solid #e4eaf4;
    }
    .modal-reasignar__titulo {
      font-size: 20px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }
    .modal-reasignar__cerrar {
      width: 34px; height: 34px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.8);
      font-size: 20px;
      color: #5a6d8a;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .modal-reasignar__cerrar:hover { background: #f0f4fb; }

    /* Info del paquete en el modal */
    .modal-paq {
      padding: 18px 24px;
      background: rgba(230,237,250,0.35);
      border-bottom: 1px solid #e4eaf4;
    }
    .modal-paq__label {
      font-size: 12px;
      font-weight: 600;
      color: #8899b4;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 8px;
    }
    .modal-paq__row {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .modal-paq__guia {
      font-size: 14px;
      font-weight: 700;
      color: #3b6aaa;
      font-family: monospace;
    }
    .modal-paq__cliente {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
    }
    .modal-paq__dir {
      font-size: 13px;
      color: #5a6d8a;
    }
    .modal-paq__estado {
      margin-left: auto;
    }

    /* Selección de repartidor */
    .modal-seleccion {
      padding: 18px 24px;
    }
    .modal-seleccion__titulo {
      font-size: 15px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 12px;
    }
    .modal-buscar {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(240,244,255,0.6);
      border: 1px solid #d0d8e8;
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 14px;
    }
    .modal-buscar__icono { color: #8899b4; font-size: 16px; }
    .modal-buscar input {
      border: none; background: transparent; outline: none;
      font-size: 14px; color: #2b3552; width: 100%;
    }
    .modal-buscar input::placeholder { color: #9aa8c0; }

    /* Lista de repartidores disponibles */
    .modal-repartidores {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 220px;
      overflow-y: auto;
    }
    .modal-rep {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      border: 2px solid transparent;
      background: rgba(240,244,255,0.4);
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .modal-rep:hover { background: rgba(230,237,250,0.7); }
    .modal-rep--selected {
      border-color: #3b6aaa;
      background: rgba(59,106,170,0.08);
    }
    .modal-rep__foto {
      width: 42px; height: 42px;
      border-radius: 10px;
      object-fit: cover;
      border: 1.5px solid rgba(200,215,240,0.5);
    }
    .modal-rep__info { flex: 1; }
    .modal-rep__nombre {
      font-size: 14px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0 0 2px;
    }
    .modal-rep__zona {
      font-size: 12px;
      color: #5a6d8a;
      margin: 0;
    }
    .modal-rep__estado {
      font-size: 12px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .modal-rep__estado--disponible {
      background: rgba(67,160,71,0.12);
      color: #43a047;
    }
    .modal-rep__estado--enruta {
      background: rgba(59,106,170,0.12);
      color: #3b6aaa;
    }
    .modal-rep__radio {
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid #d0d8e8;
      display: flex; align-items: center; justify-content: center;
      transition: border-color 0.15s;
    }
    .modal-rep--selected .modal-rep__radio {
      border-color: #3b6aaa;
    }
    .modal-rep--selected .modal-rep__radio::after {
      content: '';
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #3b6aaa;
    }

    /* Motivo */
    .modal-motivo {
      padding: 14px 24px 0;
    }
    .modal-motivo__label {
      font-size: 13px;
      font-weight: 600;
      color: #1a2d50;
      margin: 0 0 6px;
    }
    .modal-motivo__textarea {
      width: 100%;
      min-height: 60px;
      border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(240,244,255,0.5);
      padding: 10px 14px;
      font-size: 14px;
      color: #2b3552;
      resize: vertical;
      outline: none;
      font-family: inherit;
    }
    .modal-motivo__textarea:focus { border-color: #3b6aaa; }

    /* Botones del modal */
    .modal-acciones {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      padding: 18px 24px 20px;
    }
    .modal-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 24px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s, background 0.2s;
    }
    .modal-btn:hover { opacity: 0.88; }
    .modal-btn--cancelar {
      background: rgba(255,255,255,0.85);
      color: #5a6d8a;
      border: 1px solid #d0d8e8;
    }
    .modal-btn--cancelar:hover { background: #fff; }
    .modal-btn--confirmar {
      background: #3b6aaa;
      color: #fff;
    }
    .modal-btn--confirmar:disabled {
      background: #b0c4de;
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* Responsive */
    @media (max-width: 860px) {
      .ent-driver { flex-direction: column; align-items: flex-start; }
      .ent-resumen { justify-content: center; }
      .ent-tabla-wrap { overflow-x: auto; }
      .ent-tabla { min-width: 700px; }
    }
    @media (max-width: 600px) {
      .ent-header { flex-direction: column; align-items: flex-start; gap: 10px; }
      .ent-acciones-bar { flex-direction: column; align-items: stretch; }
      .ent-bar-btn { justify-content: center; }
      .ent-resumen { flex-direction: column; }
      .ent-stat { min-width: auto; }
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

      {/* Encabezado */}
      <div className="ent-header">
        <h2 className="ent-header__titulo">Entregas del Repartidor</h2>
        <a href="/piWeb/src/pages/supervisor/gestRepartidorSupervisor.html" className="ent-header__volver">
          &lsaquo; Volver
        </a>
      </div>

      {/* Info del repartidor + estadísticas */}
      <div className="ent-driver">
        <img src="/piWeb/images/usuario.png" alt="Luis García" className="ent-driver__foto" />
        <div className="ent-driver__info">
          <p className="ent-driver__nombre">Luis García</p>
          <p className="ent-driver__zona-text">Centro</p>
          <div className="ent-driver__badges">
            <span className="ent-badge ent-badge--zona">Centro</span>
            <span className="ent-badge ent-badge--vehiculo">Nissan NV200</span>
          </div>
        </div>
        <div className="ent-resumen">
          <div className="ent-stat">
            <p className="ent-stat__numero ent-stat__numero--azul">13</p>
            <p className="ent-stat__label">Entregas<br />asignadas</p>
          </div>
          <div className="ent-stat">
            <p className="ent-stat__numero ent-stat__numero--verde">8</p>
            <p className="ent-stat__label">Entregas<br />completadas</p>
          </div>
          <div className="ent-stat">
            <p className="ent-stat__numero ent-stat__numero--naranja">4</p>
            <p className="ent-stat__label">Pendientes</p>
          </div>
          <div className="ent-stat">
            <p className="ent-stat__numero ent-stat__numero--rojo">1</p>
            <p className="ent-stat__label">Retrasadas</p>
          </div>
        </div>
      </div>

      {/* Estado */}
      <p className="ent-estado-row">
        <strong>Estado</strong>&nbsp;&nbsp;<span className="ent-estado-valor">En ruta</span>
      </p>

      {/* Tabla de entregas */}
      <div className="ent-seccion">
        <h3 className="ent-seccion__titulo">Entregas Asignadas a Luis García</h3>

        <div className="ent-tabla-wrap">
          <table className="ent-tabla">
            <thead>
              <tr>
                <th>Guía</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Hora estimada</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-guia">PAK123456789</td>
                <td className="td-cliente">Ana Martínez</td>
                <td className="td-dir">Roma Norte</td>
                <td className="td-hora">10:00 – 11:00</td>
                <td>
                  <span className="ent-estado-badge ent-estado-badge--pendiente">
                    Pendiente
                  </span>
                </td>
                <td>
                  <button className="ent-accion-btn">
                    Ver detalle
                  </button>
                </td>
              </tr>
              <tr>
                <td className="td-guia">MX267584321</td>
                <td className="td-cliente">Carlos Ramírez</td>
                <td className="td-dir">Av. Tecnológico 210</td>
                <td className="td-hora">12:00 – 1:00</td>
                <td>
                  <span className="ent-estado-badge ent-estado-badge--enruta">
                    En ruta
                  </span>
                </td>
                <td>
                  <button className="ent-accion-btn">
                    Ver detalle
                  </button>
                </td>
              </tr>
              <tr>
                <td className="td-guia">MX987654321</td>
                <td className="td-cliente">Laura Gómez</td>
                <td className="td-dir">Av. Revolución 456, Col. Del Valle</td>
                <td className="td-hora">1:00 – 3:00 PM</td>
                <td>
                  <span className="ent-estado-badge ent-estado-badge--retrasado">
                    Retrasado
                  </span>
                </td>
                <td>
                  <button className="ent-accion-btn ent-accion-btn--reasignar">
                    Reasignar
                  </button>
                </td>
              </tr>
              <tr>
                <td className="td-guia">
                  MX247630219
                  <br /><span className="td-cliente-sub">PAK123466789</span>
                </td>
                <td className="td-cliente">Jorge Sánchez</td>
                <td className="td-dir">Av. Universidad 789, Col. Coyoacán</td>
                <td className="td-hora">2:00 – 3:30 PM</td>
                <td>
                  <span className="ent-estado-badge ent-estado-badge--pendiente">
                    Pendiente
                  </span>
                </td>
                <td>
                  <button className="ent-accion-btn">
                    Ver detalle
                  </button>
                </td>
              </tr>
              <tr>
                <td className="td-guia">MX2476502010</td>
                <td className="td-cliente">Pilar Suárez</td>
                <td className="td-dir">Campestre Oriente 230, Toluca</td>
                <td className="td-hora">3:00 – 4:30 PM</td>
                <td>
                  <span className="ent-estado-badge ent-estado-badge--pendiente">
                    Pendiente
                  </span>
                </td>
                <td>
                  <button className="ent-accion-btn">
                    Ver detalle
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Paginación interna */}
          <div className="ent-paginacion">
            <span className="ent-paginacion__info">Mostrando 5 de 13 entregas</span>
            <div className="ent-paginacion__paginas">
              <button className="ent-pag-btn ent-pag-btn--activo">1</button>
              <button className="ent-pag-btn">2</button>
              <button className="ent-pag-btn">3</button>
              <button className="ent-pag-btn">4</button>
              <button className="ent-pag-btn">5</button>
              <button className="ent-pag-btn">&middot;&middot;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de acciones inferior */}
      <div className="ent-acciones-bar">
        <a href="/piWeb/src/pages/supervisor/gestRepartidorSupervisor.html" className="ent-bar-btn ent-bar-btn--volver">
          &lsaquo; Volver
        </a>
        <button className="ent-bar-btn ent-bar-btn--reasignar">
          Reasignar paquete
        </button>
        <button className="ent-bar-btn ent-bar-btn--contactar">
          Contactar repartidor
        </button>
        <button className="ent-bar-btn ent-bar-btn--incidencia">
          Marcar incidencia
        </button>
      </div>

    </main>
  </div>

  {/* ══ Modal Reasignar Paquete ══ */}
  <div id="modalReasignarBackdrop" className="modal-reasignar-backdrop">
    <div className="modal-reasignar">
      <div className="modal-reasignar__header">
        <h3 className="modal-reasignar__titulo">Reasignar Paquete</h3>
        <button id="modalCerrarBtn" className="modal-reasignar__cerrar" aria-label="Cerrar">&times;</button>
      </div>

      {/* Info del paquete */}
      <div className="modal-paq">
        <p className="modal-paq__label">Paquete a reasignar</p>
        <div className="modal-paq__row">
          <span id="modalGuia" className="modal-paq__guia">MX987654321</span>
          <span id="modalCliente" className="modal-paq__cliente">Laura Gómez</span>
          <span id="modalDir" className="modal-paq__dir">Av. Revolución 456, Col. Del Valle</span>
          <span className="modal-paq__estado">
            <span id="modalEstado" className="ent-estado-badge ent-estado-badge--retrasado">
              Retrasado
            </span>
          </span>
        </div>
      </div>

      {/* Seleccionar nuevo repartidor */}
      <div className="modal-seleccion">
        <p className="modal-seleccion__titulo">Seleccionar nuevo repartidor</p>
        <div className="modal-buscar">
          <input type="text" id="modalBuscarInput" placeholder="Buscar repartidor..." />
        </div>
        <div className="modal-repartidores" id="modalRepLista">
          <div className="modal-rep" data-rep="javier">
            <img src="/piWeb/images/usuario.png" alt="Javier Torres" className="modal-rep__foto" />
            <div className="modal-rep__info">
              <p className="modal-rep__nombre">Javier Torres</p>
              <p className="modal-rep__zona">Roma Norte · 3 entregas asignadas</p>
            </div>
            <span className="modal-rep__estado modal-rep__estado--disponible">Disponible</span>
            <span className="modal-rep__radio"></span>
          </div>
          <div className="modal-rep" data-rep="ricardo">
            <img src="/piWeb/images/usuario.png" alt="Ricardo Muñoz" className="modal-rep__foto" />
            <div className="modal-rep__info">
              <p className="modal-rep__nombre">Ricardo Muñoz</p>
              <p className="modal-rep__zona">Del Valle · 5 entregas asignadas</p>
            </div>
            <span className="modal-rep__estado modal-rep__estado--enruta">En ruta</span>
            <span className="modal-rep__radio"></span>
          </div>
          <div className="modal-rep" data-rep="pedro">
            <img src="/piWeb/images/usuario.png" alt="Pedro Sánchez" className="modal-rep__foto" />
            <div className="modal-rep__info">
              <p className="modal-rep__nombre">Pedro Sánchez</p>
              <p className="modal-rep__zona">Coyoacán · 4 entregas asignadas</p>
            </div>
            <span className="modal-rep__estado modal-rep__estado--enruta">En ruta</span>
            <span className="modal-rep__radio"></span>
          </div>
          <div className="modal-rep" data-rep="sofia">
            <img src="/piWeb/images/usuario.png" alt="Sofía Lozano" className="modal-rep__foto" />
            <div className="modal-rep__info">
              <p className="modal-rep__nombre">Sofía Lozano</p>
              <p className="modal-rep__zona">Toluca · 0 entregas asignadas</p>
            </div>
            <span className="modal-rep__estado modal-rep__estado--disponible">Disponible</span>
            <span className="modal-rep__radio"></span>
          </div>
        </div>
      </div>

      {/* Motivo */}
      <div className="modal-motivo">
        <p className="modal-motivo__label">Motivo de la reasignación (opcional)</p>
        <textarea className="modal-motivo__textarea" id="modalMotivo" placeholder="Ej: Repartidor actual tiene retraso en zona..."></textarea>
      </div>

      {/* Botones */}
      <div className="modal-acciones">
        <button id="modalCancelarBtn" className="modal-btn modal-btn--cancelar">Cancelar</button>
        <button id="modalConfirmarBtn" className="modal-btn modal-btn--confirmar" disabled>Confirmar reasignación</button>
      </div>
    </div>
  </div>
    </>
  );
}
