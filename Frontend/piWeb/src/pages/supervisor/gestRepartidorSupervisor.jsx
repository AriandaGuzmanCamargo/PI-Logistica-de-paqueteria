import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuSupervisor from './menuSupervisor.jsx';
import { getConductoresResumenSupervisor } from '../../services/supervisorService';

function estadoConfig(estado) {
  if (estado === 'en_ruta') {
    return {
      className: 'grep-estado grep-estado--enruta',
      text: 'En ruta',
    };
  }

  if (estado === 'sin_asignacion') {
    return {
      className: 'grep-estado grep-estado--sin',
      text: 'Sin asignacion',
    };
  }

  return {
    className: 'grep-estado grep-estado--fuera',
    text: 'Fuera de servicio',
  };
}

export default function GestRepartidorSupervisor() {
  const [conductores, setConductores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    let isMounted = true;

    async function loadConductores() {
      try {
        setLoading(true);
        setError('');
        const data = await getConductoresResumenSupervisor();

        if (isMounted) {
          setConductores(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudieron cargar los repartidores.');
          setConductores([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadConductores();

    return () => {
      isMounted = false;
    };
  }, []);

  const resumen = useMemo(() => {
    const activos = conductores.filter((c) => c.estado !== 'fuera_servicio').length;
    const enRuta = conductores.filter((c) => c.estado === 'en_ruta').length;
    const sinAsignacion = conductores.filter((c) => c.estado === 'sin_asignacion').length;

    return {
      activos,
      enRuta,
      sinAsignacion,
      total: conductores.length,
    };
  }, [conductores]);

  const conductoresFiltrados = useMemo(() => {
    return conductores.filter((item) => {
      const coincideFiltro =
        filtro === 'todos' ||
        (filtro === 'activos' && item.estado !== 'fuera_servicio') ||
        (filtro === 'en_ruta' && item.estado === 'en_ruta') ||
        (filtro === 'sin_asignacion' && item.estado === 'sin_asignacion');

      const query = busqueda.trim().toLowerCase();

      if (!query) {
        return coincideFiltro;
      }

      const texto = [
        item.nombre,
        item.correo,
        item.asignacion_activa?.ruta_nombre,
        item.asignacion_activa?.ruta_destino,
        item.asignacion_activa?.vehiculo_placa,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return coincideFiltro && texto.includes(query);
    });
  }, [conductores, filtro, busqueda]);

  return (
    <>
      <style>{`
    /* ── Gestión de Repartidores ── */
    .grep-header-title {
      margin: 24px 0 18px;
      background: #ffffff;
      border: 1px solid #d8dff8;
      border-radius: 12px;
      padding: 16px 22px;
      box-shadow: 0 4px 16px rgba(47,64,120,0.06);
      text-align: center;
    }
    .grep-titulo {
      font-size: 26px;
      font-weight: 700;
      color: #1a2d50;
      margin: 0;
    }

    .grep-barra {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 22px;
      background: rgba(220,230,250,0.45);
      border: 1px solid rgba(200,215,240,0.4);
      border-radius: 14px;
      padding: 12px 16px;
    }
    .grep-buscar {
      flex: 1;
      min-width: 200px;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.7);
      border: 1px solid #d0d8e8;
      border-radius: 10px;
      padding: 10px 14px;
    }
    .grep-buscar input {
      border: none; background: transparent; outline: none;
      font-size: 14px; color: #2b3552; width: 100%;
    }
    .grep-buscar input::placeholder { color: #9aa8c0; }

    .grep-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      color: #fff;
      transition: opacity 0.2s;
    }
    .grep-chip:hover { opacity: 0.85; }
    .grep-chip--activos { background: #3b6aaa; }
    .grep-chip--enruta  { background: #43a047; }
    .grep-chip--sin     { background: #f5a623; }
    .grep-chip__count {
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      padding: 1px 8px;
      font-size: 12px;
    }

    .grep-filtro-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 10px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 14px; font-weight: 600; color: #3b5585;
      cursor: pointer;
    }
    .grep-filtro-btn:hover { background: #fff; }

    .grep-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
      margin-bottom: 22px;
    }

    .grep-card {
      background: rgba(230,237,250,0.5);
      border: 1px solid rgba(200,215,240,0.45);
      border-radius: 14px;
      padding: 18px 20px 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .grep-card__top {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .grep-card__foto {
      width: 72px; height: 72px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid rgba(200,215,240,0.5);
    }
    .grep-card__info { flex: 1; }
    .grep-card__nombre {
      font-size: 18px; font-weight: 700; color: #1a2d50;
      margin: 0 0 2px;
    }
    .grep-card__zona {
      font-size: 14px; color: #5a6d8a; margin: 0 0 6px;
    }
    .grep-card__badge-zona {
      display: inline-block;
      padding: 3px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      background: #3b6aaa;
    }

    .grep-estado {
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
    }
    .grep-estado--enruta  { color: #43a047; }
    .grep-estado--sin     { color: #f5a623; }
    .grep-estado--fuera   { color: #e53935; }
    .grep-estado__dot {
      display: inline-block;
      width: 10px; height: 10px;
      border-radius: 50%;
      margin-right: 4px;
    }
    .grep-estado--enruta .grep-estado__dot  { background: #43a047; }
    .grep-estado--sin .grep-estado__dot     { background: #f5a623; }
    .grep-estado--fuera .grep-estado__dot   { background: #e53935; }

    .grep-card__acciones {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .grep-accion {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid #d0d8e8;
      background: rgba(255,255,255,0.7);
      font-size: 13px;
      font-weight: 500;
      color: #3b5585;
      cursor: pointer;
      transition: background 0.2s;
      text-decoration: none;
    }
    .grep-accion:hover { background: #fff; }

    .grep-paginacion {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0 20px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .grep-paginacion__info {
      font-size: 14px; color: #5a6d8a;
    }

    @media (max-width: 860px) {
      .grep-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .grep-barra { flex-direction: column; align-items: stretch; }
      .grep-buscar { min-width: auto; }
      .grep-paginacion { flex-direction: column; align-items: flex-start; }
    }
  `}</style>
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

          <div className="grep-header-title">
            <h2 className="grep-titulo">Gestion de Repartidores</h2>
          </div>

          <div className="grep-barra">
            <div className="grep-buscar">
              <input
                type="text"
                placeholder="Buscar repartidor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <button className="grep-chip grep-chip--activos" type="button" onClick={() => setFiltro('activos')}>
              Activos <span className="grep-chip__count">{loading ? '...' : resumen.activos}</span>
            </button>
            <button className="grep-chip grep-chip--enruta" type="button" onClick={() => setFiltro('en_ruta')}>
              En ruta <span className="grep-chip__count">{loading ? '...' : resumen.enRuta}</span>
            </button>
            <button className="grep-chip grep-chip--sin" type="button" onClick={() => setFiltro('sin_asignacion')}>
              Sin asignacion <span className="grep-chip__count">{loading ? '...' : resumen.sinAsignacion}</span>
            </button>
            <button className="grep-filtro-btn" type="button" onClick={() => setFiltro('todos')}>Todos</button>
          </div>

          {error ? <p style={{ color: '#b71c1c', marginBottom: '10px' }}>{error}</p> : null}

          <div className="grep-grid">
            {loading ? (
              <p style={{ color: '#5a6d8a', padding: '8px 4px' }}>Cargando repartidores...</p>
            ) : conductoresFiltrados.length === 0 ? (
              <p style={{ color: '#5a6d8a', padding: '8px 4px' }}>No hay repartidores para mostrar.</p>
            ) : (
              conductoresFiltrados.map((conductor) => {
                const estado = estadoConfig(conductor.estado);
                const zona = conductor.asignacion_activa?.ruta_destino || 'Sin zona';

                return (
                  <div className="grep-card" key={conductor.id_conductor}>
                    <div className="grep-card__top">
                      <img src="/piWeb/images/usuario.png" alt={conductor.nombre} className="grep-card__foto" />
                      <div className="grep-card__info">
                        <p className="grep-card__nombre">{conductor.nombre}</p>
                        <p className="grep-card__zona">{zona}</p>
                        <span className="grep-card__badge-zona">{conductor.asignacion_activa?.ruta_nombre || 'Sin ruta'}</span>
                      </div>
                      <span className={estado.className}>
                        <span className="grep-estado__dot"></span> {estado.text}
                      </span>
                    </div>
                    <div className="grep-card__acciones">
                      <Link to={`/supervisor/ruta-repartidor?idConductor=${conductor.id_conductor}`} className="grep-accion">Ver ruta</Link>
                      <Link to={`/supervisor/entregas-repartidor?idConductor=${conductor.id_conductor}`} className="grep-accion">Ver entregas</Link>
                      <Link to={`/supervisor/entregas-repartidor?openReasignar=1&idConductor=${conductor.id_conductor}`} className="grep-accion">Reasignar paquetes</Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="grep-paginacion">
            <span className="grep-paginacion__info">Mostrando {conductoresFiltrados.length} de {resumen.total} repartidores</span>
          </div>
        </main>
      </div>
    </>
  );
}
