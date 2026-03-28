import React, { useEffect } from 'react';
import MenuOperador from './menuOperador.jsx';

export default function RegistrarPaquete() {

  useEffect(() => {
    const pasos = ['remitente', 'destinatario'];
        let pasoActivo = 0;
    
        const paneles = document.querySelectorAll('.paso-formulario');
        const chips = document.querySelectorAll('.paso-chip');
        const botonSiguiente = document.getElementById('boton-siguiente');
    
        function mostrarPaso(indice) {
          pasoActivo = indice;
    
          paneles.forEach(panel => {
            panel.classList.toggle('paso-formulario--activo', panel.dataset.step === pasos[pasoActivo]);
          });
    
          chips.forEach(chip => {
            chip.classList.toggle('paso-chip--activo', chip.dataset.stepTarget === pasos[pasoActivo]);
          });
    
          botonSiguiente.textContent = pasoActivo === 0 ? '→' : '✓';
          botonSiguiente.setAttribute('aria-label', pasoActivo === 0 ? 'Ir a destinatario' : 'Finalizar registro');
        }
    
        chips.forEach((chip, indice) => {
          chip.addEventListener('click', () => {
            mostrarPaso(indice);
          });
        });
    
        botonSiguiente.addEventListener('click', () => {
          if (pasoActivo === 0) {
            mostrarPaso(1);
            return;
          }
    
          window.location.href = '/operador/datos-paquete';
        });
  }, []);
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

      <section className="modulo-registro">
        <div className="registro-encabezado">
          <span className="registro-encabezado__icono">▣</span>
          <h2>Registrar Paquete</h2>
        </div>

        <article className="tarjeta-formulario-registro">
          <h3>Nuevo Envío</h3>

          <div className="pasos-formulario" role="tablist" aria-label="Pasos de registro">
            <button type="button" className="paso-chip paso-chip--activo" data-step-target="remitente">Datos del Remitente</button>
            <button type="button" className="paso-chip" data-step-target="destinatario">Datos del Destinatario</button>
          </div>

          <div className="seccion-formulario paso-formulario paso-formulario--activo" data-step="remitente">
            <p className="seccion-formulario__titulo">Datos del Remitente</p>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Nombre Completo / Razón Social
                <input type="text" placeholder="Ingresar nombre..." />
              </label>
              <label>
                Teléfono
                <input type="tel" placeholder="Ingresar teléfono..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--uno">
              <label>
                Correo Electrónico (opcional)
                <input type="email" placeholder="Ingresar correo..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Calle y número
                <input type="text" placeholder="Ingresar dirección..." />
              </label>
              <label>
                Colonia
                <input type="text" placeholder="Ingresar colonia..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--tres">
              <label>
                Ciudad
                <input type="text" defaultValue="Ciudad de México" />
              </label>
              <label>
                Estado
                <select>
                  <option>Seleccionar estado...</option>
                  <option>CDMX</option>
                  <option>Jalisco</option>
                  <option>Nuevo León</option>
                </select>
              </label>
              <label>
                Código postal
                <input type="text" placeholder="Ingresar código postal..." />
              </label>
            </div>
          </div>

          <div className="seccion-formulario paso-formulario" data-step="destinatario">
            <p className="seccion-formulario__titulo">Datos del Destinatario</p>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Nombre Completo / Razón Social
                <input type="text" placeholder="Ingresar nombre..." />
              </label>
              <label>
                Teléfono
                <input type="tel" placeholder="Ingresar teléfono..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--uno">
              <label>
                Correo Electrónico (opcional)
                <input type="email" placeholder="Ingresar correo..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Calle y número
                <input type="text" placeholder="Ingresar dirección..." />
              </label>
              <label>
                Colonia
                <input type="text" placeholder="Ingresar colonia..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--tres">
              <label>
                Ciudad
                <input type="text" defaultValue="Ciudad de México" />
              </label>
              <label>
                Estado
                <select>
                  <option>Seleccionar estado...</option>
                  <option>CDMX</option>
                  <option>Jalisco</option>
                  <option>Nuevo León</option>
                </select>
              </label>
              <label>
                Código postal
                <input type="text" placeholder="Ingresar código postal..." />
              </label>
            </div>
          </div>
        </article>

        <div className="acciones-formulario">
          <a href="/operador/dashboard" className="boton-secundario">Cancelar</a>
          <button type="button" className="boton-primario" id="boton-siguiente" aria-label="Siguiente paso">→</button>
        </div>
      </section>
    </main>
  </div>
  );
}
