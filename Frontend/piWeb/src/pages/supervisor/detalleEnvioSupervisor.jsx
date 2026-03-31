import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getConductoresDisponiblesSupervisor,
  getDetalleConductorSupervisor,
  getDetalleEnvioSupervisor,
  reasignarEnvioSupervisor,
} from '../../services/supervisorService';

function toDateOnly(value) {
  if (!value) return null;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return trimmed;
    }
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
}

function normalizeEstadoEnvio(value) {
  return String(value || '').trim().toLowerCase();
}

export default function DetalleEnvioSupervisor() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('id');
  const idConductorParam = searchParams.get('idConductor');

  const [envio, setEnvio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDetalle() {
      try {
        setLoading(true);
        setError('');
        setEnvio(null);

        let idEnvio = idParam;

        if (!idEnvio && idConductorParam) {
          const detalle = await getDetalleConductorSupervisor(idConductorParam);
          const envios = detalle?.envios || [];
          const elegible =
            envios.find((e) => normalizeEstadoEnvio(e.estado_envio) !== 'entregado') || envios[0];

          if (!elegible?.id_envio) {
          throw new Error('Este repartidor no tiene envíos asignados para reasignar.');
          }
          idEnvio = String(elegible.id_envio);
        }

        if (!idEnvio) {
        throw new Error('No se recibió el id de envío en la URL.');
        }

        const data = await getDetalleEnvioSupervisor(idEnvio);
        if (isMounted) {
          setEnvio(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'No se pudo cargar el detalle del envío.');
          setEnvio(null);
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
  }, [idParam, idConductorParam]);

  const fechaAsignacion = useMemo(() => {
    if (!envio) return null;

    return (
      toDateOnly(envio.asignacion?.fecha_salida) ||
      toDateOnly(envio.fecha_asignacion_sugerida) ||
      toDateOnly(envio.fecha_estimada_entrega) ||
      toDateOnly(envio.fecha_creacion)
    );
  }, [envio]);

  useEffect(() => {
    let isMounted = true;

    async function loadDrivers() {
      if (!envio || !fechaAsignacion) {
        setAvailableDrivers([]);
        setSelectedDriverId('');
        return;
      }

      try {
        setIsLoadingDrivers(true);
        const drivers = await getConductoresDisponiblesSupervisor(fechaAsignacion);
        if (!isMounted) return;

        setAvailableDrivers(drivers);
        if (drivers.length > 0) {
          setSelectedDriverId(String(drivers[0].id_conductor));
        } else {
          setSelectedDriverId('');
        }
      } catch (_loadError) {
        if (!isMounted) return;
        setAvailableDrivers([]);
        setSelectedDriverId('');
      } finally {
        if (isMounted) {
          setIsLoadingDrivers(false);
        }
      }
    }

    loadDrivers();

    return () => {
      isMounted = false;
    };
  }, [envio, fechaAsignacion]);

  async function refreshDetalle() {
    if (!envio?.id_envio) return;
    const data = await getDetalleEnvioSupervisor(envio.id_envio);
    setEnvio(data);
  }

  async function handleQuitarDelRepartidor() {
    if (!envio?.id_envio || !envio?.asignacion) {
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      await reasignarEnvioSupervisor({
        idEnvio: envio.id_envio,
        idConductor: null,
        fechaAsignacion,
      });

      await refreshDetalle();
    } catch (actionError) {
      setError(actionError.message || 'No se pudo cancelar la asignación actual.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReasignarConductor() {
    if (!envio?.id_envio || !selectedDriverId) {
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      await reasignarEnvioSupervisor({
        idEnvio: envio.id_envio,
        idConductor: Number(selectedDriverId),
        fechaAsignacion,
      });

      await refreshDetalle();
    } catch (actionError) {
      setError(actionError.message || 'No se pudo reasignar el envío al conductor.');
    } finally {
      setIsSaving(false);
    }
  }

  const guia = envio?.paquete?.codigo_rastreo || (envio ? `ENV-${envio.id_envio}` : '---');

  return (
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

        <h2 className="titulo-pagina-operador">Detalle del envío</h2>

        {error ? <p style={{ color: '#b71c1c' }}>{error}</p> : null}
        {loading ? <p style={{ color: '#5a6d8a' }}>Cargando detalle...</p> : null}

        {!loading && envio ? (
          <section className="modulo-detalle" style={{ maxWidth: 'none', width: '100%', margin: 0 }}>
            <h2 className="titulo-detalle">Guía: <strong>{guia}</strong></h2>

            <div className="detalle-grid" style={{ width: '100%' }}>
            <div className="detalle-columna" style={{ gap: '8px' }}>
                <article className="tarjeta-detalle">
                  <h3>Estado del envío</h3>
                  <p>
                    <span className={`estado ${estadoEnvioClase(envio.estado_envio)}`}>
                      {estadoEnvioTexto(envio.estado_envio)}
                    </span>
                  </p>
                  <p><strong>Creado:</strong> {envio.fecha_creacion ? new Date(envio.fecha_creacion).toLocaleString() : '-'}</p>
                  <p><strong>Entrega estimada:</strong> {envio.fecha_estimada_entrega ? new Date(envio.fecha_estimada_entrega).toLocaleString() : '-'}</p>
                  <p><strong>Costo total:</strong> ${envio.costo_total ?? '-'}</p>
                </article>

                <article className="tarjeta-detalle">
                  <h3>Paquete</h3>
                  <p><strong>Tipo:</strong> {envio.paquete?.tipo_contenido || '-'}</p>
                  <p><strong>Servicio:</strong> {envio.paquete?.tipo_servicio || '-'}</p>
                  <p><strong>Peso:</strong> {envio.paquete?.peso ?? '-'} kg</p>
                  <p><strong>Dimensiones:</strong> {envio.paquete ? `${envio.paquete.largo ?? '-'} x ${envio.paquete.ancho ?? '-'} x ${envio.paquete.alto ?? '-'} cm` : '-'}</p>
                  <p><strong>Valor declarado:</strong> ${envio.paquete?.valor_declarado ?? '-'}</p>
                </article>

              <article className="tarjeta-detalle">
                <h3>Evidencia de entrega</h3>
                {envio?.foto_entrega_url ? (
                  <div style={{ marginTop: '8px' }}>
                    <img
                      src={envio.foto_entrega_url}
                      alt="Evidencia de entrega"
                      style={{
                        width: '100%',
                        maxHeight: '220px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                    <p style={{ marginTop: '8px', color: '#5a6d8a' }}>
                      Fotografía capturada por el repartidor al confirmar la entrega.
                    </p>
                  </div>
                ) : (
                  <p style={{ color: '#5a6d8a' }}>Aún no hay evidencia fotográfica registrada para este envío.</p>
                )}
              </article>
              </div>

              <div className="detalle-columna">
                <article className="tarjeta-detalle">
                  <h3>Remitente</h3>
                  <p><strong>Nombre:</strong> {envio.remitente?.nombre || '-'}</p>
                  <p><strong>Teléfono:</strong> {envio.remitente?.telefono || '-'}</p>
                  <p><strong>Correo:</strong> {envio.remitente?.correo || '-'}</p>
                  <p><strong>Origen:</strong> {envio.direccion_origen || '-'} ({envio.ciudad_origen || '-'})</p>
                </article>

                <article className="tarjeta-detalle">
                  <h3>Destinatario</h3>
                  <p><strong>Nombre:</strong> {envio.destinatario?.nombre || '-'}</p>
                  <p><strong>Teléfono:</strong> {envio.destinatario?.telefono || '-'}</p>
                  <p><strong>Correo:</strong> {envio.destinatario?.correo || '-'}</p>
                  <p><strong>Destino:</strong> {envio.direccion_destino || '-'} ({envio.ciudad_destino || '-'})</p>
                </article>

                <article className="tarjeta-detalle">
                  <h3>Asignación</h3>
                  {envio.asignacion ? (
                    <>
                      <p><strong>Conductor:</strong> {envio.asignacion.conductor_nombre || '-'}</p>
                      <p><strong>Correo:</strong> {envio.asignacion.conductor_correo || '-'}</p>
                      <p><strong>Estado:</strong> {normalizeEstadoEnvio(envio.estado_envio) === 'entregado' || normalizeEstadoEnvio(envio.estado_envio) === 'cancelado' ? (normalizeEstadoEnvio(envio.estado_envio) === 'entregado' ? 'Entregado' : 'Cancelado') : (envio.asignacion.estado_asignacion || '-')}</p>
                      {normalizeEstadoEnvio(envio.estado_envio) === 'pendiente' && (
                        <div style={{ marginTop: '8px' }}>
                          <button
                            type="button"
                            className="boton-detalles"
                            onClick={handleQuitarDelRepartidor}
                            disabled={isSaving}
                          >
                            {isSaving ? 'Procesando...' : 'Quitar del repartidor'}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Sin asignación activa.</p>
                  )}

                  {normalizeEstadoEnvio(envio.estado_envio) === 'pendiente' && (
                    <div style={{ marginTop: '12px' }}>
                      <p><strong>Reasignar a:</strong></p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <select
                          value={selectedDriverId}
                          onChange={(e) => setSelectedDriverId(e.target.value)}
                          disabled={isSaving || isLoadingDrivers}
                        >
                          <option value="">
                            {isLoadingDrivers ? 'Cargando conductores...' : 'Seleccionar conductor'}
                          </option>
                          {availableDrivers.map((driver) => (
                            <option key={driver.id_conductor} value={String(driver.id_conductor)}>
                              {driver.nombre}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="boton-detalles"
                          onClick={handleReasignarConductor}
                          disabled={!selectedDriverId || isSaving || isLoadingDrivers}
                        >
                          {isSaving ? 'Procesando...' : 'Reasignar'}
                        </button>
                      </div>
                      {!isLoadingDrivers && availableDrivers.length === 0 ? (
                        <p style={{ marginTop: '8px', color: '#5a6d8a' }}>
                          No hay conductores disponibles para la fecha seleccionada.
                        </p>
                      ) : null}
                    </div>
                  )}
                </article>

                <article className="tarjeta-detalle tarjeta-detalle--acciones">
                  <a className="boton-volver" href="/supervisor/envios">Volver</a>
                </article>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}


