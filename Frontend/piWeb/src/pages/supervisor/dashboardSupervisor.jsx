import React, { useEffect, useMemo, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getEnviosSupervisor,
  getPerfilSupervisor,
  getIncidenciasSupervisor,
  getWebUser,
} from '../../services/supervisorService';

function normalizeDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getPeriodStart(periodo) {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  if (periodo === '30d') {
    start.setDate(now.getDate() - 29);
    return start;
  }

  if (periodo === '7d') {
    start.setDate(now.getDate() - 6);
    return start;
  }

  return start;
}

function inPeriod(value, periodo) {
  const date = normalizeDate(value);
  if (!date) return false;

  const now = new Date();
  const start = getPeriodStart(periodo);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  return date >= start && date <= end;
}

function formatPeriodoLabel(periodo) {
  if (periodo === 'hoy') return 'Hoy';
  if (periodo === '7d') return '7 dias';
  return '30 dias';
}

function nextPeriodo(periodo) {
  if (periodo === 'hoy') return '7d';
  if (periodo === '7d') return '30d';
  return 'hoy';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/o/g, '0');
}

export default function DashboardSupervisor() {
  const [envios, setEnvios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [periodo, setPeriodo] = useState('hoy');
  const [estadoLista, setEstadoLista] = useState('todos');
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError('');

        const [enviosData, incidenciasData] = await Promise.all([
          getEnviosSupervisor(),
          getIncidenciasSupervisor(),
        ]);

        let perfilData = null;
        try {
          perfilData = await getPerfilSupervisor();
        } catch (_profileError) {
          perfilData = null;
        }

        if (isMounted) {
          setEnvios(enviosData);
          setIncidencias(incidenciasData);
          setPerfil(perfilData);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar los datos del dashboard.');
          setEnvios([]);
          setIncidencias([]);
          setPerfil(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const user = getWebUser();
  const nombreMostrado = perfil
    ? `${perfil.nombre || ''} ${perfil.apellido || ''}`.trim()
    : user
      ? `${user.nombre || ''} ${user.apellido || ''}`.trim()
      : 'Supervisor';
  const fotoPerfil = perfil?.foto_perfil_url || '/piWeb/images/usuario.png';

  const enviosPorPeriodo = useMemo(() => {
    return envios.filter((item) => inPeriod(item.fecha_entrega_real || item.fecha_estimada_entrega || item.fecha_creacion, periodo));
  }, [envios, periodo]);

  const incidenciasPorPeriodo = useMemo(() => {
    return incidencias.filter((item) => inPeriod(item.fecha_reporte, periodo));
  }, [incidencias, periodo]);

  const resumen = useMemo(() => {
    const total = enviosPorPeriodo.length;
    const pendientes = enviosPorPeriodo.filter((e) => String(e.estado_envio || '').toLowerCase() === 'pendiente').length;
    const enRuta = enviosPorPeriodo.filter((e) => String(e.estado_envio || '').toLowerCase() === 'en_ruta').length;
    const retrasados = enviosPorPeriodo.filter((e) => String(e.estado_envio || '').toLowerCase() === 'retrasado').length;
    const entregados = enviosPorPeriodo.filter((e) => String(e.estado_envio || '').toLowerCase() === 'entregado').length;

    return {
      total,
      pendientes,
      enRuta,
      retrasados,
      entregados,
      incidencias: incidenciasPorPeriodo.length,
    };
  }, [enviosPorPeriodo, incidenciasPorPeriodo]);

  const enviosFiltrados = useMemo(() => {
    const query = normalizeText(busqueda);

    return envios.filter((item) => {
      const estado = String(item.estado_envio || '').toLowerCase();
      const pasaEstado = estadoLista === 'todos' || estado === estadoLista;

      if (!pasaEstado) {
        return false;
      }

      if (!query) {
        return true;
      }

      const texto = [
        `env-${item.id_envio}`,
        item.paquete?.codigo_rastreo,
        item.destinatario?.nombre,
        item.remitente?.nombre,
        item.direccion_origen,
        item.direccion_destino,
        item.ciudad_origen,
        item.ciudad_destino,
      ]
        .filter(Boolean)
        .join(' ')
        ;

      return normalizeText(texto).includes(query);
    });
  }, [envios, busqueda, estadoLista]);

  function handleFiltroClick() {
    setPeriodo((current) => nextPeriodo(current));
  }

  function handleExportPdf() {
    const popup = window.open('', '_blank', 'width=1024,height=768');

    if (!popup) {
      alert('No se pudo abrir la ventana para exportar. Habilita popups en el navegador.');
      return;
    }

    const fecha = new Date().toLocaleString();
    const rows = enviosFiltrados
      .slice(0, 50)
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`)}</td>
            <td>${escapeHtml(item.destinatario?.nombre || 'Sin destinatario')}</td>
            <td>${escapeHtml(item.ciudad_destino || '-')}</td>
            <td>${escapeHtml(estadoEnvioTexto(item.estado_envio))}</td>
            <td>${escapeHtml(item.fecha_estimada_entrega ? new Date(item.fecha_estimada_entrega).toLocaleString() : 'Sin fecha')}</td>
          </tr>
        `
      )
      .join('');

    popup.document.write(`
      <html>
        <head>
          <title>Reporte Supervisor</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 24px; color: #1a2d50; }
            h1 { margin: 0 0 8px; }
            p { margin: 0 0 6px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #c9d4ef; padding: 8px; font-size: 12px; text-align: left; }
            th { background: #eef3ff; }
            .resumen { margin-top: 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
            .item { background: #f7f9ff; border: 1px solid #dbe4fb; padding: 8px; border-radius: 6px; }
          </style>
        </head>
        <body>
          <h1>Reporte de Supervisor</h1>
          <p><strong>Periodo:</strong> ${escapeHtml(formatPeriodoLabel(periodo))}</p>
          <p><strong>Generado:</strong> ${escapeHtml(fecha)}</p>

          <div class="resumen">
            <div class="item"><strong>Total:</strong> ${resumen.total}</div>
            <div class="item"><strong>Entregados:</strong> ${resumen.entregados}</div>
            <div class="item"><strong>Pendientes:</strong> ${resumen.pendientes}</div>
            <div class="item"><strong>En ruta:</strong> ${resumen.enRuta}</div>
            <div class="item"><strong>Retrasados:</strong> ${resumen.retrasados}</div>
            <div class="item"><strong>Incidencias:</strong> ${resumen.incidencias}</div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Guia</th>
                <th>Destinatario</th>
                <th>Destino</th>
                <th>Estado</th>
                <th>Fecha estimada</th>
              </tr>
            </thead>
            <tbody>
              ${rows || '<tr><td colspan="5">Sin envios para el filtro actual.</td></tr>'}
            </tbody>
          </table>
        </body>
      </html>
    `);

    popup.document.close();
    popup.focus();
    popup.print();
  }

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">

    {/* Contenedor del menú hamburguesa */}
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

      {/* Bienvenida */}
      <section className="bienvenida-sv">
        <img src={fotoPerfil} alt="Foto de perfil" className="bienvenida-sv__avatar" />
        <div className="bienvenida-sv__info">
          <h2>Bienvenido, <strong>{nombreMostrado}</strong></h2>
          <span className="bienvenida-sv__estado"><span className="header-sv__punto-verde"></span> En servicio</span>
        </div>
      </section>

      {error ? <p style={{ color: '#b71c1c', margin: '0 auto 12px', maxWidth: '1260px' }}>{error}</p> : null}

      {/* Tarjetas resumen */}
      <section className="resumen-sv">
        <article className="tarjeta-sv tarjeta-sv--azul">
          <span className="tarjeta-sv__icono">
            <img src="/piWeb/images/supervisor/entregas.png" alt="Entregas" className="tarjeta-sv__icono-img" />
          </span>
          <div>
            <p className="tarjeta-sv__numero">{loading ? '...' : resumen.total}</p>
            <p className="tarjeta-sv__label">Entregas hoy</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--amarillo">
          <span className="tarjeta-sv__icono">
            <img src="/piWeb/images/supervisor/pendiente.png" alt="Pendientes" className="tarjeta-sv__icono-img" />
          </span>
          <div>
            <p className="tarjeta-sv__numero">{loading ? '...' : resumen.pendientes}</p>
            <p className="tarjeta-sv__label">Pendientes</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--rojo">
          <span className="tarjeta-sv__icono">
            <img src="/piWeb/images/supervisor/retrasadas.png" alt="Retrasadas" className="tarjeta-sv__icono-img" />
          </span>
          <div>
            <p className="tarjeta-sv__numero">{loading ? '...' : resumen.retrasados}</p>
            <p className="tarjeta-sv__label">Retrasadas</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--gris">
          <span className="tarjeta-sv__icono">
            <img src="/piWeb/images/supervisor/incidencias.png" alt="Incidencias" className="tarjeta-sv__icono-img" />
          </span>
          <div>
            <p className="tarjeta-sv__numero">{loading ? '...' : resumen.incidencias}</p>
            <p className="tarjeta-sv__label">Incidencias</p>
          </div>
        </article>
        <article className="tarjeta-sv tarjeta-sv--morado">
          <span className="tarjeta-sv__icono">
            <img src="/piWeb/images/supervisor/repartidores.png" alt="Repartidores" className="tarjeta-sv__icono-img" />
          </span>
          <div>
            <p className="tarjeta-sv__numero">{loading ? '...' : resumen.enRuta}</p>
            <p className="tarjeta-sv__label">En ruta</p>
          </div>
        </article>
      </section>

      {/* Contenido grid: lista envíos + panel derecho */}
      <section className="contenido-sv">

        {/* Panel izquierdo: envíos activos */}
        <div className="envios-sv">
          <div className="envios-sv__header">
            <h2>Envíos Activos</h2>
            <div className="envios-sv__buscar-wrap">
              <input
                type="text"
                placeholder="Buscar dirección o número de guía"
                className="envios-sv__busqueda"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <a href="/supervisor/envios" className="envios-sv__btn-todos">Ver todo <span>&#8964;</span></a>
            </div>
          </div>

          {/* Filtros */}
          <div className="envios-sv__filtros">
            <button
              className={`filtro-sv ${estadoLista === 'todos' ? 'filtro-sv--activo' : ''}`}
              onClick={() => setEstadoLista('todos')}
            >
              Todos <span>&#8964;</span>
            </button>
            <button
              className={`filtro-sv ${estadoLista === 'pendiente' ? 'filtro-sv--activo' : ''}`}
              onClick={() => setEstadoLista('pendiente')}
            >
              <span className="filtro-sv__dot filtro-sv__dot--amarillo"></span> Pendiente
            </button>
            <button
              className={`filtro-sv ${estadoLista === 'en_ruta' ? 'filtro-sv--activo' : ''}`}
              onClick={() => setEstadoLista('en_ruta')}
            >
              <span className="filtro-sv__dot filtro-sv__dot--verde"></span> En ruta
            </button>
            <button
              className={`filtro-sv ${estadoLista === 'retrasado' ? 'filtro-sv--activo' : ''}`}
              onClick={() => setEstadoLista('retrasado')}
            >
              <span className="filtro-sv__dot filtro-sv__dot--rojo"></span> Retrasado <span>&#8964;</span>
            </button>
            <button
              className={`filtro-sv ${estadoLista === 'entregado' ? 'filtro-sv--activo' : ''}`}
              onClick={() => setEstadoLista('entregado')}
            >
              <span className="filtro-sv__dot filtro-sv__dot--teal"></span> Entregado <span>&#8964;</span>
            </button>
            <button
              className="filtro-sv filtro-sv--more"
              onClick={() => {
                setEstadoLista('todos');
                setBusqueda('');
              }}
              title="Limpiar filtros de la lista"
            >
              &#8943;
            </button>
          </div>

          <p style={{ color: '#5a6d8a', margin: '6px 4px 10px', fontSize: '13px' }}>
            Total en BD: {envios.length} · Mostrando: {enviosFiltrados.length}
          </p>

          {/* Lista de envíos */}
          <div className="envios-sv__lista">
            {loading ? (
              <p style={{ padding: '16px', color: '#5a6d8a' }}>Cargando envios...</p>
            ) : enviosFiltrados.length === 0 ? (
              <p style={{ padding: '16px', color: '#5a6d8a' }}>
                No hay envios para mostrar con los filtros actuales. Usa "Todos" o limpia la busqueda.
              </p>
            ) : (
              enviosFiltrados.slice(0, 5).map((item) => (
                <div className="envio-card" key={item.id_envio}>
                  <div className="envio-card__top">
                    <div className="envio-card__info">
                      <span className="envio-card__id">{item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`}</span>
                      <span className="envio-card__dots">&#9679; &#9679; &#9679;</span>
                    </div>
                    <span className="envio-card__horario">
                      {item.fecha_estimada_entrega ? new Date(item.fecha_estimada_entrega).toLocaleString() : 'Sin fecha estimada'}
                    </span>
                  </div>
                  <div className="envio-card__body">
                    <p className="envio-card__nombre">
                      <strong>{item.destinatario?.nombre || 'Sin destinatario'}</strong> · {item.direccion_destino || '-'}
                    </p>
                    <p className="envio-card__repartidor">
                      {item.ciudad_origen || '-'} · {item.ciudad_destino || '-'}
                    </p>
                  </div>
                  <div className="envio-card__footer">
                    <span className={`estado ${estadoEnvioClase(item.estado_envio)}`}>
                      ● {estadoEnvioTexto(item.estado_envio)}
                    </span>
                    <div className="envio-card__acciones">
                      <a className="envio-card__btn" href={`/supervisor/detalle-envio?id=${item.id_envio}`}>Ver detalle</a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Panel derecho: estadísticas */}
        <aside className="stats-sv">
          <div className="stats-sv__header">
            <button className="stats-sv__filtro-btn" onClick={handleFiltroClick}>
              Filtro: {formatPeriodoLabel(periodo)} <span>&#8964;</span>
            </button>
            <button className="stats-sv__export-btn" onClick={handleExportPdf}>
              Exportar PDF <span>&#8964;</span>
            </button>
          </div>

          <div className="stats-sv__card">
            <p className="stats-sv__label">Entregas completadas hoy</p>
            <p className="stats-sv__valor">{loading ? '...' : resumen.entregados}</p>
          </div>
          <div className="stats-sv__card">
            <p className="stats-sv__label">Tiempo promedio</p>
            <p className="stats-sv__valor">N/D</p>
          </div>
          <div className="stats-sv__card">
            <p className="stats-sv__label">Cumplimiento</p>
            <p className="stats-sv__valor">
              {loading || resumen.total === 0
                ? '...'
                : `${Math.round((resumen.entregados * 100) / resumen.total)}%`}
            </p>
          </div>

          <div className="stats-sv__card stats-sv__card--resumen">
            <p className="stats-sv__label">Entregas completadas hoy</p>
            <p className="stats-sv__valor">{loading ? '...' : resumen.entregados}</p>
            <p className="stats-sv__cumpl">{resumen.retrasados > 0 ? 'Revisar retrasos' : 'Cumplimiento OK'}</p>
            <a href="/supervisor/reportes" className="stats-sv__reporte-btn">Ver reporte completo</a>
          </div>
        </aside>
      </section>

    </main>

  </div>
  );
}
