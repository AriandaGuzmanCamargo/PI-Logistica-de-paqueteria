import nodemailer from 'nodemailer';

let cachedTransporter = null;

function getMailProvider() {
  const configured = String(process.env.MAIL_PROVIDER || '').trim().toLowerCase();

  if (configured === 'resend' || configured === 'smtp') {
    return configured;
  }

  if (process.env.MAIL_API_KEY) {
    return 'resend';
  }

  return 'smtp';
}

function hasValidSmtpConfig() {
  return Boolean(
    process.env.MAIL_HOST &&
      process.env.MAIL_PORT &&
      process.env.MAIL_USER &&
      process.env.MAIL_PASSWORD &&
      process.env.MAIL_FROM
  );
}

function hasValidResendConfig() {
  return Boolean(process.env.MAIL_API_KEY && process.env.MAIL_FROM);
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  if (!hasValidSmtpConfig()) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: String(process.env.MAIL_SECURE || '').toLowerCase() === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  return cachedTransporter;
}

async function sendWithResend({ to, subject, html }) {
  if (!hasValidResendConfig()) {
    return {
      sent: false,
      reason: 'mail-config-missing',
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MAIL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`Error de Mail API (${response.status}): ${body || 'sin detalle'}`);
    error.statusCode = 502;
    throw error;
  }

  return {
    sent: true,
    provider: 'resend',
  };
}

function buildTrackingUrl(codigoRastreo) {
  const baseUrl = String(process.env.TRACKING_PUBLIC_BASE_URL || '').trim();

  if (!baseUrl) {
    return null;
  }

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}codigo=${encodeURIComponent(codigoRastreo)}`;
}

function buildTrackingHtml({ nombreCliente, codigoRastreo, idEnvio, trackingUrl }) {
  const saludo = nombreCliente ? `Hola ${nombreCliente},` : 'Hola,';
  const cta = trackingUrl
    ? `<p>Puedes revisar el estatus de tu envio aqui: <a href="${trackingUrl}">${trackingUrl}</a></p>`
    : '<p>Consulta el estatus de tu envio desde la app con tu codigo de rastreo.</p>';

  return `
    <div style="font-family: Arial, sans-serif; color: #1f2a44; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">Tu envio fue registrado</h2>
      <p>${saludo}</p>
      <p>Se registro correctamente tu envio <strong>#${idEnvio}</strong>.</p>
      <p>Tu codigo de rastreo es:</p>
      <p style="font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">${codigoRastreo}</p>
      ${cta}
      <p>Gracias por usar nuestro servicio de paqueteria.</p>
    </div>
  `;
}

export async function sendTrackingCreatedEmail({
  to,
  nombreCliente,
  codigoRastreo,
  idEnvio,
}) {
  const email = String(to || '').trim().toLowerCase();

  if (!email || !codigoRastreo || !idEnvio) {
    return {
      sent: false,
      reason: 'missing-data',
    };
  }

  const trackingUrl = buildTrackingUrl(codigoRastreo);
  const subject = `Tu envio #${idEnvio} fue registrado`;
  const html = buildTrackingHtml({
    nombreCliente,
    codigoRastreo,
    idEnvio,
    trackingUrl,
  });

  const provider = getMailProvider();

  if (provider === 'resend') {
    return sendWithResend({
      to: email,
      subject,
      html,
    });
  }

  const transporter = getTransporter();

  if (!transporter) {
    return {
      sent: false,
      reason: 'mail-config-missing',
    };
  }

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    html,
  });

  return {
    sent: true,
    provider: 'smtp',
  };
}
