import React, { useEffect, useMemo, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoIncidenciaClase,
  estadoIncidenciaTexto,
  getIncidenciasSupervisor,
} from '../../services/supervisorService';

export default function IncidenciasSupervisor() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [estado, setEstado] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadIncidencias() {
      try {
        setLoading(true);
        setError('');
        const data = await getIncidenciasSupervisor();
        if (isMounted) {
          setIncidencias(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar las incidencias.');
          setIncidencias([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadIncidencias();

    return () => {
      isMounted = false;
    };
  }, []);

  const resumen = useMemo(() => {
    return {
      abiertas: incidencias.filter((i) => i.estado === 'abierta').length,
      proceso: incidencias.filter((i) => i.estado === 'en_proceso').length,
      cerradas: incidencias.filter((i) => i.estado === 'cerrada').length,
      total: incidencias.length,
    };
  }, [incidencias]);

  const incidenciasFiltradas = useMemo(() => {
    return incidencias.filter((item) => {
      const coincideEstado = estado === 'todas' || item.estado === estado;
      const query = busqueda.trim().toLowerCase();

      if (!query) {
        return coincideEstado;
      }

      const texto = [
        item.paquete?.codigo_rastreo,
        item.descripcion,
        item.tipo_incidencia,
        item.reportado_por?.nombre,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return coincideEstado && texto.includes(query);
    });
  }, [incidencias, estado, busqueda]);

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

        <h2 className="titulo-pagina-operador">Gestion de Incidencias</h2>

        <section className="modulo-incidencias">
          <div className="incidencias-resumen">
            <div className="incidencias-resumen__item"><strong>Total:</strong> {loading ? '...' : resumen.total}</div>
            <div className="incidencias-resumen__item"><strong>Abiertas:</strong> {loading ? '...' : resumen.abiertas}</div>
            <div className="incidencias-resumen__item"><strong>En proceso:</strong> {loading ? '...' : resumen.proceso}</div>
            <div className="incidencias-resumen__item"><strong>Cerradas:</strong> {loading ? '...' : resumen.cerradas}</div>
          </div>

          <div className="filtros-envios" style={{ marginTop: '10px' }}>
            <div className="filtros-envios__fila">
              <div className="campo-filtro">
                <label htmlFor="estado-incidencia-sv">Estado</label>
                <select id="estado-incidencia-sv" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option value="todas">Todas</option>
                  <option value="abierta">Abierta</option>
                  <option value="en_proceso">En proceso</option>
                  <option value="cerrada">Cerrada</option>
                </select>
              </div>
              <div className="buscador-envios">
                <input
                  type="text"
                  placeholder="Buscar por guia, tipo o descripcion..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error ? <p style={{ color: '#b71c1c', margin: '0 14px 10px' }}>{error}</p> : null}

          <div className="tabla-incidencias">
            <table>
              <thead>
                <tr>
                  <th>Guia</th>
                  <th>Estado</th>
                  <th>Reportado por</th>
                  <th>Motivo</th>
                  <th>Reportado el</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      Cargando incidencias...
                    </td>
                  </tr>
                ) : incidenciasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      No hay incidencias para mostrar.
                    </td>
                  </tr>
                ) : (
                  incidenciasFiltradas.map((item) => (
                    <tr key={item.id_incidencia}>
                      <td><strong>{item.paquete?.codigo_rastreo || `ENV-${item.envio?.id_envio}`}</strong></td>
                      <td>
                        <span className={`estado-incidencia ${estadoIncidenciaClase(item.estado)}`}>
                          {estadoIncidenciaTexto(item.estado)}
                        </span>
                      </td>
                      <td>{item.reportado_por?.nombre || 'Sin nombre'}</td>
                      <td>{item.descripcion || '-'}</td>
                      <td>{item.fecha_reporte ? new Date(item.fecha_reporte).toLocaleString() : '-'}</td>
                      <td>
                        <a className="boton-detalles" href={`/supervisor/detalle-envio?id=${item.envio?.id_envio}`}>
                          Ver envio
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}


