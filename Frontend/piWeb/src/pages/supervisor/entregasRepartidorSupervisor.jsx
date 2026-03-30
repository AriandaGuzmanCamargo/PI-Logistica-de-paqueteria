import React, { useEffect, useMemo, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getDetalleConductorSupervisor,
} from '../../services/supervisorService';

export default function EntregasRepartidorSupervisor() {
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

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
          throw new Error('No se recibio idConductor en la URL.');
        }

        const data = await getDetalleConductorSupervisor(idConductor);

        if (isMounted) {
          setDetalle(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar las entregas del repartidor.');
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

  const enviosFiltrados = useMemo(() => {
    const envios = detalle?.envios || [];
    const query = busqueda.trim().toLowerCase();

    if (!query) {
      return envios;
    }

    return envios.filter((item) => {
      const texto = [
        item.paquete?.codigo_rastreo,
        item.destinatario?.nombre,
        item.direccion_destino,
        item.ciudad_destino,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return texto.includes(query);
    });
  }, [detalle, busqueda]);

  const conductor = detalle?.conductor;
  const resumen = detalle?.resumen;

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

        <h2 className="titulo-pagina-operador">Entregas del Repartidor</h2>

        {error ? <p style={{ color: '#b71c1c', marginBottom: '10px' }}>{error}</p> : null}
        {loading ? <p style={{ color: '#5a6d8a', marginBottom: '10px' }}>Cargando entregas...</p> : null}

        {!loading && detalle ? (
          <>
          {/* Tarjetas resumen */}
          <section className="resumen-sv" style={{ marginBottom: '20px' }}>
            <article className="tarjeta-sv tarjeta-sv--morado">
              <span className="tarjeta-sv__icono">
                <img
                  src={conductor?.foto_perfil_url || '/piWeb/images/usuario.png'}
                  alt={conductor?.nombre || 'Repartidor'}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </span>
              <div>
                <p className="tarjeta-sv__numero" style={{ fontSize: '18px' }}>{conductor?.nombre || '-'}</p>
                <p className="tarjeta-sv__label">Repartidor</p>
              </div>
            </article>
            <article className="tarjeta-sv tarjeta-sv--azul">
              <span className="tarjeta-sv__icono">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </span>
              <div>
                <p className="tarjeta-sv__numero">{resumen?.total_envios ?? 0}</p>
                <p className="tarjeta-sv__label">Total</p>
              </div>
            </article>
            <article className="tarjeta-sv tarjeta-sv--amarillo">
              <span className="tarjeta-sv__icono">
                <img src="/piWeb/images/supervisor/enRuta.png" alt="En ruta" className="tarjeta-sv__icono-img" />
              </span>
              <div>
                <p className="tarjeta-sv__numero">{resumen?.en_ruta ?? 0}</p>
                <p className="tarjeta-sv__label">En ruta</p>
              </div>
            </article>
            <article className="tarjeta-sv tarjeta-sv--verde-inc">
              <span className="tarjeta-sv__icono">
                <img src="/piWeb/images/supervisor/entregas.png" alt="Entregados" className="tarjeta-sv__icono-img" />
              </span>
              <div>
                <p className="tarjeta-sv__numero">{resumen?.entregados ?? 0}</p>
                <p className="tarjeta-sv__label">Entregados</p>
              </div>
            </article>
            <article className="tarjeta-sv tarjeta-sv--rojo">
              <span className="tarjeta-sv__icono">
                <img src="/piWeb/images/supervisor/retrasadas.png" alt="Retrasados" className="tarjeta-sv__icono-img" />
              </span>
              <div>
                <p className="tarjeta-sv__numero">{resumen?.retrasados ?? 0}</p>
                <p className="tarjeta-sv__label">Retrasados</p>
              </div>
            </article>
          </section>

          <section className="modulo-incidencias" style={{ background: '#fff', border: '1px solid #d9e0f8', borderRadius: '12px', boxShadow: '0 4px 12px rgba(45,66,116,0.08)', overflow: 'visible' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <input
                  type="text"
                  placeholder="Buscar guia, destinatario o direccion..."
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

            <div className="tabla-incidencias" style={{ margin: 0, border: 'none', borderRadius: 0, borderTop: '1px solid #e6ecfb' }}>
              <table>
                <thead>
                  <tr>
                    <th>Guia</th>
                    <th>Destinatario</th>
                    <th>Destino</th>
                    <th>Estado</th>
                    <th>Salida</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {enviosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay entregas para mostrar.</td>
                    </tr>
                  ) : (
                    enviosFiltrados.map((item) => (
                      <tr key={item.id_envio}>
                        <td><strong>{item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`}</strong></td>
                        <td>{item.destinatario?.nombre || '-'}</td>
                        <td>{item.direccion_destino || '-'} ({item.ciudad_destino || '-'})</td>
                        <td>
                          <span className={`estado ${estadoEnvioClase(item.estado_envio)}`}>
                            ● {estadoEnvioTexto(item.estado_envio)}
                          </span>
                        </td>
                        <td>{item.asignacion?.fecha_salida ? new Date(item.asignacion.fecha_salida).toLocaleString() : '-'}</td>
                        <td>
                          <a className="boton-detalles" href={`/supervisor/detalle-envio?id=${item.id_envio}`}>
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

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <a href="/supervisor/gestion-repartidores" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: '#4c5880', fontSize: '14px', textDecoration: 'none',
              background: '#fff', border: '1px solid #d8e0f0', borderRadius: '8px',
              padding: '8px 16px', fontWeight: '500',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Regresar a Repartidores
            </a>
          </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
