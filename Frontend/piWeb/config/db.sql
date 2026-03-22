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
INSERT INTO usuarios (nombre, apellido, correo, contrasena, telefono, rol, estado)
VALUES 
('Admin', 'Principal', 'admin@metzvia.com', '123456', '4420000001', 'admin', 'activo'),

('Luis', 'Operador', 'operador@metzvia.com', '123456', '4420000002', 'operador', 'activo'),

('Carlos', 'Conductor', 'conductor@metzvia.com', '123456', '4420000003', 'conductor', 'activo'),

('Ana', 'Cliente', 'cliente1@metzvia.com', '123456', '4420000004', 'cliente', 'activo'),

('Maria', 'Cliente', 'cliente2@metzvia.com', '123456', '4420000005', 'cliente', 'activo');
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