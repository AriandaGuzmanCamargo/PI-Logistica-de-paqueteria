import React, { useEffect, useMemo, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getEnviosSupervisor,
} from '../../services/supervisorService';

export default function EnviosSupervisor() {
  const today = new Date().toISOString().slice(0, 10);
  const [envios, setEnvios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [estado, setEstado] = useState('todos');
  const [busquedaInput, setBusquedaInput] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [fechaDesde, setFechaDesde] = useState(today);
  const [fechaHasta, setFechaHasta] = useState(today);

  useEffect(() => {
    let isMounted = true;

    async function loadEnvios() {
      try {
        setLoading(true);
        setError('');
        const data = await getEnviosSupervisor();
        if (isMounted) {
          setEnvios(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar los envios.');
          setEnvios([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEnvios();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleBuscar() {
    setBusqueda(busquedaInput.trim());
  }

  function resetFiltros() {
    setEstado('todos');
    setBusquedaInput('');
    setBusqueda('');
    setFechaDesde('');
    setFechaHasta('');
  }

  const enviosFiltrados = useMemo(() => {
    return envios.filter((item) => {
      const estadoItem = String(item.estado_envio || '').toLowerCase();
      const coincideEstado = estado === 'todos' || estadoItem === estado;

      let coincideFecha = true;
      const fecha = item.fecha_creacion ? new Date(item.fecha_creacion) : null;
      if (fecha && !Number.isNaN(fecha.getTime())) {
        if (fechaDesde) {
          const from = new Date(`${fechaDesde}T00:00:00`);
          coincideFecha = coincideFecha && fecha >= from;
        }
        if (fechaHasta) {
          const to = new Date(`${fechaHasta}T23:59:59`);
          coincideFecha = coincideFecha && fecha <= to;
        }
      }

      const query = busqueda.toLowerCase();
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
  }, [envios, estado, busqueda, fechaDesde, fechaHasta]);

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">
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

        <h2 className="titulo-pagina-operador">Gestión de envíos</h2>

        <section className="modulo-envios">
          <div className="filtros-envios">
            <div className="filtros-envios__fila">
              <div className="campo-filtro">
                <label htmlFor="estado-supervisor">Estado</label>
                <select id="estado-supervisor" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="todos">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="en_ruta">En ruta</option>
                  <option value="retrasado">Retrasado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              <div className="campo-filtro campo-filtro--fecha">
                <label htmlFor="fecha-desde-sv">Fecha</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input id="fecha-desde-sv" type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} />
                  <input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} />
                </div>
              </div>
              <div className="buscador-envios">
                <input
                  type="text"
                  placeholder="Buscar guía, remitente o destinatario..."
                  value={busquedaInput}
                  onChange={(e) => setBusquedaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleBuscar();
                  }}
                />
                <button type="button" onClick={handleBuscar}>Buscar</button>
                <button type="button" onClick={resetFiltros}>Limpiar</button>
              </div>
            </div>

            {error ? <p style={{ color: '#b71c1c', margin: '0 0 10px 0' }}>{error}</p> : null}

            <div className="tabla-envios">
              <table>
                <thead>
                  <tr>
                    <th>Guía</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Ruta</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '16px' }}>Cargando envíos...</td>
                    </tr>
                  ) : enviosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '16px' }}>No hay envíos para mostrar.</td>
                    </tr>
                  ) : (
                    enviosFiltrados.map((item) => (
                      <tr key={item.id_envio}>
                        <td>{item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`}</td>
                        <td><strong>{item.destinatario?.nombre || 'Sin destinatario'}</strong></td>
                        <td>
                          <span className={`estado ${estadoEnvioClase(item.estado_envio)}`}>
                            {estadoEnvioTexto(item.estado_envio)}
                          </span>
                        </td>
                        <td>{item.ciudad_origen || '-'} - {item.ciudad_destino || '-'}</td>
                        <td>{item.fecha_creacion ? new Date(item.fecha_creacion).toLocaleString() : '-'}</td>
                        <td>
                          <a className="boton-detalles" href={`/supervisor/detalle-envio?id=${item.id_envio}`}>
                            Ver detalle
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


