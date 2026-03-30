import React, { useEffect, useMemo, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoIncidenciaClase,
  estadoIncidenciaTexto,
  getIncidenciasSupervisor,
  updateIncidenciaStatus,
} from '../../services/supervisorService';

export default function IncidenciasSupervisor() {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [estado, setEstado] = useState('todas');
  const [estadoAbierto, setEstadoAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [detalleIncidencia, setDetalleIncidencia] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

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
    return {
      abiertas: incidencias.filter((i) => i.estado === 'abierta').length,
      proceso: incidencias.filter((i) => i.estado === 'en_proceso').length,
      cerradas: incidencias.filter((i) => i.estado === 'cerrada').length,
      canceladas: incidencias.filter((i) => i.estado === 'cancelada').length,
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
    <>
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

        <section className="resumen-sv" style={{ marginBottom: '20px' }}>
          <article className="tarjeta-sv tarjeta-sv--azul">
            <span className="tarjeta-sv__icono">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </span>
            <div>
              <p className="tarjeta-sv__numero">{loading ? '...' : resumen.total}</p>
              <p className="tarjeta-sv__label">Total</p>
            </div>
          </article>
          <article className="tarjeta-sv tarjeta-sv--rojo">
            <span className="tarjeta-sv__icono">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </span>
            <div>
              <p className="tarjeta-sv__numero">{loading ? '...' : resumen.abiertas}</p>
              <p className="tarjeta-sv__label">Abiertas</p>
            </div>
          </article>
          <article className="tarjeta-sv tarjeta-sv--amarillo">
            <span className="tarjeta-sv__icono">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <div>
              <p className="tarjeta-sv__numero">{loading ? '...' : resumen.proceso}</p>
              <p className="tarjeta-sv__label">En proceso</p>
            </div>
          </article>
          <article className="tarjeta-sv tarjeta-sv--verde-inc">
            <span className="tarjeta-sv__icono">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </span>
            <div>
              <p className="tarjeta-sv__numero">{loading ? '...' : resumen.cerradas}</p>
              <p className="tarjeta-sv__label">Cerradas</p>
            </div>
          </article>
          <article className="tarjeta-sv tarjeta-sv--gris">
            <span className="tarjeta-sv__icono">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </span>
            <div>
              <p className="tarjeta-sv__numero">{loading ? '...' : resumen.canceladas}</p>
              <p className="tarjeta-sv__label">Canceladas</p>
            </div>
          </article>
        </section>

        <section className="modulo-incidencias" style={{ background: '#fff', border: '1px solid #d9e0f8', borderRadius: '12px', boxShadow: '0 4px 12px rgba(45,66,116,0.08)', overflow: 'visible' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setEstadoAbierto((prev) => !prev)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 16px', background: '#fff',
                  border: '1px solid #d8e0f0', borderRadius: '8px', color: '#4c5880',
                  fontSize: '14px', cursor: 'pointer', minWidth: '160px',
                }}
              >
                {{ todas: 'Todas', abierta: 'Abierta', en_proceso: 'En proceso', cerrada: 'Cerrada', cancelada: 'Cancelada' }[estado]}
                <span style={{ fontSize: '10px', marginLeft: '8px' }}>{estadoAbierto ? '\u25B2' : '\u25BC'}</span>
              </button>
              {estadoAbierto && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, marginTop: '4px',
                  background: '#fff', border: '1px solid #d8e0f0', borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, minWidth: '100%',
                  overflow: 'hidden',
                }}>
                  {[{ value: 'todas', label: 'Todas' }, { value: 'abierta', label: 'Abierta' }, { value: 'en_proceso', label: 'En proceso' }, { value: 'cerrada', label: 'Cerrada' }, { value: 'cancelada', label: 'Cancelada' }].map((op) => (
                    <button
                      key={op.value}
                      onClick={() => { setEstado(op.value); setEstadoAbierto(false); }}
                      style={{
                        display: 'block', width: '100%', padding: '8px 14px',
                        border: 'none', background: estado === op.value ? '#eef3ff' : '#fff',
                        color: '#4c5880', fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                        fontWeight: estado === op.value ? '600' : '400',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f3fc'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = estado === op.value ? '#eef3ff' : '#fff'; }}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Buscar por guia, tipo o descripcion..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                  width: '100%', height: '40px', border: '1px solid #d8e0f0', borderRadius: '8px',
                  background: '#f7f9ff', color: '#4f5b7f', padding: '0 14px', fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {error ? <p style={{ color: '#b71c1c', margin: '0 20px 10px' }}>{error}</p> : null}

          <div className="tabla-incidencias" style={{ margin: 0, border: 'none', borderRadius: 0, borderTop: '1px solid #e6ecfb' }}>
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
                      <tr key={item.id_incidencia} onClick={() => setDetalleIncidencia(item)} style={{ cursor: 'pointer' }}>
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
              backgroundColor:
                detalleIncidencia.estado === 'abierta'
                  ? '#e53935'
                  : detalleIncidencia.estado === 'en_proceso'
                    ? '#f5a623'
                    : detalleIncidencia.estado === 'cancelada'
                      ? '#616161'
                      : '#43a047',
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
            {!['cerrada', 'cancelada'].includes(String(detalleIncidencia.estado || '').toLowerCase()) && (
              <button onClick={() => handleChangeStatus('cancelada')} disabled={updatingStatus}
                style={{ flex: 1, padding: '10px', backgroundColor: '#616161', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: updatingStatus ? 'not-allowed' : 'pointer', opacity: updatingStatus ? 0.6 : 1 }}>
                {updatingStatus ? 'Actualizando...' : 'Cancelar'}
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
    </>
  );
}


