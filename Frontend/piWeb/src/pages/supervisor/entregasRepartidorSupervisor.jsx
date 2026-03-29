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
            <div className="incidencias-resumen">
              <div className="incidencias-resumen__item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={conductor?.foto_perfil_url || '/piWeb/images/usuario.png'}
                  alt={conductor?.nombre || 'Repartidor'}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #cbd8f0' }}
                />
                <span><strong>Repartidor:</strong> {conductor?.nombre || '-'}</span>
              </div>
              <div className="incidencias-resumen__item"><strong>Total:</strong> {resumen?.total_envios ?? 0}</div>
              <div className="incidencias-resumen__item"><strong>En ruta:</strong> {resumen?.en_ruta ?? 0}</div>
              <div className="incidencias-resumen__item"><strong>Entregados:</strong> {resumen?.entregados ?? 0}</div>
              <div className="incidencias-resumen__item"><strong>Retrasados:</strong> {resumen?.retrasados ?? 0}</div>
            </div>

            <div className="filtros-envios" style={{ marginTop: '10px' }}>
              <div className="filtros-envios__fila">
                <div className="buscador-envios">
                  <input
                    type="text"
                    placeholder="Buscar guia, destinatario o direccion..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="tabla-incidencias">
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
                            * {estadoEnvioTexto(item.estado_envio)}
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
        ) : null}
      </main>
    </div>
  );
}
