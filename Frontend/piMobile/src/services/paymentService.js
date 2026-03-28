function onlyDigits(value) {
  return String(value || '').replace(/\D+/g, '');
}

function normalizeCardNumber(value) {
  const digits = onlyDigits(value).slice(0, 19);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function isValidLuhn(cardNumber) {
  const digits = onlyDigits(cardNumber);

  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function parseExpiry(expiry) {
  const clean = String(expiry || '').trim();
  const match = clean.match(/^(\d{2})\/(\d{2})$/);

  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const yearShort = Number(match[2]);

  if (month < 1 || month > 12) {
    return null;
  }

  const fullYear = 2000 + yearShort;
  return { month, fullYear };
}

function isExpiryValid(expiry) {
  const parsed = parseExpiry(expiry);
  if (!parsed) {
    return false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (parsed.fullYear < currentYear) {
    return false;
  }

  if (parsed.fullYear === currentYear && parsed.month < currentMonth) {
    return false;
  }

  return true;
}

function last4(cardNumber) {
  const digits = onlyDigits(cardNumber);
  return digits.slice(-4);
}

export function normalizeCardInput(value) {
  return normalizeCardNumber(value);
}

export function validateCardPayload(payload) {
  const cardNumber = String(payload?.cardNumber || '').trim();
  const expiry = String(payload?.expiry || '').trim();
  const cvv = String(payload?.cvv || '').trim();
  const holderName = String(payload?.holderName || '').trim();

  if (!cardNumber || !expiry || !cvv || !holderName) {
    throw new Error('Completa todos los campos de la tarjeta.');
  }

  if (!isValidLuhn(cardNumber)) {
    throw new Error('El numero de tarjeta no es valido.');
  }

  if (!isExpiryValid(expiry)) {
    throw new Error('La fecha de expiracion no es valida. Usa formato MM/AA.');
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    throw new Error('El CVV debe tener 3 o 4 digitos.');
  }

  if (holderName.length < 4) {
    throw new Error('El nombre del titular es demasiado corto.');
  }

  return {
    cardNumber,
    expiry,
    cvv,
    holderName,
  };
}

function generateReference(prefix) {
  const random = Math.floor(100000 + Math.random() * 900000);
  const timestamp = Date.now().toString().slice(-5);
  return `${prefix}-${timestamp}${random}`;
}

export async function processCardPayment(payload) {
  const validPayload = validateCardPayload(payload);

  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });

  return {
    status: 'approved',
    method: 'tarjeta',
    reference: generateReference('PAY'),
    authCode: generateReference('AUTH'),
    cardLast4: last4(validPayload.cardNumber),
    holderName: validPayload.holderName,
  };
}

export function confirmOfflinePayment(method) {
  const normalized = String(method || '').toLowerCase().trim();

  if (!['transferencia', 'contraentrega'].includes(normalized)) {
    throw new Error('Metodo de pago no soportado.');
  }

  return {
    status: normalized === 'transferencia' ? 'pending_verification' : 'pay_on_delivery',
    method: normalized,
    reference: generateReference('PAY'),
    authCode: null,
    cardLast4: null,
    holderName: null,
  };
}
