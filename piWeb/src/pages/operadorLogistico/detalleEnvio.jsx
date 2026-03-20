import React from 'react';
import MenuOperador from './menuOperador.jsx';

export default function DetalleEnvio() {
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
					<h1 className="barra-superior__titulo">Detalle envío</h1>
				</div>
				<div className="barra-superior__perfil">
					<img src="/piWeb/images/usuario.png" alt="Operador" className="barra-superior__avatar" />
					<span className="barra-superior__chevron">▾</span>
				</div>
			</header>

			<section className="modulo-detalle">
				<div className="miga-detalle"><span className="miga-detalle__icono">◘</span> Envíos <span className="miga-detalle__separador">/</span> Detalles del Envío</div>
				<h2 className="titulo-detalle">Detalles del Envío ID: <strong>PAK123456789</strong></h2>

				<div className="detalle-grid">
					<div className="detalle-columna">
						<article className="tarjeta-detalle">
							<h3>Información del Paquete</h3>
							<div className="info-lista">
								<p><span>Peso:</span> 3.5 kg</p>
								<p><span>Dimensiones:</span> 30 x 25 x 15 cm</p>
							</div>
							<div className="info-lista">
								<p><span>¿Es Frágil?</span> No</p>
								<p><span>¿Requiere Seguro?</span> Sí</p>
							</div>
						</article>

						<article className="tarjeta-detalle">
							<h3>Destinatario</h3>
							<div className="info-lista info-lista--dos-columnas">
								<p><span>Nombre Completo/Razón Social:</span> Ana Martínez</p>
								<p><span>Teléfono:</span> +52 55 6789 0123</p>
								<p><span>Calle y Número:</span> Av. Revolución 456</p>
								<p><span>Colonia:</span> Escandón</p>
								<p><span>Ciudad:</span> Ciudad de México</p>
								<p><span>Estado:</span> CDMX</p>
								<p><span>Código Postal:</span> 11800</p>
							</div>
						</article>
					</div>

					<div className="detalle-columna">
						<article className="tarjeta-detalle">
							<h3>Repartidor</h3>
							<div className="repartidor">
								<img src="/piWeb/images/usuario.png" alt="Repartidor" className="repartidor__foto" />
								<div className="repartidor__datos">
									<p className="repartidor__nombre">Juan Pérez <span className="repartidor__estado"></span></p>
									<p>+52 55 9876 5432</p>
									<p>juanperes@email.com</p>
								</div>
							</div>
						</article>

						<article className="tarjeta-detalle">
							<h3>Información de Envío</h3>
							<div className="info-lista">
								<p><span>Estado:</span> <span className="estado estado--pendiente">● Pendiente</span> <strong className="hora">Hoy, 12:45 PM</strong></p>
								<p><span>Prioridad:</span> <span className="prioridad prioridad--expres">□ Exprés</span></p>
								<p><span>Ruta Asignada:</span> CDMX-015</p>
								<p><span>Centro de Distribución:</span> CDMX-CD01</p>
								<p><span>Tipo de Servicio:</span> Exprés</p>
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
