import React, { useEffect, useMemo, useState } from 'react';
import MenuOperador from './menuOperador.jsx';
import {
  estadoIncidenciaClase,
  estadoIncidenciaTexto,
  getIncidenciasOperador,
} from '../../services/operadorService';

export default function Incidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadIncidencias() {
      try {
        setLoading(true);
        setError('');
        const data = await getIncidenciasOperador();
        if (isMounted) {
          setIncidencias(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar las incidencias.');
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
    const total = incidencias.length;
    const abiertas = incidencias.filter((item) => item.estado === 'abierta').length;
    const proceso = incidencias.filter((item) => item.estado === 'en_proceso').length;
    const cerradas = incidencias.filter((item) => item.estado === 'cerrada').length;

    return { total, abiertas, proceso, cerradas };
  }, [incidencias]);

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

      <h2 className="titulo-pagina-operador">Incidencias</h2>

      <section className="modulo-incidencias">
        <div className="incidencias-resumen">
          <div className="incidencias-resumen__item"><strong>Total:</strong> {loading ? '...' : resumen.total}</div>
          <div className="incidencias-resumen__item"><strong>Abiertas:</strong> {loading ? '...' : resumen.abiertas}</div>
          <div className="incidencias-resumen__item"><strong>En proceso:</strong> {loading ? '...' : resumen.proceso}</div>
          <div className="incidencias-resumen__item"><strong>Cerradas:</strong> {loading ? '...' : resumen.cerradas}</div>
        </div>

        {error ? <p style={{ color: '#b71c1c', margin: '0 14px 10px' }}>{error}</p> : null}

        <div className="tabla-incidencias">
          <table>
            <thead>
              <tr>
                <th>Número de Guía</th>
                <th>Estado</th>
                <th>Reportado por</th>
                <th>Motivo</th>
                <th>Reportado el</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    <span className="ui-spinner" aria-hidden="true"></span>
                    Cargando incidencias...
                  </td>
                </tr>
              ) : incidencias.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                    No hay incidencias para mostrar.
                  </td>
                </tr>
              ) : (
                incidencias.map((item) => (
                  <tr key={item.id_incidencia}>
                    <td><strong>{item.paquete?.codigo_rastreo || `ENV-${item.envio?.id_envio}`}</strong></td>
                    <td>
                      <span className={`estado-incidencia ${estadoIncidenciaClase(item.estado)}`}>
                        {estadoIncidenciaTexto(item.estado)}
                      </span>
                    </td>
                    <td>
                      <div className="repartidor-celda">
                        <img src="/piWeb/images/usuario.png" alt={item.reportado_por?.nombre || 'Usuario'} />
                        <span>{item.reportado_por?.nombre || 'Sin nombre'}</span>
                      </div>
                    </td>
                    <td>{item.descripcion || '-'}</td>
                    <td>{item.fecha_reporte ? new Date(item.fecha_reporte).toLocaleString() : '-'}</td>
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
