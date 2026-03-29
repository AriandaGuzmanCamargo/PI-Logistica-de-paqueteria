import React, { useEffect, useMemo, useState } from 'react';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  getConductoresResumenSupervisor,
  getEnviosSupervisor,
  getIncidenciasSupervisor,
} from '../../services/supervisorService';

function toDayKey(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function formatDateTime(value) {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha';
  return date.toLocaleString();
}

function normalizeEstado(value) {
  return String(value || '').trim().toLowerCase();
}

function badgeClassForEstado(estado) {
  const normalized = normalizeEstado(estado);
  if (normalized === 'entregado') return 'rep-badge--entregado';
  if (normalized === 'retrasado') return 'rep-badge--retrasado';
  if (normalized === 'en_ruta' || normalized === 'en_transito') return 'rep-badge--gestion';
  return 'rep-badge--pendiente';
}

function textoEstadoConductor(estado) {
  if (estado === 'en_ruta') return 'En ruta';
  if (estado === 'sin_asignacion') return 'Sin asignacion';
  return 'Fuera de servicio';
}

function weekRangeLabel() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 6);
  return `${start.toLocaleDateString()} - ${now.toLocaleDateString()}`;
}

function getPresetRange(preset) {
  const end = new Date();
  const start = new Date(end);

  if (preset === 'hoy') {
    return { start, end };
  }

  if (preset === '30d') {
    start.setDate(end.getDate() - 29);
    return { start, end };
  }

  if (preset === '90d') {
    start.setDate(end.getDate() - 89);
    return { start, end };
  }

  start.setDate(end.getDate() - 6);
  return { start, end };
}

function isWithinRange(value, range) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const start = new Date(range.start);
  start.setHours(0, 0, 0, 0);

  const end = new Date(range.end);
  end.setHours(23, 59, 59, 999);

  return date >= start && date <= end;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default function ResportesSupervisor() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [envios, setEnvios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [rango, setRango] = useState('7d');

  useEffect(() => {
    let mounted = true;
    let hasLoadedOnce = false;

    async function loadData() {
      try {
        if (!hasLoadedOnce) {
          setLoading(true);
        }
        setError('');

        const [enviosData, incidenciasData, conductoresData] = await Promise.all([
          getEnviosSupervisor(),
          getIncidenciasSupervisor(),
          getConductoresResumenSupervisor(),
        ]);

        if (!mounted) return;
        setEnvios(enviosData || []);
        setIncidencias(incidenciasData || []);
        setConductores(conductoresData || []);
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError.message || 'No se pudieron cargar los reportes.');
        setEnvios([]);
        setIncidencias([]);
        setConductores([]);
      } finally {
        if (mounted) setLoading(false);
        hasLoadedOnce = true;
      }
    }

    loadData();

    const intervalId = window.setInterval(loadData, 20000);
    window.addEventListener('focus', loadData);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', loadData);
    };
  }, []);

  const rangoActual = useMemo(() => getPresetRange(rango), [rango]);

  const enviosFiltrados = useMemo(() => {
    return envios.filter((item) => {
      return isWithinRange(item.fecha_creacion, rangoActual);
    });
  }, [envios, rangoActual]);

  const incidenciasFiltradas = useMemo(() => {
    return incidencias.filter((item) => isWithinRange(item.fecha_reporte, rangoActual));
  }, [incidencias, rangoActual]);

  const resumen = useMemo(() => {
    const total = enviosFiltrados.length;
    const entregados = enviosFiltrados.filter((item) => normalizeEstado(item.estado_envio) === 'entregado').length;
    const retrasados = enviosFiltrados.filter((item) => normalizeEstado(item.estado_envio) === 'retrasado').length;
    const enRuta = enviosFiltrados.filter((item) => {
      const estado = normalizeEstado(item.estado_envio);
      return estado === 'en_ruta' || estado === 'en_transito';
    }).length;
    const pendientes = enviosFiltrados.filter((item) => normalizeEstado(item.estado_envio) === 'pendiente').length;
    const cumplimiento = total > 0 ? Math.round((entregados * 100) / total) : 0;

    return {
      total,
      entregados,
      retrasados,
      enRuta,
      pendientes,
      incidencias: incidenciasFiltradas.length,
      cumplimiento,
    };
  }, [enviosFiltrados, incidenciasFiltradas]);

  const entregasPorDia = useMemo(() => {
    const labels = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const today = new Date();
    const days = [];

    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push({
        key: toDayKey(date),
        label: labels[date.getDay()],
        total: 0,
        entregados: 0,
        enRuta: 0,
      });
    }

    const byKey = new Map(days.map((day) => [day.key, day]));

    enviosFiltrados.forEach((item) => {
      const key = toDayKey(item.fecha_entrega_real || item.fecha_estimada_entrega || item.fecha_creacion);
      if (!key || !byKey.has(key)) return;
      const day = byKey.get(key);
      day.total += 1;

      const estado = normalizeEstado(item.estado_envio);
      if (estado === 'entregado') day.entregados += 1;
      if (estado === 'en_ruta' || estado === 'en_transito') day.enRuta += 1;
    });

    const maxTotal = Math.max(1, ...days.map((d) => d.total));

    return {
      rows: days.map((day) => ({
        ...day,
        entregadosPct: Math.round((day.entregados * 100) / maxTotal),
        enRutaPct: Math.round((day.enRuta * 100) / maxTotal),
      })),
      promedio: Math.round(days.reduce((acc, day) => acc + day.total, 0) / days.length),
    };
  }, [enviosFiltrados]);

  const rendimientoConductores = useMemo(() => {
    const base = conductores.map((item) => {
      const activos = Number(item.en_ruta || 0) + Number(item.pendientes || 0);
      return {
        ...item,
        activos,
      };
    });

    const sorted = [...base].sort((a, b) => Number(b.activos || 0) - Number(a.activos || 0));
    const max = Math.max(1, ...sorted.map((item) => Number(item.activos || 0)));

    return sorted.map((item) => ({
      ...item,
      activos: Number(item.activos || 0),
      fillPct: Math.round((Number(item.activos || 0) * 100) / max),
    }));
  }, [conductores]);

  const enviosRecientes = useMemo(() => {
    return [...enviosFiltrados]
      .sort((a, b) => new Date(b.fecha_creacion || 0) - new Date(a.fecha_creacion || 0))
      .slice(0, 6);
  }, [enviosFiltrados]);

  const incidenciasRecientes = useMemo(() => {
    return [...incidenciasFiltradas]
      .sort((a, b) => new Date(b.fecha_reporte || 0) - new Date(a.fecha_reporte || 0))
      .slice(0, 6);
  }, [incidenciasFiltradas]);

  const rangoTexto = useMemo(() => {
    return `${rangoActual.start.toLocaleDateString()} - ${rangoActual.end.toLocaleDateString()}`;
  }, [rangoActual]);

  function exportarPdf() {
    const popup = window.open('', '_blank', 'width=1200,height=900');

    if (!popup) {
      alert('No se pudo abrir la ventana de impresion. Habilita popups e intenta de nuevo.');
      return;
    }

    const fechaGeneracion = new Date().toLocaleString();

    const enviosRows = enviosFiltrados
      .slice(0, 120)
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`)}</td>
            <td>${escapeHtml(item.destinatario?.nombre || 'Sin destinatario')}</td>
            <td>${escapeHtml(item.ciudad_origen || '-')}</td>
            <td>${escapeHtml(item.ciudad_destino || '-')}</td>
            <td>${escapeHtml(item.estado_envio || 'sin_estado')}</td>
            <td>${escapeHtml(formatDateTime(item.fecha_estimada_entrega || item.fecha_creacion))}</td>
          </tr>
        `
      )
      .join('');

    const incidenciasRows = incidenciasFiltradas
      .slice(0, 120)
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.id_incidencia)}</td>
            <td>${escapeHtml(item.paquete?.codigo_rastreo || `ENV-${item.envio?.id_envio || item.id_incidencia}`)}</td>
            <td>${escapeHtml(item.tipo_incidencia || 'General')}</td>
            <td>${escapeHtml(item.reportado_por?.nombre || 'Sin nombre')}</td>
            <td>${escapeHtml(item.estado || 'abierta')}</td>
            <td>${escapeHtml(formatDateTime(item.fecha_reporte))}</td>
          </tr>
        `
      )
      .join('');

    popup.document.write(`
      <html>
        <head>
          <title>Reporte Supervisor</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; margin: 24px; color: #1b2d52; background: #f7f9ff; }
            .header { background: linear-gradient(120deg, #1a2d50, #3b6aaa); color: #fff; padding: 18px 20px; border-radius: 12px; }
            .header h1 { margin: 0 0 8px; font-size: 24px; }
            .header p { margin: 2px 0; font-size: 13px; opacity: 0.95; }
            .grid { margin-top: 14px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
            .card { background: #fff; border: 1px solid #d9e2fb; border-radius: 10px; padding: 10px 12px; }
            .label { color: #5d6d93; font-size: 12px; margin-bottom: 6px; }
            .value { font-size: 22px; font-weight: 700; }
            .section { margin-top: 18px; background: #fff; border: 1px solid #d9e2fb; border-radius: 12px; padding: 14px; }
            .section h2 { margin: 0 0 10px; font-size: 16px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dde5fb; padding: 7px 8px; text-align: left; font-size: 11px; }
            th { background: #eef3ff; color: #2e3d63; }
            .empty { color: #647399; font-size: 12px; padding: 8px; }
            @media print {
              body { background: #fff; margin: 10mm; }
              .section { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Reporte de Supervisor</h1>
            <p><strong>Rango:</strong> ${escapeHtml(rangoTexto)}</p>
            <p><strong>Generado:</strong> ${escapeHtml(fechaGeneracion)}</p>
          </div>

          <div class="grid">
            <div class="card"><div class="label">Envios Totales</div><div class="value">${resumen.total}</div></div>
            <div class="card"><div class="label">Entregados</div><div class="value">${resumen.entregados}</div></div>
            <div class="card"><div class="label">En ruta</div><div class="value">${resumen.enRuta}</div></div>
            <div class="card"><div class="label">Retrasados</div><div class="value">${resumen.retrasados}</div></div>
            <div class="card"><div class="label">Pendientes</div><div class="value">${resumen.pendientes}</div></div>
            <div class="card"><div class="label">Incidencias</div><div class="value">${resumen.incidencias}</div></div>
          </div>

          <div class="section">
            <h2>Envios del periodo</h2>
            <table>
              <thead>
                <tr>
                  <th>Guia</th>
                  <th>Destinatario</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                ${enviosRows || '<tr><td class="empty" colspan="6">Sin envios para el rango seleccionado.</td></tr>'}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>Incidencias del periodo</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Guia</th>
                  <th>Tipo</th>
                  <th>Reportado por</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                ${incidenciasRows || '<tr><td class="empty" colspan="6">Sin incidencias para el rango seleccionado.</td></tr>'}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);

    popup.document.close();
    popup.focus();
    popup.print();
  }

  const total = Math.max(1, resumen.total);
  const entregadoPct = Math.round((resumen.entregados * 100) / total);
  const enRutaPct = Math.round((resumen.enRuta * 100) / total);
  const retrasadoPct = Math.round((resumen.retrasados * 100) / total);

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">
      <div id="menuContainer" className="menu-overlay"><MenuSupervisor /></div>
      <div id="menuBackdrop" className="menu-overlay__backdrop"></div>

      <main className="panel-principal panel-principal--full panel-principal--supervisor">
        <header className="barra-superior barra-superior--con-logo barra-superior--supervisor-fija">
          <div className="barra-superior__left">
            <button id="btnMenu" className="btn-menu-hamburguesa" aria-label="Abrir menú">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <div className="header-logo">
              <img src="/piWeb/images/logoSinFondo.png" alt="Metzvia" />
            </div>
            <h1 className="barra-superior__titulo">Supervisor</h1>
          </div>
        </header>

        <div className="rep-header">
          <h2 className="rep-header__titulo">Reportes</h2>
          <div className="rep-header__controles">
            <button className="rep-header__fecha">
              {rangoTexto} <span>&#8964;</span>
            </button>
            <select
              className="rep-header__fecha"
              value={rango}
              onChange={(event) => setRango(event.target.value)}
            >
              <option value="hoy">Hoy</option>
              <option value="7d">Ultimos 7 dias</option>
              <option value="30d">Ultimos 30 dias</option>
              <option value="90d">Ultimos 90 dias</option>
            </select>
            <button className="rep-header__exportar" onClick={exportarPdf}>Exportar PDF</button>
          </div>
        </div>

        {error ? <p style={{ color: '#b71c1c', maxWidth: '1260px', margin: '0 auto 12px' }}>{error}</p> : null}

        <section className="rep-resumen">
          <article className="rep-card rep-card--azul">
            <span className="rep-card__icono">
              <img src="/piWeb/images/supervisor/entregas.png" alt="Entregas totales" className="rep-card__icono-img" />
            </span>
            <div>
              <p className="rep-card__numero">{loading ? '...' : resumen.total}</p>
              <p className="rep-card__label">Envios Totales</p>
            </div>
          </article>
          <article className="rep-card rep-card--verde">
            <span className="rep-card__icono">
              <img src="/piWeb/images/supervisor/entregas.png" alt="Entregas completadas" className="rep-card__icono-img" />
            </span>
            <div>
              <p className="rep-card__numero">{loading ? '...' : resumen.entregados}</p>
              <p className="rep-card__label">Entregados</p>
            </div>
          </article>
          <article className="rep-card rep-card--rojo">
            <span className="rep-card__icono">
              <img src="/piWeb/images/supervisor/retrasadas.png" alt="Entregas retrasadas" className="rep-card__icono-img" />
            </span>
            <div>
              <p className="rep-card__numero">{loading ? '...' : resumen.retrasados}</p>
              <p className="rep-card__label">Retrasados</p>
            </div>
          </article>
          <article className="rep-card rep-card--amarillo">
            <span className="rep-card__icono">
              <img src="/piWeb/images/supervisor/incidencias.png" alt="Incidencias registradas" className="rep-card__icono-img" />
            </span>
            <div>
              <p className="rep-card__numero">{loading ? '...' : resumen.incidencias}</p>
              <p className="rep-card__label">Incidencias</p>
            </div>
          </article>
          <article className="rep-card rep-card--gris">
            <span className="rep-card__icono">
              <img src="/piWeb/images/supervisor/nivel.png" alt="Nivel de cumplimiento" className="rep-card__icono-img" />
            </span>
            <div>
              <p className="rep-card__numero">{loading ? '...' : `${resumen.cumplimiento}%`}</p>
              <p className="rep-card__label">Nivel de cumplimiento</p>
              <div className="rep-card__stars">{loading ? '' : `${Math.round(resumen.cumplimiento / 20)}/5`}</div>
            </div>
          </article>
        </section>

        <section className="rep-grid-top">
          <div className="rep-panel">
            <div className="rep-panel__header">
              <h3>Entregas por Dia (7 dias)</h3>
            </div>
            <div className="rep-entregas-dia">
              <div className="rep-barras">
                {entregasPorDia.rows.map((day) => (
                  <div className="rep-barra-row" key={day.key}>
                    <span className="rep-barra-row__label">{day.label}</span>
                    <div className="rep-barra-row__track">
                      <div className="rep-barra-row__fill rep-barra-row__fill--entregado" style={{ width: `${day.entregadosPct}%` }}></div>
                      <div className="rep-barra-row__fill rep-barra-row__fill--enruta" style={{ width: `${day.enRutaPct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rep-donut-wrap">
                <div className="rep-donut">
                  <svg viewBox="0 0 36 36" className="rep-donut__svg">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8ecf4" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b6aaa" strokeWidth="3.5" strokeDasharray={`${entregadoPct} ${100 - entregadoPct}`} strokeDashoffset="25" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#4caf50" strokeWidth="3.5" strokeDasharray={`${enRutaPct} ${100 - enRutaPct}`} strokeDashoffset={`${25 - entregadoPct}`} />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f2c44e" strokeWidth="3.5" strokeDasharray={`${retrasadoPct} ${100 - retrasadoPct}`} strokeDashoffset={`${25 - entregadoPct - enRutaPct}`} />
                  </svg>
                </div>
                <div className="rep-donut-legend">
                  <p><span className="rep-donut-legend__val">{entregadoPct}%</span> Entregado</p>
                  <p><span className="rep-donut-legend__val">{enRutaPct}%</span> En ruta</p>
                  <p><span className="rep-donut-legend__val">{retrasadoPct}%</span> Retrasado</p>
                </div>
              </div>
            </div>
            <div className="rep-panel__footer">
              <span className="rep-leyenda"><span className="rep-leyenda__dot rep-leyenda__dot--azul"></span> Entregado</span>
              <span className="rep-leyenda"><span className="rep-leyenda__dot rep-leyenda__dot--verde"></span> En ruta</span>
            </div>
            <p className="rep-panel__promedio">Promedio diario: {loading ? '...' : `${entregasPorDia.promedio} envios`}</p>
          </div>

          <div className="rep-panel">
            <div className="rep-panel__header">
              <h3>Rendimiento por Repartidor</h3>
            </div>
            <table className="rep-tabla-rendimiento">
              <thead>
                <tr>
                  <th>Repartidor</th>
                  <th>Envios activos</th>
                  <th>Ruta activa</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4">Cargando rendimiento...</td>
                  </tr>
                ) : rendimientoConductores.length === 0 ? (
                  <tr>
                    <td colSpan="4">No hay conductores para mostrar.</td>
                  </tr>
                ) : (
                  rendimientoConductores.map((item) => (
                    <tr key={item.id_conductor}>
                      <td>{item.nombre}</td>
                      <td>
                        <span className="rep-rend__num">{item.activos}</span>
                        <div className="rep-rend__bar"><div className="rep-rend__fill" style={{ width: `${item.fillPct}%`, background: item.fillPct > 50 ? '#4caf50' : '#f2c44e' }}></div></div>
                      </td>
                      <td>{item.asignacion_activa?.ruta_nombre || 'Sin ruta'}</td>
                      <td>
                        <span className={`rep-rend__estado ${item.estado === 'en_ruta' ? 'rep-rend__estado--ok' : 'rep-rend__estado--warn'}`}>
                          {item.estado === 'en_ruta' ? 'OK' : 'REV'}
                        </span>
                        {' '}
                        {textoEstadoConductor(item.estado)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rep-grid-bottom">
          <div className="rep-panel">
            <div className="rep-panel__header">
              <h3>Estados de Envios</h3>
            </div>
            <div className="rep-estados">
              <div className="rep-estados__donut">
                <svg viewBox="0 0 36 36" className="rep-donut__svg rep-donut__svg--grande">
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#e8ecf4" strokeWidth="5" />
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#4caf50" strokeWidth="5" strokeDasharray={`${entregadoPct} ${100 - entregadoPct}`} strokeDashoffset="25" />
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#3b6aaa" strokeWidth="5" strokeDasharray={`${enRutaPct} ${100 - enRutaPct}`} strokeDashoffset={`${25 - entregadoPct}`} />
                  <circle cx="18" cy="18" r="13" fill="none" stroke="#e53935" strokeWidth="5" strokeDasharray={`${retrasadoPct} ${100 - retrasadoPct}`} strokeDashoffset={`${25 - entregadoPct - enRutaPct}`} />
                </svg>
                <div className="rep-estados__centro">
                  <span className="rep-estados__total">{loading ? '...' : resumen.total}</span>
                  <span className="rep-estados__sub">Envios</span>
                </div>
              </div>
              <div className="rep-estados__leyenda">
                <p><span className="rep-leyenda__dot rep-leyenda__dot--verde-check"></span> Entregado: {loading ? '...' : resumen.entregados}</p>
                <p><span className="rep-leyenda__dot rep-leyenda__dot--azul"></span> En ruta: {loading ? '...' : resumen.enRuta}</p>
                <p><span className="rep-leyenda__dot rep-leyenda__dot--rojo"></span> Retrasado: {loading ? '...' : resumen.retrasados}</p>
                <p><span className="rep-leyenda__dot rep-leyenda__dot--amarillo-inc"></span> Pendiente: {loading ? '...' : resumen.pendientes}</p>
              </div>
            </div>
            <p className="rep-panel__promedio">Incidencias registradas: {loading ? '...' : resumen.incidencias}</p>
            <table className="rep-tabla-mini">
              <thead>
                <tr><th>Guia</th><th>Cliente</th><th>Destino</th><th>Estado</th></tr>
              </thead>
              <tbody>
                {enviosRecientes.length === 0 ? (
                  <tr><td colSpan="4">Sin envios recientes.</td></tr>
                ) : (
                  enviosRecientes.map((item) => (
                    <tr key={item.id_envio}>
                      <td>{item.paquete?.codigo_rastreo || `ENV-${item.id_envio}`}</td>
                      <td>{item.destinatario?.nombre || 'Sin cliente'}</td>
                      <td>{item.ciudad_destino || '-'}</td>
                      <td><span className={`rep-badge ${badgeClassForEstado(item.estado_envio)}`}>{normalizeEstado(item.estado_envio) || 'sin estado'}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="rep-panel">
            <div className="rep-panel__header">
              <h3>Incidencias Recientes</h3>
            </div>
            <table className="rep-tabla-detalle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Guia</th>
                  <th>Tipo</th>
                  <th>Reportado por</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6">Cargando incidencias...</td></tr>
                ) : incidenciasRecientes.length === 0 ? (
                  <tr><td colSpan="6">Sin incidencias registradas.</td></tr>
                ) : (
                  incidenciasRecientes.map((item) => (
                    <tr key={item.id_incidencia}>
                      <td>{item.id_incidencia}</td>
                      <td>{item.paquete?.codigo_rastreo || `ENV-${item.envio?.id_envio || item.id_incidencia}`}</td>
                      <td><strong>{item.tipo_incidencia || 'General'}</strong></td>
                      <td>{item.reportado_por?.nombre || 'Sin nombre'}</td>
                      <td>{formatDateTime(item.fecha_reporte)}</td>
                      <td>
                        <span className={`rep-badge ${badgeClassForEstado(item.estado === 'cerrada' ? 'entregado' : item.estado === 'en_proceso' ? 'en_ruta' : 'retrasado')}`}>
                          {String(item.estado || 'abierta').replace('_', ' ')}
                        </span>
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
