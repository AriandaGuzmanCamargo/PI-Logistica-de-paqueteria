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
          <section className="modulo-incidencias">
            <div className="resumen-sv" style={{ marginBottom: 24 }}>
              <div className="tarjeta-sv tarjeta-sv--gris">
                <div className="tarjeta-sv__icono">
                  <img className="tarjeta-sv__icono-img" src={conductor?.foto_perfil_url || '/piWeb/images/usuario.png'} alt={conductor?.nombre || 'Repartidor'} />
                </div>
                <div>
                  <div className="tarjeta-sv__numero" style={{ fontSize: 16 }}>{conductor?.nombre || '-'}</div>
                  <div className="tarjeta-sv__label">Repartidor</div>
                </div>
              </div>
              <div className="tarjeta-sv tarjeta-sv--azul">
                <div className="tarjeta-sv__icono">
                  <img className="tarjeta-sv__icono-img" src="/piWeb/images/supervisor/entregas.png" alt="Total" />
                </div>
                <div>
                  <div className="tarjeta-sv__numero">{resumen?.total_envios ?? 0}</div>
                  <div className="tarjeta-sv__label">Total</div>
                </div>
              </div>
              <div className="tarjeta-sv tarjeta-sv--amarillo">
                <div className="tarjeta-sv__icono">
                  <img className="tarjeta-sv__icono-img" src="/piWeb/images/supervisor/enRuta.png" alt="En ruta" />
                </div>
                <div>
                  <div className="tarjeta-sv__numero">{resumen?.en_ruta ?? 0}</div>
                  <div className="tarjeta-sv__label">En ruta</div>
                </div>
              </div>
              <div className="tarjeta-sv tarjeta-sv--verde-inc">
                <div className="tarjeta-sv__icono">
                  <img className="tarjeta-sv__icono-img" src="/piWeb/images/supervisor/repartidores.png" alt="Entregados" />
                </div>
                <div>
                  <div className="tarjeta-sv__numero">{resumen?.entregados ?? 0}</div>
                  <div className="tarjeta-sv__label">Entregados</div>
                </div>
              </div>
              <div className="tarjeta-sv tarjeta-sv--rojo">
                <div className="tarjeta-sv__icono">
                  <img className="tarjeta-sv__icono-img" src="/piWeb/images/supervisor/retrasadas.png" alt="Retrasados" />
                </div>
                <div>
                  <div className="tarjeta-sv__numero">{resumen?.retrasados ?? 0}</div>
                  <div className="tarjeta-sv__label">Retrasados</div>
                </div>
              </div>
            </div>

            <div style={{
              background: '#f7f9ff',
              border: '1px solid #e0e8f0',
              borderRadius: '14px',
              padding: '24px 18px 18px 18px',
              marginTop: 10,
              boxShadow: '0 2px 8px rgba(47,64,120,0.04)'
            }}>
              <div style={{ marginBottom: 18 }}>
                <input
                  type="text"
                  placeholder="Buscar guia, destinatario o direccion..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{
                    width: '100%',
                    minWidth: '900px',
                    padding: '10px 14px',
                    border: '1px solid #ccd6f6',
                    borderRadius: 8,
                    fontSize: 15,
                    background: '#fff',
                    color: '#2b3552',
                    boxShadow: '0 1px 2px rgba(47,64,120,0.03)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
              <div className="tabla-incidencias" style={{ overflowX: 'auto' }}>
                <table style={{ minWidth: 900 }}>
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
                              {estadoEnvioTexto(item.estado_envio)}
                            </span>
                          </td>
                          <td>{item.asignacion?.fecha_salida ? new Date(item.asignacion.fecha_salida).toLocaleString() : '-'}</td>
                          <td>
                            <a className="boton-detalles" href={`/supervisor/detalle-envio?id=${item.id_envio}`}>
                              Ver envío
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
