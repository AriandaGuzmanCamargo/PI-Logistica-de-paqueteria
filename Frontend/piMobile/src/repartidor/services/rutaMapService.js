const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const MAPS_CO_BASE_URL = 'https://geocode.maps.co/search';
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving';
const REQUEST_TIMEOUT_MS = 7000;

export async function getExpoLocationModule() {
  const locationModule = await import('expo-location');
  const Location = locationModule?.default || locationModule;

  if (!Location) {
    throw new Error('No se pudo inicializar expo-location.');
  }

  return Location;
}

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

  if (!first?.lat || !first?.lon) {
    throw new Error('nominatim-empty');
  }

  return mapGeocodeResult(first.lat, first.lon, first.display_name);
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

  const fallbackRoute = buildFallbackRoute(origin, destination);

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return {
        ...fallbackRoute,
        isFallbackRoute: true,
      };
    }

    const payload = await response.json();

    if (!payload?.routes?.length) {
      return {
        ...fallbackRoute,
        isFallbackRoute: true,
      };
    }

    const route = payload.routes[0];
    const coordinates = Array.isArray(route?.geometry?.coordinates)
      ? route.geometry.coordinates.map(([longitude, latitude]) => ({ latitude, longitude }))
      : [];

    return {
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      coordinates,
      isFallbackRoute: false,
    };
  } catch {
    return {
      ...fallbackRoute,
      isFallbackRoute: true,
    };
  }
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

export function buildFallbackRoute(origin, destination) {
  ensureCoordinate(origin, 'origen');
  ensureCoordinate(destination, 'destino');

  const earthRadiusMeters = 6371000;
  const deltaLat = toRadians(destination.latitude - origin.latitude);
  const deltaLon = toRadians(destination.longitude - origin.longitude);
  const lat1 = toRadians(origin.latitude);
  const lat2 = toRadians(destination.latitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistanceMeters = Math.max(0, earthRadiusMeters * c);

  return {
    distanceMeters: straightDistanceMeters,
    durationSeconds: Math.max(60, Math.round(straightDistanceMeters / 7.5)),
    coordinates: [origin, destination],
  };
}

export async function resolveCurrentPosition(defaultOrigin) {
  const Location = await getExpoLocationModule();

  const requestPermission = Location.requestForegroundPermissionsAsync;

  if (typeof requestPermission !== 'function') {
    return {
      origin: { ...defaultOrigin },
      source: 'default',
      warning: 'No se pudo acceder a permisos de ubicacion en este dispositivo.',
    };
  }

  const permission = await requestPermission();

  if (permission.status !== 'granted') {
    return {
      origin: { ...defaultOrigin },
      source: 'default',
      warning: 'Permiso de ubicacion denegado. Activalo para usar posicion real.',
    };
  }

  try {
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 4000,
    });

    return {
      origin: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      source: 'gps',
      warning: '',
    };
  } catch {
    const lastKnown = await Location.getLastKnownPositionAsync();

    if (lastKnown?.coords?.latitude && lastKnown?.coords?.longitude) {
      return {
        origin: {
          latitude: lastKnown.coords.latitude,
          longitude: lastKnown.coords.longitude,
        },
        source: 'lastKnown',
        warning: 'Usando ultima ubicacion conocida del dispositivo.',
      };
    }

    return {
      origin: { ...defaultOrigin },
      source: 'default',
      warning: 'No fue posible leer GPS. Verifica que la ubicacion del telefono este encendida.',
    };
  }
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
