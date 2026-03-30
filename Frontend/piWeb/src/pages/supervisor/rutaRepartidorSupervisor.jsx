import React, { useEffect, useMemo, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getDetalleConductorSupervisor,
} from '../../services/supervisorService';

export default function RutaRepartidorSupervisor() {
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const idConductor = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('idConductor');
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadDetalle() {
      try {
        setLoading(true);
        setError('');

        if (!idConductor) {
          throw new Error('No se recibió idConductor en la URL.');
        }

        const data = await getDetalleConductorSupervisor(idConductor);

        if (isMounted) {
          setDetalle(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudo cargar la ruta del repartidor.');
          setDetalle(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDetalle();

    return () => {
      isMounted = false;
    };
  }, [idConductor]);

  const conductor = detalle?.conductor;
  const rutaActual = detalle?.envios?.[0]?.asignacion || null;

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">
      <div id="menuContainer" className="menu-overlay"><MenuSupervisor /></div>
      <div id="menuBackdrop" className="menu-overlay__backdrop"></div>

      <main className="panel-principal panel-principal--full panel-principal--supervisor">
        <header className="barra-superior barra-superior--con-logo barra-superior--supervisor-fija">
          <div className="barra-superior__left">
            <button id="btnMenu" className="btn-menu-hamburguesa" aria-label="Abrir menu">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div className="header-logo">
              <img src="/piWeb/images/logoSinFondo.png" alt="Metzvia" />
            </div>
            <h1 className="barra-superior__titulo">Supervisor</h1>
          </div>
        </header>

        <h2 className="titulo-pagina-operador">Ruta del Repartidor</h2>
        {/* Botón Volver flotante en la esquina inferior derecha */}

        {error ? <p style={{ color: '#b71c1c', marginBottom: '10px' }}>{error}</p> : null}
        {loading ? <p style={{ color: '#5a6d8a', marginBottom: '10px' }}>Cargando informacion...</p> : null}

        {!loading && detalle ? (
          <section className="modulo-detalle">
            <article className="tarjeta-detalle" style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <img
                  src={conductor?.foto_perfil_url || '/piWeb/images/usuario.png'}
                  alt={conductor?.nombre || 'Conductor'}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #cbd8f0' }}
                />
                <h3 style={{ margin: 0 }}>{conductor?.nombre || 'Conductor'}</h3>
              </div>
              <div className="info-lista info-lista--dos-columnas">
                <p><span>Correo:</span> {conductor?.correo || '-'}</p>
                <p><span>Teléfono:</span> {conductor?.telefono || '-'}</p>
                <p><span>Estado:</span> {conductor?.estado || '-'}</p>
                <p><span>Envíos activos:</span> {detalle?.resumen?.total_envios ?? 0}</p>
              </div>
            </article>

            <article className="tarjeta-detalle" style={{ marginBottom: '14px' }}>
              <h3>Ruta activa</h3>
              {rutaActual ? (
                <div className="info-lista info-lista--dos-columnas">
                  <p><span>Nombre ruta:</span> {rutaActual.ruta_nombre || '-'}</p>
                  <p><span>Vehículo:</span> {rutaActual.vehiculo_placa || '-'}</p>
                  <p><span>Origen:</span> {rutaActual.ruta_origen || '-'}</p>
                  <p><span>Destino:</span> {rutaActual.ruta_destino || '-'}</p>
                  <p><span>Salida:</span> {rutaActual.fecha_salida ? new Date(rutaActual.fecha_salida).toLocaleString() : '-'}</p>
                  <p><span>Estado asignación:</span> {rutaActual.estado_asignacion || '-'}</p>
                </div>
              ) : (
                <p>Este conductor no tiene una ruta activa actualmente.</p>
              )}
            </article>

            <article className="tarjeta-detalle">
              <h3>Paradas / Envios en ruta</h3>
              <div className="tabla-envios">
                <table>
                  <thead>
                    <tr>
                      <th>Guía</th>
                      <th>Destinatario</th>
                      <th>Destino</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalle.envios.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '14px' }}>Sin envíos activos.</td>
                      </tr>
                    ) : (
                      detalle.envios.map((item) => (
                        <tr key={item.id_envio}>
                          <td>{item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`}</td>
                          <td>{item.destinatario?.nombre || '-'}</td>
                          <td>{item.direccion_destino || '-'} ({item.ciudad_destino || '-'})</td>
                          <td>
                            <span className={`estado ${estadoEnvioClase(item.estado_envio)}`}>
                              ● {estadoEnvioTexto(item.estado_envio)}
                            </span>
                          </td>
                          <td>
                            <a className="boton-detalles" href={`/supervisor/detalle-envio?id=${item.id_envio}`}>Ver envío</a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </article>
            {/* Botón Volver al final */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '38px 0 0 0' }}>
              <button
                className="boton-volver-azul"
                onClick={() => window.history.back()}
              >
                Volver
              </button>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
