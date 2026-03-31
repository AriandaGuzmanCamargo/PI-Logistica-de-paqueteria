import React, { useCallback, useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MenuSupervisor from './menuSupervisor.jsx';
import {
  estadoEnvioClase,
  estadoEnvioTexto,
  getDetalleConductorSupervisor,
} from '../../services/supervisorService';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const MAPS_CO_BASE_URL = 'https://geocode.maps.co/search';
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving';
const REQUEST_TIMEOUT_MS = 7000;

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeAddressQuery(address) {
  return String(address || '')
    .replace(/\n+/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .replace(/,+/g, ',')
    .replace(/,\s*,/g, ', ')
    .trim();
}

async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function geocodeWithNominatim(query) {
  const url = `${NOMINATIM_BASE_URL}?format=json&limit=1&addressdetails=0&q=${encodeURIComponent(query)}`;
  const response = await fetchWithTimeout(url, {
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'es',
    },
  });

  if (!response.ok) {
    throw new Error('nominatim-unavailable');
  }

  const results = await response.json();
  const first = Array.isArray(results) ? results[0] : null;
  const lat = toNumber(first?.lat);
  const lng = toNumber(first?.lon);

  if (!lat || !lng) {
    throw new Error('nominatim-empty');
  }

  return { lat, lng, displayName: first?.display_name || query };
}

async function geocodeWithMapsCo(query) {
  const url = `${MAPS_CO_BASE_URL}?q=${encodeURIComponent(query)}`;
  const response = await fetchWithTimeout(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('mapsco-unavailable');
  }

  const results = await response.json();
  const first = Array.isArray(results) ? results[0] : null;
  const lat = toNumber(first?.lat);
  const lng = toNumber(first?.lon);

  if (!lat || !lng) {
    throw new Error('mapsco-empty');
  }

  return { lat, lng, displayName: first?.display_name || query };
}

async function geocodeAddress(address) {
  const normalized = normalizeAddressQuery(address);

  if (!normalized) {
    throw new Error('Direccion vacia.');
  }

  const query = `${normalized}, Mexico`;

  try {
    return await geocodeWithNominatim(query);
  } catch {
    return geocodeWithMapsCo(query);
  }
}

function buildFallbackRoute(origin, destination) {
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusMeters = 6371000;
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLon = toRadians(destination.lng - origin.lng);
  const lat1 = toRadians(origin.lat);
  const lat2 = toRadians(destination.lat);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceMeters = Math.max(0, earthRadiusMeters * c);

  return {
    coordinates: [origin, destination],
    distanceMeters,
    durationSeconds: Math.max(60, Math.round(distanceMeters / 7.5)),
  };
}

async function getDrivingRoute(origin, destination) {
  const url = `${OSRM_BASE_URL}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=false`;

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return {
        ...buildFallbackRoute(origin, destination),
        isFallback: true,
      };
    }

    const payload = await response.json();
    const route = payload?.routes?.[0];

    if (!route || !Array.isArray(route?.geometry?.coordinates)) {
      return {
        ...buildFallbackRoute(origin, destination),
        isFallback: true,
      };
    }

    return {
      coordinates: route.geometry.coordinates
        .map((item) => ({
          lat: toNumber(item?.[1]),
          lng: toNumber(item?.[0]),
        }))
        .filter((item) => item.lat !== null && item.lng !== null),
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      isFallback: false,
    };
  } catch {
    return {
      ...buildFallbackRoute(origin, destination),
      isFallback: true,
    };
  }
}

function toKm(distanceMeters) {
  if (!Number.isFinite(distanceMeters)) {
    return '--';
  }

  return (distanceMeters / 1000).toFixed(1);
}

function toMinutes(durationSeconds) {
  if (!Number.isFinite(durationSeconds)) {
    return '--';
  }

  return Math.max(1, Math.round(durationSeconds / 60));
}

function createStopIcon(index) {
  return L.divIcon({
    className: '',
    html: `<div style="width:24px;height:24px;border-radius:50%;background:#f59e0b;color:#fff;font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25);">${index}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function RutaRepartidorSupervisor() {
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapState, setMapState] = useState({
    loading: false,
    error: '',
    warning: '',
    origin: null,
    destination: null,
    routeCoordinates: [],
    distanceMeters: null,
    durationSeconds: null,
    stopPoints: [],
  });

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

  const rutaActual = useMemo(() => {
    const envios = Array.isArray(detalle?.envios) ? detalle.envios : [];

    if (envios.length === 0) {
      return null;
    }

    const asignaciones = envios
      .map((item) => item?.asignacion)
      .filter(Boolean)
      .sort((a, b) => {
        const prioridadA = a.estado_asignacion === 'en_proceso' ? 0 : 1;
        const prioridadB = b.estado_asignacion === 'en_proceso' ? 0 : 1;

        if (prioridadA !== prioridadB) {
          return prioridadA - prioridadB;
        }

        const fechaA = a.fecha_salida ? new Date(a.fecha_salida).getTime() : 0;
        const fechaB = b.fecha_salida ? new Date(b.fecha_salida).getTime() : 0;

        return fechaB - fechaA;
      });

    return asignaciones[0] || null;
  }, [detalle]);

  const enviosRutaActual = useMemo(() => {
    if (!rutaActual?.id_asignacion) {
      return [];
    }

    return (detalle?.envios || []).filter(
      (item) => Number(item?.asignacion?.id_asignacion) === Number(rutaActual.id_asignacion)
    );
  }, [detalle, rutaActual]);

  const loadMapRoute = useCallback(async () => {
    if (!rutaActual) {
      setMapState((prev) => ({
        ...prev,
        loading: false,
        error: '',
        warning: '',
        origin: null,
        destination: null,
        routeCoordinates: [],
        distanceMeters: null,
        durationSeconds: null,
        stopPoints: [],
      }));
      return;
    }

    setMapState((prev) => ({ ...prev, loading: true, error: '', warning: '' }));

    try {
      const originAddress = rutaActual.ruta_origen || enviosRutaActual[0]?.direccion_origen || '';
      const destinationAddress = rutaActual.ruta_destino || enviosRutaActual[0]?.direccion_destino || '';

      const [origin, destination] = await Promise.all([
        geocodeAddress(originAddress),
        geocodeAddress(destinationAddress),
      ]);

      const routeData = await getDrivingRoute(origin, destination);

      const stopAddressList = Array.from(
        new Set(
          enviosRutaActual
            .map((envio) => [envio?.direccion_destino, envio?.ciudad_destino].filter(Boolean).join(', '))
            .filter(Boolean)
        )
      ).slice(0, 10);

      const stopPoints = (
        await Promise.all(
          stopAddressList.map(async (address, index) => {
            try {
              const point = await geocodeAddress(address);
              return {
                ...point,
                label: `Parada ${index + 1}`,
                address,
              };
            } catch {
              return null;
            }
          })
        )
      ).filter(Boolean);

      setMapState({
        loading: false,
        error: '',
        warning: routeData.isFallback
          ? 'No se pudo consultar el trazado de ruta en tiempo real. Se muestra una aproximacion.'
          : '',
        origin,
        destination,
        routeCoordinates: routeData.coordinates,
        distanceMeters: routeData.distanceMeters,
        durationSeconds: routeData.durationSeconds,
        stopPoints,
      });
    } catch (mapError) {
      setMapState((prev) => ({
        ...prev,
        loading: false,
        error: mapError.message || 'No se pudo dibujar la ruta en el mapa.',
      }));
    }
  }, [enviosRutaActual, rutaActual]);

  useEffect(() => {
    loadMapRoute();
  }, [loadMapRoute]);

  const mapCenter = useMemo(() => {
    if (mapState.origin && mapState.destination) {
      return [
        (mapState.origin.lat + mapState.destination.lat) / 2,
        (mapState.origin.lng + mapState.destination.lng) / 2,
      ];
    }

    return [19.432608, -99.133209];
  }, [mapState.destination, mapState.origin]);

  const mapsEmbedUrl = useMemo(() => {
    const originQuery = [rutaActual?.ruta_origen, enviosRutaActual[0]?.direccion_origen, enviosRutaActual[0]?.ciudad_origen]
      .filter(Boolean)
      .join(', ')
      .trim();
    const destinationQuery = [rutaActual?.ruta_destino, enviosRutaActual[0]?.direccion_destino, enviosRutaActual[0]?.ciudad_destino]
      .filter(Boolean)
      .join(', ')
      .trim();

    if (!originQuery && !destinationQuery) {
      return '';
    }

    if (originQuery && destinationQuery) {
      return `https://www.google.com/maps?q=${encodeURIComponent(`${originQuery} to ${destinationQuery}`)}&output=embed`;
    }

    return `https://www.google.com/maps?q=${encodeURIComponent(originQuery || destinationQuery)}&output=embed`;
  }, [enviosRutaActual, rutaActual]);

  const openExternalNavigation = () => {
    if (!mapState.origin || !mapState.destination) {
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${mapState.origin.lat},${mapState.origin.lng}&destination=${mapState.destination.lat},${mapState.destination.lng}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">
      <div id="menuContainer" className="menu-overlay"><MenuSupervisor /></div>
      <div id="menuBackdrop" className="menu-overlay__backdrop"></div>

      <main className="panel-principal panel-principal--full panel-principal--supervisor panel-principal--supervisor-ruta">
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
                <>
                  <div className="info-lista info-lista--dos-columnas" style={{ marginBottom: '12px' }}>
                    <p><span>Nombre ruta:</span> {rutaActual.ruta_nombre || '-'}</p>
                    <p><span>Vehículo:</span> {rutaActual.vehiculo_placa || '-'}</p>
                    <p><span>Origen:</span> {rutaActual.ruta_origen || '-'}</p>
                    <p><span>Destino:</span> {rutaActual.ruta_destino || '-'}</p>
                    <p><span>Salida:</span> {rutaActual.fecha_salida ? new Date(rutaActual.fecha_salida).toLocaleString() : '-'}</p>
                    <p><span>Estado asignación:</span> {rutaActual.estado_asignacion || '-'}</p>
                  </div>

                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #d3ddf1', background: '#f4f7ff' }}>
                    <div style={{ height: '340px', width: '100%', position: 'relative' }}>
                      {mapState.origin && mapState.destination ? (
                        <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
                          <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />

                          {mapState.routeCoordinates.length > 0 ? (
                            <Polyline
                              positions={mapState.routeCoordinates.map((point) => [point.lat, point.lng])}
                              pathOptions={{ color: '#2f6edb', weight: 5 }}
                            />
                          ) : null}

                          <Marker position={[mapState.origin.lat, mapState.origin.lng]}>
                            <Popup>Origen de ruta</Popup>
                          </Marker>

                          <Marker position={[mapState.destination.lat, mapState.destination.lng]}>
                            <Popup>Destino de ruta</Popup>
                          </Marker>

                          {mapState.stopPoints.map((point, index) => (
                            <Marker
                              key={`${point.address}-${index}`}
                              position={[point.lat, point.lng]}
                              icon={createStopIcon(index + 1)}
                            >
                              <Popup>{point.label}: {point.address}</Popup>
                            </Marker>
                          ))}
                        </MapContainer>
                      ) : mapsEmbedUrl ? (
                        <iframe
                          title="Mapa de ruta"
                          src={mapsEmbedUrl}
                          style={{ border: 0, width: '100%', height: '100%' }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4b5f85', padding: '12px', textAlign: 'center' }}>
                          No hay coordenadas suficientes para pintar el mapa de esta ruta.
                        </div>
                      )}

                      {mapState.loading ? (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(244,247,255,0.85)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            color: '#2f4f88',
                          }}
                        >
                          Calculando ruta real...
                        </div>
                      ) : null}
                    </div>

                    <div style={{ padding: '10px 12px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ color: '#2f4f88', fontWeight: 700 }}>Distancia: {toKm(mapState.distanceMeters)} km</span>
                      <span style={{ color: '#2f4f88', fontWeight: 700 }}>Tiempo estimado: {toMinutes(mapState.durationSeconds)} min</span>
                      <button
                        type="button"
                        onClick={loadMapRoute}
                        style={{ border: '1px solid #7f9cd6', background: '#fff', color: '#2f4f88', borderRadius: '8px', padding: '6px 10px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Actualizar ruta
                      </button>
                      <button
                        type="button"
                        onClick={openExternalNavigation}
                        style={{ border: 'none', background: '#2f6edb', color: '#fff', borderRadius: '8px', padding: '6px 10px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Abrir en Maps
                      </button>
                    </div>

                    {mapState.warning ? (
                      <p style={{ margin: '0 12px 12px', color: '#9a6b00', fontWeight: 600 }}>{mapState.warning}</p>
                    ) : null}

                    {mapState.error ? (
                      <p style={{ margin: '0 12px 12px', color: '#b71c1c', fontWeight: 600 }}>{mapState.error}</p>
                    ) : null}
                  </div>
                </>
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
                              {estadoEnvioTexto(item.estado_envio)}
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
