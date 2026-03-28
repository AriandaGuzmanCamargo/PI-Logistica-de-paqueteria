import React, { useEffect, useMemo, useState } from 'react';
import MenuOperador from './menuOperador.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getEnviosOperador,
  getWebUser,
} from '../../services/operadorService';

export default function DashboardOperador() {
  const [envios, setEnvios] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadEnvios() {
      try {
        setLoading(true);
        setError('');
        const data = await getEnviosOperador();
        if (isMounted) {
          setEnvios(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar los envios.');
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

  const resumen = useMemo(() => {
    const total = envios.length;
    const pendientes = envios.filter((e) => e.estado_envio === 'pendiente').length;
    const enRuta = envios.filter((e) => ['en_ruta', 'en_transito'].includes(String(e.estado_envio || '').toLowerCase())).length;
    const retrasados = envios.filter((e) => e.estado_envio === 'retrasado').length;

    return { total, pendientes, enRuta, retrasados };
  }, [envios]);

  const user = getWebUser();
  const nombreMostrado = user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : 'Operador';

  const enviosFiltrados = useMemo(() => {
    const query = busqueda.trim().toLowerCase();

    if (!query) {
      return envios;
    }

    return envios.filter((item) => {
      const texto = [
        item.paquete?.codigo_rastreo,
        item.destinatario?.nombre,
        item.remitente?.nombre,
        item.id_envio,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return texto.includes(query);
    });
  }, [envios, busqueda]);

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">

    {/* Contenedor del menú hamburguesa */}
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

      <section className="bienvenida">
        <img src="/piWeb/images/usuario.png" alt="" className="bienvenida__avatar" />
        <p>Bienvenido de vuelta, <strong>{nombreMostrado}</strong></p>
      </section>

      {error ? <p style={{ color: '#b71c1c', margin: '0 auto 12px', maxWidth: '1260px' }}>{error}</p> : null}

      <section className={`resumen-operador ${loading ? 'resumen-operador--loading' : ''}`}>
        <article className="tarjeta-resumen">
          <span className="tarjeta-resumen__icono"><img src="/piWeb/images/pendiente.png" alt="" className="tarjeta-resumen__icono-img" /></span>
          <div>
            <h3>Pendientes por Procesar</h3>
            <p>{loading ? '...' : resumen.pendientes}</p>
          </div>
        </article>
        <article className="tarjeta-resumen">
          <span className="tarjeta-resumen__icono"><img src="/piWeb/images/proceso.png" alt="" className="tarjeta-resumen__icono-img" /></span>
          <div>
            <h3>En Proceso</h3>
            <p>{loading ? '...' : resumen.enRuta}</p>
          </div>
        </article>
        <article className="tarjeta-resumen tarjeta-resumen--alerta">
          <span className="tarjeta-resumen__icono"><img src="/piWeb/images/pendiente.png" alt="" className="tarjeta-resumen__icono-img" /></span>
          <div>
            <h3>Pendientes de Entrega</h3>
            <p>{loading ? '...' : resumen.retrasados}</p>
          </div>
        </article>
        <article className="tarjeta-resumen">
          <span className="tarjeta-resumen__icono"><img src="/piWeb/images/total.png" alt="" className="tarjeta-resumen__icono-img" /></span>
          <div>
            <h3>Total de Envíos Hoy</h3>
            <p>{loading ? '...' : resumen.total}</p>
          </div>
        </article>
      </section>

      <section className="contenido-operador">
        <div className="panel-tabla">
          <div className="panel-tabla__encabezado">
            <input
              type="text"
              placeholder="Buscar ID o destinatario..."
              className="panel-tabla__busqueda"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <a href="/operador/envios" className="panel-tabla__ver">Ver Todo</a>
          </div>
          <div className="leyenda-estados leyenda-estados--compacta" aria-label="Leyenda de estados de envio">
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
                  <th>Destinatario</th>
                  <th>Estado</th>
                  <th>Repartidor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      <span className="ui-spinner" aria-hidden="true"></span>
                      Cargando envios...
                    </td>
                  </tr>
                ) : enviosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      No hay resultados para la busqueda.
                    </td>
                  </tr>
                ) : enviosFiltrados.slice(0, 3).map((item) => (
                  <tr key={item.id_envio}>
                    <td>{item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`}</td>
                    <td><strong>{item.destinatario?.nombre || 'Sin destinatario'}</strong></td>
                    <td>
                      <span className={`estado ${estadoEnvioClase(item.estado_envio)}`}>
                        ● {estadoEnvioTexto(item.estado_envio)}
                      </span>
                    </td>
                    <td>{item.remitente?.nombre || 'Sin remitente'}</td>
                    <td>
                      <a className="boton-detalles" href={`/operador/detalle-envio?id=${item.id_envio}`}>
                        Ver Detalles
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="panel-escaneo">
          <h2>Escaneo de Paquetes</h2>
          <div className="control-escaneo">
            <input type="text" placeholder="||||||||||||" />
            <button>Escanear</button>
          </div>
        </aside>
      </section>
    </main>

  </div>
  );
}
