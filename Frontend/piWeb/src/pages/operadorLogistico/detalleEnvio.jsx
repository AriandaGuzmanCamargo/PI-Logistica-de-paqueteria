import React, { useEffect, useMemo, useState } from 'react';
import MenuOperador from './menuOperador.jsx';
import {
	asignarEnvioConConductor,
	estadoEnvioClase,
	estadoEnvioTexto,
	getConductoresDisponibles,
	getDetalleEnvio,
} from '../../services/operadorService';

export default function DetalleEnvio() {
	const [envio, setEnvio] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [availableDrivers, setAvailableDrivers] = useState([]);
	const [selectedDriverId, setSelectedDriverId] = useState('');
	const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);
	const [isAssigning, setIsAssigning] = useState(false);

	const idEnvio = useMemo(() => {
		const params = new URLSearchParams(window.location.search);
		return params.get('id');
	}, []);

	useEffect(() => {
		let isMounted = true;

		async function loadDetalle() {
			try {
				setLoading(true);
				setError('');
				if (!idEnvio) {
					throw new Error('No se envió id de envío en la URL.');
				}
				const data = await getDetalleEnvio(idEnvio);
				if (isMounted) {
					setEnvio(data);
				}
			} catch (loadError) {
				if (isMounted) {
					setError(loadError.message || 'No se pudo cargar el detalle.');
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
	}, [idEnvio]);

	const guia = envio?.paquete?.codigo_rastreo || (envio ? `ENV-${envio.id_envio}` : '---');
	const conductorAsignado = envio?.asignacion?.conductor_nombre || 'Sin asignar';
	const fechaAsignacion = useMemo(() => {
		if (!envio) {
			return null;
		}

		const sourceDate = envio.fecha_estimada_entrega || envio.fecha_creacion;
		if (!sourceDate) {
			return null;
		}

		return new Date(sourceDate).toISOString().slice(0, 10);
	}, [envio]);

	useEffect(() => {
		let isMounted = true;

		async function loadAvailableDrivers() {
			if (!envio || envio.asignacion || !fechaAsignacion) {
				setAvailableDrivers([]);
				setSelectedDriverId('');
				return;
			}

			try {
				setIsLoadingDrivers(true);
				const drivers = await getConductoresDisponibles(fechaAsignacion);
				if (isMounted) {
					setAvailableDrivers(drivers);
					if (drivers.length > 0) {
						setSelectedDriverId(String(drivers[0].id_conductor));
					}
				}
			} catch (_error) {
				if (isMounted) {
					setAvailableDrivers([]);
				}
			} finally {
				if (isMounted) {
					setIsLoadingDrivers(false);
				}
			}
		}

		loadAvailableDrivers();

		return () => {
			isMounted = false;
		};
	}, [envio, fechaAsignacion]);

	async function handleAssignDriver() {
		if (!envio?.id_envio || !selectedDriverId || !fechaAsignacion) {
			return;
		}

		try {
			setIsAssigning(true);
			setError('');

			await asignarEnvioConConductor({
				idEnvio: envio.id_envio,
				idConductor: Number(selectedDriverId),
				fechaAsignacion,
			});

			const refreshed = await getDetalleEnvio(envio.id_envio);
			setEnvio(refreshed);
		} catch (assignError) {
			setError(assignError.message || 'No se pudo asignar el conductor.');
		} finally {
			setIsAssigning(false);
		}
	}

  return (
    <div className="tablero-operador tablero-operador--sin-sidebar">

		<div id="menuContainer" className="menu-overlay"><MenuOperador /></div>
		<div id="menuBackdrop" className="menu-overlay__backdrop"></div>

		<main className="panel-principal panel-principal--full">
			<header className="barra-superior barra-superior--con-logo">
				<div className="barra-superior__left">
					<button id="btnMenu" className="btn-menu-hamburguesa" aria-label="Abrir menú">
						<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
					</button>
					<div className="header-logo">
						<img src="/piWeb/images/logoSinFondo.png" alt="Metzvia" />
					</div>
					<h1 className="barra-superior__titulo">Operador logístico</h1>
				</div>
			</header>

			<h2 className="titulo-pagina-operador">Detalles del Envío</h2>

			<section className="modulo-detalle">
				<div className="miga-detalle"><span className="miga-detalle__icono">◘</span> Envíos <span className="miga-detalle__separador">/</span> Detalles del Envío</div>
				<h2 className="titulo-detalle">Envío ID: <strong>{guia}</strong></h2>

				{error ? <p style={{ color: '#b71c1c' }}>{error}</p> : null}

				{loading ? (
					<div className="detalle-loading">
						<span className="ui-spinner" aria-hidden="true"></span>
						<p>Cargando detalle del envío...</p>
					</div>
				) : null}

				<div className="detalle-grid" style={{ display: loading ? 'none' : 'grid' }}>
					<div className="detalle-columna">
						<article className="tarjeta-detalle">
							<h3>Información del Paquete</h3>
							<div className="info-lista">
								<p><span>Peso:</span> {envio?.paquete?.peso ?? '-'} kg</p>
								<p><span>Dimensiones:</span> {envio?.paquete ? `${envio.paquete.largo ?? '-'} x ${envio.paquete.ancho ?? '-'} x ${envio.paquete.alto ?? '-'} cm` : '-'}</p>
							</div>
							<div className="info-lista">
								<p><span>Tipo:</span> {envio?.paquete?.tipo_contenido || '-'}</p>
								<p><span>Servicio:</span> {envio?.paquete?.tipo_servicio || '-'}</p>
							</div>
						</article>

						<article className="tarjeta-detalle">
							<h3>Destinatario</h3>
							<div className="info-lista info-lista--dos-columnas">
								<p><span>Nombre Completo/Razón Social:</span> {envio?.destinatario?.nombre || '-'}</p>
								<p><span>Teléfono:</span> {envio?.destinatario?.telefono || '-'}</p>
								<p><span>Dirección destino:</span> {envio?.direccion_destino || '-'}</p>
								<p><span>Ciudad destino:</span> {envio?.ciudad_destino || '-'}</p>
								<p><span>Correo:</span> {envio?.destinatario?.correo || '-'}</p>
							</div>
						</article>
					</div>

					<div className="detalle-columna">
						<article className="tarjeta-detalle">
							<h3>Remitente</h3>
							<div className="repartidor">
								<img src="/piWeb/images/usuario.png" alt="Repartidor" className="repartidor__foto" />
								<div className="repartidor__datos">
									<p className="repartidor__nombre">{envio?.remitente?.nombre || '-'} <span className="repartidor__estado"></span></p>
									<p>{envio?.remitente?.telefono || '-'}</p>
									<p>{envio?.remitente?.correo || '-'}</p>
								</div>
							</div>
						</article>

						<article className="tarjeta-detalle">
							<h3>Información de Envío</h3>
							<div className="info-lista">
								<p><span>Estado:</span> <span className={`estado ${estadoEnvioClase(envio?.estado_envio)}`}>● {estadoEnvioTexto(envio?.estado_envio)}</span> <strong className="hora">{envio?.fecha_creacion ? new Date(envio.fecha_creacion).toLocaleString() : '-'}</strong></p>
								<p><span>Conductor:</span> {conductorAsignado}</p>
								{!envio?.asignacion ? (
									<p>
										<span>Asignar:</span>{' '}
										<select
											value={selectedDriverId}
											onChange={(e) => setSelectedDriverId(e.target.value)}
											disabled={isLoadingDrivers || isAssigning}
										>
											<option value="">{isLoadingDrivers ? 'Cargando...' : 'Seleccionar conductor'}</option>
											{availableDrivers.map((driver) => (
												<option key={driver.id_conductor} value={String(driver.id_conductor)}>
													{driver.nombre}
												</option>
											))}
										</select>
										<button
											type="button"
											className="boton-detalles"
											style={{ marginLeft: '8px' }}
											onClick={handleAssignDriver}
											disabled={!selectedDriverId || isAssigning || availableDrivers.length === 0}
										>
											{isAssigning ? 'Asignando...' : 'Asignar'}
										</button>
									</p>
								) : null}
								<p><span>Costo total:</span> ${envio?.costo_total ?? '-'}</p>
								<p><span>Origen:</span> {envio?.direccion_origen || '-'} ({envio?.ciudad_origen || '-'})</p>
								<p><span>Destino:</span> {envio?.direccion_destino || '-'} ({envio?.ciudad_destino || '-'})</p>
								<p><span>Entrega estimada:</span> {envio?.fecha_estimada_entrega ? new Date(envio.fecha_estimada_entrega).toLocaleString() : '-'}</p>
							</div>
						</article>

						<article className="tarjeta-detalle tarjeta-detalle--acciones">
							<a className="boton-volver" href="/operador/envios">Volver</a>
						</article>
					</div>
				</div>
			</section>
		</main>
	</div>
  );
}
