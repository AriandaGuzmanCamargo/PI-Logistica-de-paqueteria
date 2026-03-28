const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const MAPS_CO_BASE_URL = 'https://geocode.maps.co/search';
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving';

function normalizeCoordinate(value) {
  return Number.parseFloat(Number(value).toFixed(6));
}

function ensureCoordinate(point, label) {
  if (
    !point ||
    typeof point.latitude !== 'number' ||
    Number.isNaN(point.latitude) ||
    typeof point.longitude !== 'number' ||
    Number.isNaN(point.longitude)
  ) {
    throw new Error(`No hay coordenadas validas para ${label}.`);
  }
}

export function normalizeAddressQuery(address) {
  const raw = String(address || '').trim();

  if (!raw) {
    return '';
  }

  return raw
    .replace(/\n+/g, ', ')
    .replace(/\s+-\s*PAK[\w-]*\s*$/i, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/,+/g, ',')
    .replace(/,\s*,/g, ', ')
    .trim();
}

function mapGeocodeResult(latitude, longitude, displayName) {
  return {
    latitude: normalizeCoordinate(latitude),
    longitude: normalizeCoordinate(longitude),
    displayName: displayName || '',
  };
}

async function geocodeWithNominatim(query) {
  const url = `${NOMINATIM_BASE_URL}?format=json&limit=1&addressdetails=0&q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
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

  if (!first?.lat || !first?.lon) {
    throw new Error('nominatim-empty');
  }

  return mapGeocodeResult(first.lat, first.lon, first.display_name);
}

async function geocodeWithMapsCo(query) {
  const url = `${MAPS_CO_BASE_URL}?q=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('mapsco-unavailable');
  }

  const results = await response.json();
  const first = Array.isArray(results) ? results[0] : null;

  if (!first?.lat || !first?.lon) {
    throw new Error('mapsco-empty');
  }

  return mapGeocodeResult(first.lat, first.lon, first.display_name);
}

export async function geocodeAddress(address) {
  const normalized = normalizeAddressQuery(address);
  const query = `${normalized}, Mexico`;

  if (!normalized) {
    throw new Error('La direccion es obligatoria para ubicar un punto.');
  }

  try {
    return await geocodeWithNominatim(query);
  } catch {
    try {
      return await geocodeWithMapsCo(query);
    } catch {
      throw new Error('No se pudo ubicar la direccion exacta.');
    }
  }
}

export async function getDrivingRoute(origin, destination) {
  ensureCoordinate(origin, 'origen');
  ensureCoordinate(destination, 'destino');

  const url = `${OSRM_BASE_URL}/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson&steps=false`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('No fue posible calcular la ruta.');
  }

  const payload = await response.json();

  if (!payload?.routes?.length) {
    throw new Error('No se encontro una ruta disponible entre los puntos.');
  }

  const route = payload.routes[0];
  const coordinates = Array.isArray(route?.geometry?.coordinates)
    ? route.geometry.coordinates.map(([longitude, latitude]) => ({ latitude, longitude }))
    : [];

  return {
    distanceMeters: route.distance,
    durationSeconds: route.duration,
    coordinates,
  };
}

export function toKm(distanceMeters) {
  if (!Number.isFinite(distanceMeters)) {
    return '--';
  }

  return (distanceMeters / 1000).toFixed(1);
}

export function toMinutes(durationSeconds) {
  if (!Number.isFinite(durationSeconds)) {
    return '--';
  }

  return Math.max(1, Math.round(durationSeconds / 60));
}

export function buildGoogleMapsDirectionsUrl(origin, destination) {
  ensureCoordinate(origin, 'origen');
  ensureCoordinate(destination, 'destino');

  return `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
}
