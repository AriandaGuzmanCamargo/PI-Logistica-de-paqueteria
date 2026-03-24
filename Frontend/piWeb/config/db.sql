CREATE TYPE rol_usuario AS ENUM ('admin','operador','conductor','cliente');
CREATE TYPE estado_usuario AS ENUM ('activo','inactivo');

CREATE TYPE tipo_servicio_enum AS ENUM ('express','normal','economico');
CREATE TYPE estado_paquete_enum AS ENUM ('registrado','en_transito','entregado','retrasado','perdido');

CREATE TYPE estado_envio_enum AS ENUM ('pendiente','en_ruta','entregado','cancelado','retrasado');

CREATE TYPE tipo_ruta_enum AS ENUM ('urbana','foranea');
CREATE TYPE estado_ruta_enum AS ENUM ('activa','inactiva');

CREATE TYPE tipo_vehiculo_enum AS ENUM ('moto','van','camion');
CREATE TYPE estado_vehiculo_enum AS ENUM ('disponible','en_ruta','mantenimiento');

CREATE TYPE estado_asignacion_enum AS ENUM ('programada','en_proceso','finalizada');

CREATE TYPE estado_entrega_enum AS ENUM ('exitosa','fallida');

CREATE TYPE estado_pago_enum AS ENUM ('pendiente','pagado','rechazado');

CREATE TYPE tipo_incidencia_enum AS ENUM ('retraso','dano','perdida');
CREATE TYPE estado_incidencia_enum AS ENUM ('abierta','en_proceso','cerrada');

CREATE TYPE estado_operacion_enum AS ENUM ('activo','inactivo');
-- Usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol rol_usuario NOT NULL,
    estado estado_usuario NOT NULL DEFAULT 'activo',
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, apellido, correo, contrasena, telefono, rol, estado)
VALUES
('Admin', 'Principal', 'admin@metzvia.com', '123456', '4420000001', 'admin', 'activo'),
('Luis', 'Operador', 'operador@metzvia.com', '123456', '4420000002', 'operador', 'activo'),
('Carlos', 'Conductor', 'conductor@metzvia.com', '123456', '4420000003', 'conductor', 'activo'),
('Ana', 'Cliente', 'cliente1@metzvia.com', '123456', '4420000004', 'cliente', 'activo'),
('Maria', 'Cliente', 'cliente2@metzvia.com', '123456', '4420000005', 'cliente', 'activo'),
('Jorge', 'Mendoza', 'conductor2@metzvia.com', '123456', '4420000006', 'conductor', 'activo'),
('Rafael', 'Lopez', 'conductor3@metzvia.com', '123456', '4420000007', 'conductor', 'activo'),
('Diego', 'Ramirez', 'conductor4@metzvia.com', '123456', '4420000008', 'conductor', 'activo')
ON CONFLICT (correo) DO NOTHING;

-- Clientes
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    rfc VARCHAR(20),
    telefono VARCHAR(20),
    correo VARCHAR(150),
    direccion_principal VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO clientes (nombre, rfc, telefono, correo, direccion_principal, ciudad, estado, codigo_postal)
VALUES
('Juan Pérez López', 'PELJ800101AB1', '4421234567', 'juan.perez@gmail.com', 'Av. Constituyentes 123', 'Querétaro', 'Querétaro', '76000'),

('María González Ruiz', 'GORM850202CD2', '4422345678', 'maria.gonzalez@gmail.com', 'Calle Hidalgo 456', 'Querétaro', 'Querétaro', '76100'),

('Carlos Hernández Soto', 'HESC900303EF3', '4423456789', 'carlos.hernandez@gmail.com', 'Av. Zaragoza 789', 'San Juan del Río', 'Querétaro', '76800'),

('Ana Martínez Cruz', 'MACA920404GH4', '4424567890', 'ana.martinez@gmail.com', 'Calle Reforma 321', 'Celaya', 'Guanajuato', '38000'),

('Luis Ramírez Torres', 'RATL950505IJ5', '4425678901', 'luis.ramirez@gmail.com', 'Blvd. Bernardo Quintana 654', 'Querétaro', 'Querétaro', '76120');

-- Paquetes
CREATE TABLE paquetes (
    id_paquete SERIAL PRIMARY KEY,
    codigo_rastreo VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    tipo_contenido VARCHAR(100),
    peso DECIMAL(10,2) NOT NULL,
    volumen DECIMAL(10,2),
    largo DECIMAL(10,2),
    ancho DECIMAL(10,2),
    alto DECIMAL(10,2),
    valor_declarado DECIMAL(10,2),
    tipo_servicio tipo_servicio_enum NOT NULL,
    estado_actual estado_paquete_enum NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO paquetes (codigo_rastreo, descripcion, tipo_contenido, peso, volumen, largo, ancho, alto, valor_declarado, tipo_servicio, estado_actual)
VALUES
('MTZ001', 'Celular Samsung Galaxy', 'Electronica', 0.50, 0.01, 15, 8, 5, 12000, 'express', 'en_transito'),

('MTZ002', 'Documentos legales', 'Documentos', 0.20, 0.005, 30, 25, 2, 500, 'normal', 'registrado'),

('MTZ003', 'Zapatos deportivos', 'Ropa', 1.20, 0.02, 30, 20, 10, 2500, 'economico', 'en_transito'),

('MTZ004', 'Laptop HP', 'Electronica', 2.50, 0.03, 40, 30, 10, 18000, 'express', 'entregado'),

('MTZ005', 'Libros universitarios', 'Libros', 3.00, 0.04, 35, 25, 15, 1500, 'normal', 'en_transito');
-- Envios
CREATE TABLE envios (
    id_envio SERIAL PRIMARY KEY,
    id_cliente_remitente INT NOT NULL,
    id_cliente_destinatario INT NOT NULL,
    direccion_origen VARCHAR(255) NOT NULL,
    direccion_destino VARCHAR(255) NOT NULL,
    ciudad_origen VARCHAR(100) NOT NULL,
    ciudad_destino VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_estimada_entrega TIMESTAMP,
    fecha_entrega_real TIMESTAMP,
    costo_total DECIMAL(10,2) NOT NULL,
    estado_envio estado_envio_enum NOT NULL,

    FOREIGN KEY (id_cliente_remitente)
    REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_cliente_destinatario)
    REFERENCES clientes(id_cliente)
);
INSERT INTO envios (id_cliente_remitente, id_cliente_destinatario, direccion_origen, direccion_destino, ciudad_origen, ciudad_destino, fecha_estimada_entrega, fecha_entrega_real, costo_total, estado_envio)
VALUES
(1, 2, 'Av. Constituyentes 123', 'Calle Hidalgo 456', 'Querétaro', 'Querétaro', NOW() + INTERVAL '1 day', NULL, 150.00, 'en_ruta'),

(2, 3, 'Calle Hidalgo 456', 'Av. Zaragoza 789', 'Querétaro', 'San Juan del Río', NOW() + INTERVAL '2 day', NULL, 200.00, 'pendiente'),

(3, 4, 'Av. Zaragoza 789', 'Calle Reforma 321', 'San Juan del Río', 'Celaya', NOW() + INTERVAL '3 day', NULL, 250.00, 'en_ruta'),

(4, 5, 'Calle Reforma 321', 'Blvd. Bernardo Quintana 654', 'Celaya', 'Querétaro', NOW() + INTERVAL '1 day', NOW(), 300.00, 'entregado'),

(5, 1, 'Blvd. Bernardo Quintana 654', 'Av. Constituyentes 123', 'Querétaro', 'Querétaro', NOW() + INTERVAL '2 day', NULL, 180.00, 'en_ruta');

-- Relación envio-paquete
CREATE TABLE envio_paquete (
    id_envio INT NOT NULL,
    id_paquete INT NOT NULL,
    PRIMARY KEY (id_envio,id_paquete),

    FOREIGN KEY (id_envio)
    REFERENCES envios(id_envio)
    ON DELETE CASCADE,

    FOREIGN KEY (id_paquete)
    REFERENCES paquetes(id_paquete)
    ON DELETE CASCADE
);
INSERT INTO envio_paquete (id_envio, id_paquete)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
-- Rutas
CREATE TABLE rutas (
    id_ruta SERIAL PRIMARY KEY,
    nombre_ruta VARCHAR(150) NOT NULL,
    origen VARCHAR(150) NOT NULL,
    destino VARCHAR(150) NOT NULL,
    distancia_km DECIMAL(10,2) NOT NULL,
    tiempo_estimado VARCHAR(50) NOT NULL,
    tipo_ruta tipo_ruta_enum NOT NULL,
    estado estado_ruta_enum NOT NULL
);

INSERT INTO rutas (nombre_ruta, origen, destino, distancia_km, tiempo_estimado, tipo_ruta, estado)
VALUES
('Ruta-Centro Norte', 'Querétaro Centro', 'Juriquilla', 18.50, '00:45', 'urbana', 'activa'),
('Ruta-Industrial QRO', 'Parque Industrial Benito Juárez', 'El Marqués', 22.30, '00:55', 'urbana', 'activa'),
('Ruta-QRO-SJR', 'Querétaro', 'San Juan del Río', 52.00, '01:10', 'foranea', 'activa'),
('Ruta-QRO-Celaya', 'Querétaro', 'Celaya', 65.00, '01:25', 'foranea', 'activa'),
('Ruta-Aeropuerto', 'Querétaro Centro', 'AIQ', 35.00, '00:50', 'urbana', 'inactiva');

-- Vehiculos
CREATE TABLE vehiculos (
    id_vehiculo SERIAL PRIMARY KEY,
    placa VARCHAR(20) UNIQUE NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    tipo tipo_vehiculo_enum NOT NULL,
    capacidad_peso DECIMAL(10,2) NOT NULL,
    capacidad_volumen DECIMAL(10,2),
    estado estado_vehiculo_enum NOT NULL,
    anio INT NOT NULL,
    kilometraje DECIMAL(10,2)
);

INSERT INTO vehiculos (placa, marca, modelo, tipo, capacidad_peso, capacidad_volumen, estado, anio, kilometraje)
VALUES
('ULL4428', 'Honda', 'Cargo 150', 'moto', 120.00, 0.40, 'disponible', 2022, 18500.00),
('ULL4429', 'Nissan', 'Urvan', 'van', 800.00, 3.80, 'en_ruta', 2009, 60320.00),
('ULL4430', 'Ford', 'Transit', 'van', 1100.00, 5.20, 'disponible', 2023, 27840.00),
('ULL4431', 'Isuzu', 'ELF 400', 'camion', 3500.00, 18.00, 'mantenimiento', 2020, 98500.00),
('ULL4432', 'Italika', 'FT150', 'moto', 110.00, 0.35, 'disponible', 2024, 4200.00);

-- Conductores
CREATE TABLE conductores (
    id_conductor SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    licencia VARCHAR(100) NOT NULL,
    tipo_licencia VARCHAR(50) NOT NULL,
    fecha_contratacion DATE NOT NULL,
    estado estado_usuario NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
);

INSERT INTO conductores (id_usuario, licencia, tipo_licencia, fecha_contratacion, estado)
VALUES
((SELECT id_usuario FROM usuarios WHERE correo = 'conductor@metzvia.com'),'LIC-QRO-2021-001','B', '2021-06-15','activo'),

((SELECT id_usuario FROM usuarios WHERE correo = 'conductor2@metzvia.com'),'LIC-QRO-2022-014','B','2022-02-10','activo'),

((SELECT id_usuario FROM usuarios WHERE correo = 'conductor3@metzvia.com'),'LIC-QRO-2020-087','C','2020-09-01','activo'),

((SELECT id_usuario FROM usuarios WHERE correo = 'conductor4@metzvia.com'),'LIC-QRO-2023-031','B','2023-05-18','activo');

-- Asignaciones
CREATE TABLE asignaciones_ruta (
    id_asignacion SERIAL PRIMARY KEY,
    id_ruta INT NOT NULL,
    id_vehiculo INT NOT NULL,
    id_conductor INT NOT NULL,
    fecha_salida TIMESTAMP NOT NULL,
    fecha_llegada TIMESTAMP,
    estado_asignacion estado_asignacion_enum NOT NULL,

    FOREIGN KEY (id_ruta) REFERENCES rutas(id_ruta),
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id_vehiculo),
    FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor)
);

INSERT INTO asignaciones_ruta (id_ruta, id_vehiculo, id_conductor, fecha_salida, fecha_llegada, estado_asignacion)
VALUES
(1, 2, 1, '2026-03-24 08:00:00', NULL, 'en_proceso'),
(2, 3, 1, '2026-03-24 10:30:00', NULL, 'programada'),
(3, 2, 1, '2026-03-23 07:00:00', '2026-03-23 11:20:00', 'finalizada'),
(4, 3, 1, '2026-03-24 13:00:00', NULL, 'programada'),
(5, 5, 1, '2026-03-22 09:15:00', '2026-03-22 10:05:00', 'finalizada');

-- Envio en ruta
CREATE TABLE envio_ruta (
    id_envio INT NOT NULL,
    id_asignacion INT NOT NULL,
    PRIMARY KEY(id_envio,id_asignacion),

    FOREIGN KEY (id_envio)
    REFERENCES envios(id_envio),

    FOREIGN KEY (id_asignacion)
    REFERENCES asignaciones_ruta(id_asignacion)
);

INSERT INTO envio_ruta (id_envio, id_asignacion)
VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 3),
(5, 4);

-- Tracking
CREATE TABLE tracking (
    id_tracking SERIAL PRIMARY KEY,
    id_paquete INT NOT NULL,
    id_envio INT NOT NULL,
    ubicacion_actual VARCHAR(255) NOT NULL,
    estado_paquete VARCHAR(100) NOT NULL,
    observaciones TEXT,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_paquete) REFERENCES paquetes(id_paquete),
    FOREIGN KEY (id_envio) REFERENCES envios(id_envio)
);

INSERT INTO tracking (id_paquete, id_envio, ubicacion_actual, estado_paquete, observaciones, fecha_hora)
VALUES
(1, 1, 'Centro de distribución Querétaro', 'en_transito', 'Salida a ruta urbana', NOW() - INTERVAL '2 hour'),
(2, 2, 'Sucursal Querétaro Norte', 'registrado', 'Pendiente de recolección', NOW() - INTERVAL '1 hour'),
(3, 3, 'Carretera 57 km 158', 'en_transito', 'Retraso por tráfico', NOW() - INTERVAL '3 hour'),
(4, 4, 'Celaya Centro', 'entregado', 'Entrega completada sin incidencias', NOW() - INTERVAL '30 minute'),
(5, 5, 'Centro logístico Querétaro', 'en_transito', 'Asignación de salida en proceso', NOW() - INTERVAL '45 minute');

-- Historial
CREATE TABLE historial_envio (
    id_historial SERIAL PRIMARY KEY,
    id_envio INT NOT NULL,
    estado VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    observaciones TEXT,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_envio)
    REFERENCES envios(id_envio)
);

INSERT INTO historial_envio (id_envio, estado, ubicacion, observaciones, fecha)
VALUES
(1, 'pendiente', 'Sucursal Querétaro Centro', 'Orden registrada en sistema', NOW() - INTERVAL '6 hour'),
(1, 'en_ruta', 'Centro de distribución Querétaro', 'Unidad asignada y salida confirmada', NOW() - INTERVAL '2 hour'),

(2, 'pendiente', 'Sucursal Querétaro Norte', 'Pendiente de recolección', NOW() - INTERVAL '5 hour'),

(3, 'pendiente', 'San Juan del Río', 'Paquete recibido en ventanilla', NOW() - INTERVAL '9 hour'),
(3, 'en_ruta', 'Carretera 57', 'En tránsito a Celaya', NOW() - INTERVAL '4 hour'),

(4, 'pendiente', 'Celaya Centro', 'Generación de guía', NOW() - INTERVAL '10 hour'),
(4, 'en_ruta', 'Ruta Celaya-Querétaro', 'Traslado sin incidencias', NOW() - INTERVAL '7 hour'),
(4, 'entregado', 'Querétaro', 'Entrega completada al destinatario', NOW() - INTERVAL '1 hour'),
(5, 'pendiente', 'Centro logístico Querétaro', 'Esperando validación de salida', NOW() - INTERVAL '3 hour');

-- Entregas
CREATE TABLE entregas (
    id_entrega SERIAL PRIMARY KEY,
    id_envio INT NOT NULL,
    id_paquete INT NOT NULL,
    id_conductor INT NOT NULL,
    fecha_hora_entrega TIMESTAMP NOT NULL,
    nombre_quien_recibe VARCHAR(150) NOT NULL,
    firma_digital VARCHAR(255),
    evidencia_foto VARCHAR(255),
    estado_entrega estado_entrega_enum NOT NULL,
    motivo_falla TEXT,

    FOREIGN KEY (id_envio) REFERENCES envios(id_envio),
    FOREIGN KEY (id_paquete) REFERENCES paquetes(id_paquete),
    FOREIGN KEY (id_conductor) REFERENCES conductores(id_conductor)
);

INSERT INTO entregas (id_envio, id_paquete, id_conductor, fecha_hora_entrega, nombre_quien_recibe, firma_digital, evidencia_foto, estado_entrega, motivo_falla)
VALUES
(4, 4, 1, NOW() - INTERVAL '1 hour', 'María González Ruiz', 'firma_entrega_004.png', 'foto_entrega_004.jpg', 'exitosa', NULL),
(2, 2, 2, NOW() - INTERVAL '35 minute', 'Domicilio sin recepción', NULL, 'foto_falla_002.jpg', 'fallida', 'No hubo persona para recibir el paquete'),
(1, 1, 3, NOW() - INTERVAL '15 minute', 'Recepción corporativa', 'firma_entrega_001.png', 'foto_entrega_001.jpg', 'exitosa', NULL);

-- Pagos
CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    id_envio INT NOT NULL,
    metodo_pago VARCHAR(100) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago TIMESTAMP NOT NULL,
    estado_pago estado_pago_enum NOT NULL,
    referencia VARCHAR(150),

    FOREIGN KEY (id_envio)
    REFERENCES envios(id_envio)
);

INSERT INTO pagos (id_envio, metodo_pago, monto, fecha_pago, estado_pago, referencia)
VALUES
(1, 'tarjeta', 150.00, NOW() - INTERVAL '2 day', 'pagado', 'TXN-ENV001-20260322'),
(2, 'efectivo', 250.00, NOW() - INTERVAL '3 hour', 'pagado', 'EFE-ENV003-20260324'),
(3, 'tarjeta', 300.00, NOW() - INTERVAL '5 hour', 'pagado', 'TXN-ENV004-20260324'),
(4, 'tarjeta', 180.00, NOW() - INTERVAL '30 minute', 'rechazado', 'TXN-ENV005-20260324');

-- Incidencias
CREATE TABLE incidencias (
    id_incidencia SERIAL PRIMARY KEY,
    id_envio INT NOT NULL,
    id_paquete INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_incidencia tipo_incidencia_enum NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_reporte TIMESTAMP NOT NULL,
    estado estado_incidencia_enum NOT NULL,

    FOREIGN KEY (id_envio) REFERENCES envios(id_envio),
    FOREIGN KEY (id_paquete) REFERENCES paquetes(id_paquete),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

INSERT INTO incidencias (id_envio, id_paquete, id_usuario, tipo_incidencia, descripcion, fecha_reporte, estado)
VALUES
(3, 3, 2, 'retraso', 'Tráfico rumbo a la salida de Celaya.', NOW() - INTERVAL '5 hour', 'en_proceso'),
(5, 5, 2, 'dano', 'Caja con golpe lateral detectado en el centro logístico.', NOW() - INTERVAL '2 hour', 'abierta'),
(2, 2, 1, 'perdida', 'Sobre no localizado.', NOW() - INTERVAL '1 day', 'cerrada'),
(1, 1, 3, 'retraso', 'Reprogramación de ruta por cierre vial.', NOW() - INTERVAL '90 minute', 'abierta');

-- Mantenimientos
CREATE TABLE mantenimientos (
    id_mantenimiento SERIAL PRIMARY KEY,
    id_vehiculo INT NOT NULL,
    tipo_mantenimiento VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    costo DECIMAL(10,2) NOT NULL,
    proximo_servicio_km DECIMAL(10,2),

    FOREIGN KEY (id_vehiculo)
    REFERENCES vehiculos(id_vehiculo)
);

INSERT INTO mantenimientos (id_vehiculo, tipo_mantenimiento, descripcion, fecha, costo, proximo_servicio_km)
VALUES
(2, 'Preventivo', 'Cambio de aceite y revisión de frenos.', CURRENT_DATE - INTERVAL '30 day', 2450.00, 65000.00),
(4, 'Correctivo', 'Sustitución de balatas y ajuste de suspensión.', CURRENT_DATE - INTERVAL '10 day', 7800.00, 105000.00),
(5, 'Preventivo', 'Afinación general y cambio de bujía.', CURRENT_DATE - INTERVAL '15 day', 950.00, 9000.00);

-- Notificaciones
CREATE TABLE notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN NOT NULL DEFAULT FALSE,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
);

INSERT INTO notificaciones (id_usuario, titulo, mensaje, leida, fecha)
VALUES
(1, 'Resumen diario', 'Se generó el resumen operativo del día.', TRUE, NOW() - INTERVAL '1 day'),
(2, 'Nueva incidencia', 'Se registró una incidencia en el envío #5.', FALSE, NOW() - INTERVAL '5 hour'),
(3, 'Ruta asignada', 'Tienes una nueva asignación para la Ruta Centro Norte.', FALSE, NOW() - INTERVAL '3 hour'),
(4, 'Envío actualizado', 'Tu envío MTZ004 fue entregado exitosamente.', TRUE, NOW() - INTERVAL '2 hour'),
(5, 'Pago rechazado', 'Tu pago del envío #5 fue rechazado.', FALSE, NOW() - INTERVAL '30 minute');

-- Centros logísticos
CREATE TABLE centros_logisticos (
    id_centro SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    capacidad_paquetes INT NOT NULL,
    estado_operacion estado_operacion_enum NOT NULL
);

INSERT INTO centros_logisticos (nombre, direccion, ciudad, estado, capacidad_paquetes, estado_operacion)
VALUES
('Centro de distribución Querétaro', 'Av. Pie de la Cuesta 1200', 'Querétaro', 'Querétaro', 12000, 'activo'),
('Sucursal Querétaro Norte', 'Av. del Sol 245', 'Querétaro', 'Querétaro', 8000, 'activo'),
('Celaya Centro', 'Blvd. Adolfo López Mateos 890', 'Celaya', 'Guanajuato', 9000, 'activo'),
('Centro logístico Querétaro', 'Calle 5 de Mayo 45', 'Querétaro', 'Querétaro', 1500, 'inactivo');