const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
const GENERIC_ID_REGEX = /^[A-Z0-9-]{6,25}$/;

export const SERVICE_TYPES = ['normal', 'express', 'economico'];

function normalizeSpaces(value) {
	return String(value || '').trim().replace(/\s{2,}/g, ' ');
}

export function sanitizeText(value) {
	return normalizeSpaces(value);
}

export function sanitizePhone(value) {
	return String(value || '').replace(/\D+/g, '').slice(0, 15);
}

export function sanitizeIdentity(value) {
	return String(value || '').toUpperCase().replace(/\s+/g, '').slice(0, 25);
}

export function sanitizeAddress(value) {
	return String(value || '').replace(/\s{2,}/g, ' ').trim();
}

export function validateFullName(value, label = 'Nombre completo') {
	const normalized = sanitizeText(value);

	if (!normalized) {
		throw new Error(`${label} es obligatorio.`);
	}

	if (normalized.length < 5) {
		throw new Error(`${label} debe tener al menos 5 caracteres.`);
	}

	if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'\-.\s]+$/.test(normalized)) {
		throw new Error(`${label} contiene caracteres no permitidos.`);
	}

	return normalized;
}

export function validateIdentity(value, label = 'CURP o ID alterno') {
	const normalized = sanitizeIdentity(value);

	if (!normalized) {
		throw new Error(`${label} es obligatorio.`);
	}

	const isCurp = CURP_REGEX.test(normalized);
	const isGeneric = GENERIC_ID_REGEX.test(normalized);

	if (!isCurp && !isGeneric) {
		throw new Error(`${label} invalido. Usa CURP de 18 caracteres o un ID alfanumerico (6 a 25).`);
	}

	return normalized;
}

export function validatePhone(value) {
	const normalized = sanitizePhone(value);

	if (!/^\d{10}$/.test(normalized)) {
		throw new Error('Telefono invalido. Debe tener 10 digitos.');
	}

	return normalized;
}

export function validateEmail(value) {
	const normalized = String(value || '').trim().toLowerCase();

	if (!normalized) {
		throw new Error('Correo electronico es obligatorio.');
	}

	if (!EMAIL_REGEX.test(normalized)) {
		throw new Error('Correo electronico invalido.');
	}

	return normalized;
}

export function validateCity(value, label = 'Ciudad') {
	const normalized = sanitizeText(value);

	if (!normalized) {
		throw new Error(`${label} es obligatoria.`);
	}

	if (normalized.length < 3) {
		throw new Error(`${label} debe tener al menos 3 caracteres.`);
	}

	return normalized;
}

export function validateAddress(value, label = 'Direccion') {
	const normalized = sanitizeAddress(value);

	if (!normalized) {
		throw new Error(`${label} es obligatoria.`);
	}

	const hasStreetAndNumber = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.\-]+\s\d+[A-Za-z0-9-]*/.test(normalized);
	const hasTwoCommas = (normalized.match(/,/g) || []).length >= 2;
	const hasPostalCode = /\b\d{5}\b/.test(normalized);

	if (!hasStreetAndNumber || !hasTwoCommas || !hasPostalCode) {
		throw new Error(`${label} invalida. Usa formato: Calle y numero, Colonia, CP 12345.`);
	}

	if (normalized.length < 15) {
		throw new Error(`${label} es demasiado corta para ubicarla en el mapa.`);
	}

	return normalized;
}

function validatePositiveNumber(value, label, min = 0.01, max = 999999) {
	const parsed = Number(String(value || '').replace(',', '.'));

	if (!Number.isFinite(parsed)) {
		throw new Error(`${label} debe ser numerico.`);
	}

	if (parsed < min || parsed > max) {
		throw new Error(`${label} fuera de rango permitido.`);
	}

	return parsed;
}

export function validatePackagePayload(payload) {
	const sanitized = {
		tipoPaquete: sanitizeText(payload?.tipoPaquete),
		contenido: sanitizeText(payload?.contenido),
		tipoServicio: String(payload?.tipoServicio || '').trim().toLowerCase(),
		peso: validatePositiveNumber(payload?.peso, 'Peso (kg)', 0.1, 200),
		largo: validatePositiveNumber(payload?.largo, 'Largo (cm)', 1, 300),
		ancho: validatePositiveNumber(payload?.ancho, 'Ancho (cm)', 1, 300),
		alto: validatePositiveNumber(payload?.alto, 'Alto (cm)', 1, 300),
		valorDeclarado: validatePositiveNumber(payload?.valorDeclarado, 'Valor declarado', 1, 500000),
	};

	if (!sanitized.tipoPaquete) {
		throw new Error('Tipo de paquete es obligatorio.');
	}

	if (sanitized.tipoPaquete.length < 3) {
		throw new Error('Tipo de paquete demasiado corto.');
	}

	if (!sanitized.contenido) {
		throw new Error('Contenido es obligatorio.');
	}

	if (sanitized.contenido.length < 3) {
		throw new Error('Contenido demasiado corto.');
	}

	if (!SERVICE_TYPES.includes(sanitized.tipoServicio)) {
		throw new Error('Tipo de servicio invalido. Usa: normal, express o economico.');
	}

	return {
		...sanitized,
		peso: String(sanitized.peso),
		largo: String(sanitized.largo),
		ancho: String(sanitized.ancho),
		alto: String(sanitized.alto),
		valorDeclarado: String(sanitized.valorDeclarado),
	};
}

export function buildPersonPayload(rawPayload, labels) {
	return {
		nombre: validateFullName(rawPayload?.nombre, labels.nameLabel),
		documento: validateIdentity(rawPayload?.documento, labels.identityLabel),
		telefono: validatePhone(rawPayload?.telefono),
		correo: validateEmail(rawPayload?.correo),
		direccion: validateAddress(rawPayload?.direccion, labels.addressLabel),
		ciudad: validateCity(rawPayload?.ciudad, labels.cityLabel),
	};
}
