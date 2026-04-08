export function errorHandler(error, _req, res, _next) {
	console.error('API error:', error);

	if (res.headersSent) {
		return;
	}

	res.status(error.statusCode || 500).json({
		ok: false,
		message: error.message || 'Error interno del servidor.',
	});
}
