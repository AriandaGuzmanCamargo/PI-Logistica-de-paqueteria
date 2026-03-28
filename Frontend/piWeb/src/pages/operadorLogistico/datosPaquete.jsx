import React, { useEffect } from 'react';
import MenuOperador from './menuOperador.jsx';

export default function DatosPaquete() {

  useEffect(() => {
    const botonGuardar = document.getElementById('boton-guardar');
        const modalExito = document.getElementById('modal-exito');
        const botonAceptar = document.getElementById('boton-aceptar');
        const guiaGenerada = document.getElementById('guia-generada');
    
        function construirGuia() {
          const numero = Math.floor(10000000 + Math.random() * 90000000);
          return `PAK${numero}`;
        }
    
        botonGuardar.addEventListener('click', () => {
          const guia = construirGuia();
          guiaGenerada.textContent = guia;
          modalExito.classList.remove('modal-exito--oculto');
        });
    
        botonAceptar.addEventListener('click', () => {
          const guia = guiaGenerada.textContent;
          window.location.href = `/operador/envios?registro=ok&guia=${encodeURIComponent(guia)}`;
        });
  }, []);
  return (
    <>
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
          <section className="bloque-registro">
            <h3 className="bloque-registro__titulo">Datos del Paquete</h3>

            <div className="grupo-campos grupo-campos--cuatro">
              <label>
                Peso (kg)
                <input type="number" defaultValue="1" />
              </label>
              <label>
                Largo (cm)
                <input type="number" defaultValue="20" />
              </label>
              <label>
                Ancho (cm)
                <input type="number" defaultValue="15" />
              </label>
              <label>
                Alto (cm)
                <input type="number" defaultValue="10" />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Valor Declarado
                <input type="text" placeholder="Ingrese monto..." />
              </label>
              <label>
                Guía (opcional)
                <input type="text" placeholder="Ingresar observaciones..." />
              </label>
            </div>

            <div className="checks-linea">
              <label className="check-item"><input type="checkbox" /> ¿Es frágil?</label>
              <label className="check-item"><input type="checkbox" /> ¿Requiere seguro?</label>
            </div>
          </section>

          <section className="bloque-registro bloque-registro--secundario">
            <h3 className="bloque-registro__titulo">Información Logística</h3>

            <div className="subbloque">
              <p className="campo-titulo">Tipo de Servicio</p>
              <div className="opciones-linea">
                <label className="radio-item"><input type="radio" name="servicio" defaultChecked /> Normal</label>
                <label className="radio-item"><input type="radio" name="servicio" /> Exprés</label>
                <label className="radio-item"><input type="radio" name="servicio" /> Mismo día</label>
              </div>
            </div>

            <div className="subbloque grupo-campos grupo-campos--dos">
              <label>
                Fecha programada de envío
                <input type="date" defaultValue="2026-03-05" />
              </label>
              <label>
                Repartidor asignado
                <select>
                  <option>Seleccionar repartidor...</option>
                  <option>Javier Torres</option>
                  <option>Juan Morales</option>
                  <option>Miguel López</option>
                </select>
              </label>
            </div>

            <div className="subbloque grupo-campos grupo-campos--dos">
              <label>
                Ruta asignada
                <select>
                  <option>Seleccionar ruta...</option>
                  <option>CDMX-015</option>
                  <option>CDMX-030</option>
                  <option>QRO-018</option>
                </select>
              </label>
              <label>
                Centro de distribución origen
                <select>
                  <option>CDMX-CD01</option>
                  <option>CDMX-CD02</option>
                </select>
              </label>
            </div>
          </section>
        </article>

        <div className="acciones-formulario">
          <a href="/operador/registrar-paquete" className="boton-secundario">Cancelar</a>
          <button type="button" className="boton-primario boton-primario--texto" id="boton-guardar">Guardar</button>
        </div>
      </section>
    </main>
  </div>

  <div className="modal-exito modal-exito--oculto" id="modal-exito" role="dialog" aria-modal="true" aria-labelledby="titulo-exito">
    <div className="modal-exito__tarjeta">
      <div className="modal-exito__check">✓</div>
      <h2 id="titulo-exito">¡Paquete Registrado!</h2>
      <p>El paquete se ha registrado exitosamente con el número de guía <strong id="guia-generada">PAK00000000</strong>.</p>
      <div className="modal-exito__acciones">
        <button type="button" className="boton-primario boton-primario--texto" id="boton-aceptar">Aceptar</button>
      </div>
    </div>
  </div>
  </>
  );
}
