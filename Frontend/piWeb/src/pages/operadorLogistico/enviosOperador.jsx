import React, { useEffect, useMemo, useState } from 'react';
import MenuOperador from './menuOperador.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getEnviosOperador,
} from '../../services/operadorService';

export default function EnviosOperador() {
  const today = new Date().toISOString().slice(0, 10);
  const [envios, setEnvios] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [busquedaInput, setBusquedaInput] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [fechaDesde, setFechaDesde] = useState(today);
  const [fechaHasta, setFechaHasta] = useState(today);
  const [error, setError] = useState('');

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

  function handleBuscar() {
    setBusqueda(busquedaInput.trim());
  }

  function resetFiltros() {
    setFiltro('todos');
    setBusquedaInput('');
    setBusqueda('');
    setFechaDesde('');
    setFechaHasta('');
  }


  useEffect(() => {
    let isMounted = true;

    async function loadEnvios() {
      try {
        setError('');
        const data = await getEnviosOperador();
        if (isMounted) {
          setEnvios(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar los envios.');
        }
      }
    }

    loadEnvios();

    return () => {
      isMounted = false;
    };
  }, []);

  const enviosFiltrados = useMemo(() => {
    return envios.filter((item) => {
      const coincideEstado =
        filtro === 'todos' || String(item.estado_envio || '').toLowerCase() === filtro;

      let coincideFecha = true;
      const createdAt = item?.fecha_creacion ? new Date(item.fecha_creacion) : null;

      if (createdAt && !Number.isNaN(createdAt.getTime())) {
        if (fechaDesde) {
          const from = new Date(`${fechaDesde}T00:00:00`);
          coincideFecha = coincideFecha && createdAt >= from;
        }

        if (fechaHasta) {
          const to = new Date(`${fechaHasta}T23:59:59`);
          coincideFecha = coincideFecha && createdAt <= to;
        }
      }

      const query = busqueda.trim().toLowerCase();
      if (!query) {
        return coincideEstado && coincideFecha;
      }

      const texto = [
        item.paquete?.codigo_rastreo,
        item.destinatario?.nombre,
        item.remitente?.nombre,
        item.ciudad_origen,
        item.ciudad_destino,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return coincideEstado && coincideFecha && texto.includes(query);
    });
  }, [envios, filtro, busqueda, fechaDesde, fechaHasta]);
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

      <h2 className="titulo-pagina-operador">Envíos</h2>

      <section className="modulo-envios">
        <div className="alerta-registro alerta-registro--oculta" id="alerta-registro">
          Envío registrado correctamente.
        </div>

        <div className="envios-encabezado">
          <a href="#" className="envios-encabezado__ver">Ver Todo</a>
        </div>

        <div className="filtros-envios">
          <div className="filtros-envios__fila">
            <div className="campo-filtro">
              <label htmlFor="filtro-estado">Estado</label>
              <select id="filtro-estado" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_ruta">En ruta</option>
                <option value="retrasado">Retrasado</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>
            <div className="campo-filtro campo-filtro--fecha">
              <label htmlFor="filtro-fecha-desde">Fecha:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  id="filtro-fecha-desde"
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  aria-label="Fecha desde"
                />
                <input
                  id="filtro-fecha-hasta"
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  aria-label="Fecha hasta"
                />
              </div>
            </div>
            <div className="buscador-envios">
              <input
                type="text"
                placeholder="Buscar guia, remitente o destinatario..."
                value={busquedaInput}
                onChange={(e) => setBusquedaInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleBuscar();
                  }
                }}
              />
              <button type="button" onClick={handleBuscar}>Buscar</button>
              <button type="button" onClick={resetFiltros}>Limpiar</button>
            </div>
          </div>

          {error ? <p style={{ color: '#b71c1c', margin: '0 0 10px 0' }}>{error}</p> : null}

          <div className="leyenda-estados" aria-label="Leyenda de estados de envio">
            <span className="leyenda-estados__item">
              <span className="estado estado--pendiente">●</span>
              Pendiente
            </span>
            <span className="leyenda-estados__item">
              <span className="estado estado--transito">●</span>
              En ruta
            </span>
            <span className="leyenda-estados__item">
              <span className="estado estado--retrasado">●</span>
              Retrasado
            </span>
            <span className="leyenda-estados__item">
              <span className="estado estado--entregado">●</span>
              Entregado
            </span>
            <span className="leyenda-estados__item">
              <span className="estado estado--cancelado">●</span>
              Cancelado
            </span>
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
                {enviosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '14px' }}>
                      No hay envios para mostrar.
                    </td>
                  </tr>
                ) : (
                  enviosFiltrados.map((item) => (
                    <tr key={item.id_envio}>
                      <td>{item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`}</td>
                      <td><strong>{item.destinatario?.nombre || 'Sin destinatario'}</strong></td>
                      <td>
                        <span className={`estado ${estadoEnvioClase(item.estado_envio)}`}>
                          ● {estadoEnvioTexto(item.estado_envio)}
                        </span>
                      </td>
                      <td><span className="prioridad prioridad--normal">□ {item.paquete?.tipo_servicio || 'normal'}</span></td>
                      <td>{item.ciudad_origen} - {item.ciudad_destino}</td>
                      <td><strong>{new Date(item.fecha_creacion).toLocaleString()}</strong></td>
                      <td>
                        <a className="boton-detalles" href={`/operador/detalle-envio?id=${item.id_envio}`}>
                          Ver Detalles
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

  </div>
  );
}
