import React, { useEffect, useMemo, useState } from 'react';
import MenuOperador from './menuOperador.jsx';
import {
  estadoIncidenciaClase,
  estadoIncidenciaTexto,
  getIncidenciasOperador,
  updateIncidenciaStatus,
} from '../../services/operadorService';

function IconKpiTotal() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconKpiAbierta() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconKpiProceso() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconKpiCerrada() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Incidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detalleIncidencia, setDetalleIncidencia] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

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

  const handleChangeStatus = async (nuevoEstado) => {
    if (!detalleIncidencia) return;

    const estadoActual = String(detalleIncidencia.estado || '').toLowerCase();
    if (['cerrada', 'cancelada'].includes(estadoActual)) {
      alert('Esta incidencia ya esta finalizada y no permite cambios.');
      return;
    }

    try {
      setUpdatingStatus(true);
      await updateIncidenciaStatus(detalleIncidencia.id_incidencia, nuevoEstado);
      setIncidencias((prev) =>
        prev.map((inc) =>
          inc.id_incidencia === detalleIncidencia.id_incidencia
            ? { ...inc, estado: nuevoEstado }
            : inc
        )
      );
      setDetalleIncidencia({ ...detalleIncidencia, estado: nuevoEstado });
    } catch (updateError) {
      alert('Error: ' + (updateError.message || 'No se pudo actualizar el estado.'));
    } finally {
      setUpdatingStatus(false);
    }
  };

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
        <div className="incidencias-resumen" role="list">
          <article className="incidencias-kpi incidencias-kpi--total" role="listitem" aria-label={`Total de incidencias: ${loading ? 'cargando' : resumen.total}`}>
            <div className="incidencias-kpi__icon-wrap">
              <IconKpiTotal />
            </div>
            <div className="incidencias-kpi__body">
              <span className="incidencias-kpi__value">{loading ? '…' : resumen.total}</span>
              <span className="incidencias-kpi__label">Total</span>
            </div>
          </article>
          <article className="incidencias-kpi incidencias-kpi--abierta" role="listitem" aria-label={`Incidencias abiertas: ${loading ? 'cargando' : resumen.abiertas}`}>
            <div className="incidencias-kpi__icon-wrap">
              <IconKpiAbierta />
            </div>
            <div className="incidencias-kpi__body">
              <span className="incidencias-kpi__value">{loading ? '…' : resumen.abiertas}</span>
              <span className="incidencias-kpi__label">Abiertas</span>
            </div>
          </article>
          <article className="incidencias-kpi incidencias-kpi--proceso" role="listitem" aria-label={`En proceso: ${loading ? 'cargando' : resumen.proceso}`}>
            <div className="incidencias-kpi__icon-wrap">
              <IconKpiProceso />
            </div>
            <div className="incidencias-kpi__body">
              <span className="incidencias-kpi__value">{loading ? '…' : resumen.proceso}</span>
              <span className="incidencias-kpi__label">En proceso</span>
            </div>
          </article>
          <article className="incidencias-kpi incidencias-kpi--cerrada" role="listitem" aria-label={`Cerradas: ${loading ? 'cargando' : resumen.cerradas}`}>
            <div className="incidencias-kpi__icon-wrap">
              <IconKpiCerrada />
            </div>
            <div className="incidencias-kpi__body">
              <span className="incidencias-kpi__value">{loading ? '…' : resumen.cerradas}</span>
              <span className="incidencias-kpi__label">Cerradas</span>
            </div>
          </article>
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
                  <tr key={item.id_incidencia} onClick={() => setDetalleIncidencia(item)} style={{ cursor: 'pointer' }}>
                    <td><strong>{item.paquete?.codigo_rastreo || `ENV-${item.envio?.id_envio}`}</strong></td>
                    <td>
                      <span className={`estado-incidencia ${estadoIncidenciaClase(item.estado)}`}>
                        {estadoIncidenciaTexto(item.estado)}
                      </span>
                    </td>
                    <td>
                      <div className="repartidor-celda">
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

    {detalleIncidencia && (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '12px', padding: '24px',
          maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Detalle de Incidencia</h3>
            <button onClick={() => setDetalleIncidencia(null)}
              style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}>✕</button>
          </div>
          {detalleIncidencia.foto_evidencia && (
            <div style={{ marginBottom: '20px' }}>
              <img src={detalleIncidencia.foto_evidencia} alt="Evidencia"
                style={{ width: '100%', borderRadius: '8px', maxHeight: '300px', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ marginBottom: '12px' }}><strong>Guía:</strong> {detalleIncidencia.paquete?.codigo_rastreo || `ENV-${detalleIncidencia.envio?.id_envio}`}</div>
          <div style={{ marginBottom: '12px' }}><strong>Tipo:</strong> {detalleIncidencia.tipo_incidencia}</div>
          <div style={{ marginBottom: '12px' }}><strong>Descripción:</strong> {detalleIncidencia.descripcion}</div>
          <div style={{ marginBottom: '12px' }}><strong>Reportado por:</strong> {detalleIncidencia.reportado_por?.nombre}</div>
          <div style={{ marginBottom: '20px' }}><strong>Fecha:</strong> {detalleIncidencia.fecha_reporte ? new Date(detalleIncidencia.fecha_reporte).toLocaleString() : '-'}</div>
          <div style={{ marginBottom: '20px' }}>
            <strong>Estado:</strong> <span style={{
              display: 'inline-block', padding: '6px 12px', borderRadius: '6px',
              backgroundColor: detalleIncidencia.estado === 'abierta' ? '#e53935' : detalleIncidencia.estado === 'en_proceso' ? '#f5a623' : '#43a047',
              color: 'white', fontSize: '14px', fontWeight: 'bold',
            }}>{estadoIncidenciaTexto(detalleIncidencia.estado)}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {!['cerrada', 'cancelada'].includes(String(detalleIncidencia.estado || '').toLowerCase()) && detalleIncidencia.estado === 'abierta' && (
              <button onClick={() => handleChangeStatus('en_proceso')} disabled={updatingStatus}
                style={{ flex: 1, padding: '10px', backgroundColor: '#f5a623', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: updatingStatus ? 'not-allowed' : 'pointer', opacity: updatingStatus ? 0.6 : 1 }}>
                {updatingStatus ? 'Actualizando...' : 'En proceso'}
              </button>
            )}
            {!['cerrada', 'cancelada'].includes(String(detalleIncidencia.estado || '').toLowerCase()) && (
              <button onClick={() => handleChangeStatus('cerrada')} disabled={updatingStatus}
                style={{ flex: 1, padding: '10px', backgroundColor: '#43a047', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: updatingStatus ? 'not-allowed' : 'pointer', opacity: updatingStatus ? 0.6 : 1 }}>
                {updatingStatus ? 'Actualizando...' : 'Cerrar'}
              </button>
            )}
            {['cerrada', 'cancelada'].includes(String(detalleIncidencia.estado || '').toLowerCase()) ? (
              <p style={{ width: '100%', margin: 0, color: '#666', fontSize: '13px' }}>
                Estado final: esta incidencia no permite mas cambios.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
