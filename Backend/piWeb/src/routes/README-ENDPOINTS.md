# Endpoints API (modular)

## Auth
- POST `/api/auth/login`
  - body: `{ correo, contrasena, tipoAcceso? }`

## Envios
- GET `/api/envios/usuario/:idUsuario`
  - ejemplo: `/api/envios/usuario/4`

## Tracking
- GET `/api/tracking/:codigo`
  - ejemplo: `/api/tracking/MTZ001`

## Notas
- La API oficial corre en puerto `3000`.
- Web y Mobile deben consumir esta misma API.
