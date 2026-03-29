import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOperador from './menuOperador.jsx';

export default function RegistrarPaquete() {
  const navigate = useNavigate();
  const [pasoActivo, setPasoActivo] = useState(0);
  const [error, setError] = useState('');
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const [form, setForm] = useState({
    remitente: {
      nombre: '',
      telefono: '',
      correo: '',
      direccion: '',
      ciudad: 'Ciudad de Mexico',
      estado: 'CDMX',
      codigo_postal: '',
    },
    destinatario: {
      nombre: '',
      telefono: '',
      correo: '',
      direccion: '',
      ciudad: 'Ciudad de Mexico',
      estado: 'CDMX',
      codigo_postal: '',
    },
  });

  function updateField(section, field, value) {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  function validateStep(index) {
    if (index === 0) {
      if (!form.remitente.nombre || !form.remitente.direccion || !form.remitente.ciudad) {
        return 'Completa nombre, dirección y ciudad del remitente.';
      }
    }

    if (index === 1) {
      if (!form.destinatario.nombre || !form.destinatario.direccion || !form.destinatario.ciudad) {
        return 'Completa nombre, dirección y ciudad del destinatario.';
      }
    }

    return '';
  }

  function goToStep(index) {
    const validationError = validateStep(pasoActivo);

    if (index > pasoActivo && validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setPasoActivo(index);
  }

  function handleNext() {
    if (pasoActivo === 0) {
      goToStep(1);
      return;
    }

    const validationError = validateStep(1);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSavingDraft(true);

    sessionStorage.setItem('registroEnvioDraft', JSON.stringify(form));
    navigate('/operador/datos-paquete');
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

      <h2 className="titulo-pagina-operador">Registrar Paquete</h2>

      <section className="modulo-registro">
        <article className="tarjeta-formulario-registro">
          <h3>Nuevo Envío</h3>

          <div className="pasos-formulario" role="tablist" aria-label="Pasos de registro">
            <button
              type="button"
              className={`paso-chip ${pasoActivo === 0 ? 'paso-chip--activo' : ''}`}
              data-step-target="remitente"
              onClick={() => goToStep(0)}
            >
              Datos del Remitente
            </button>
            <button
              type="button"
              className={`paso-chip ${pasoActivo === 1 ? 'paso-chip--activo' : ''}`}
              data-step-target="destinatario"
              onClick={() => goToStep(1)}
            >
              Datos del Destinatario
            </button>
          </div>

          <div
            className={`seccion-formulario paso-formulario ${pasoActivo === 0 ? 'paso-formulario--activo' : ''}`}
            data-step="remitente"
          >
            <p className="seccion-formulario__titulo">Datos del Remitente</p>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Nombre Completo / Razón Social
                <input
                  type="text"
                  placeholder="Ingresar nombre..."
                  value={form.remitente.nombre}
                  onChange={(e) => updateField('remitente', 'nombre', e.target.value)}
                />
              </label>
              <label>
                Teléfono
                <input
                  type="tel"
                  placeholder="Ingresar teléfono..."
                  value={form.remitente.telefono}
                  onChange={(e) => updateField('remitente', 'telefono', e.target.value)}
                />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--uno">
              <label>
                Correo Electrónico (opcional)
                <input
                  type="email"
                  placeholder="Ingresar correo..."
                  value={form.remitente.correo}
                  onChange={(e) => updateField('remitente', 'correo', e.target.value)}
                />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Calle y número
                <input
                  type="text"
                  placeholder="Ingresar dirección..."
                  value={form.remitente.direccion}
                  onChange={(e) => updateField('remitente', 'direccion', e.target.value)}
                />
              </label>
              <label>
                Colonia
                <input type="text" placeholder="Ingresar colonia..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--tres">
              <label>
                Ciudad
                <input
                  type="text"
                  value={form.remitente.ciudad}
                  onChange={(e) => updateField('remitente', 'ciudad', e.target.value)}
                />
              </label>
              <label>
                Estado
                <select
                  value={form.remitente.estado}
                  onChange={(e) => updateField('remitente', 'estado', e.target.value)}
                >
                  <option>CDMX</option>
                  <option>Jalisco</option>
                  <option>Nuevo León</option>
                </select>
              </label>
              <label>
                Código postal
                <input
                  type="text"
                  placeholder="Ingresar código postal..."
                  value={form.remitente.codigo_postal}
                  onChange={(e) => updateField('remitente', 'codigo_postal', e.target.value)}
                />
              </label>
            </div>
          </div>

          <div
            className={`seccion-formulario paso-formulario ${pasoActivo === 1 ? 'paso-formulario--activo' : ''}`}
            data-step="destinatario"
          >
            <p className="seccion-formulario__titulo">Datos del Destinatario</p>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Nombre Completo / Razón Social
                <input
                  type="text"
                  placeholder="Ingresar nombre..."
                  value={form.destinatario.nombre}
                  onChange={(e) => updateField('destinatario', 'nombre', e.target.value)}
                />
              </label>
              <label>
                Teléfono
                <input
                  type="tel"
                  placeholder="Ingresar teléfono..."
                  value={form.destinatario.telefono}
                  onChange={(e) => updateField('destinatario', 'telefono', e.target.value)}
                />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--uno">
              <label>
                Correo Electrónico (opcional)
                <input
                  type="email"
                  placeholder="Ingresar correo..."
                  value={form.destinatario.correo}
                  onChange={(e) => updateField('destinatario', 'correo', e.target.value)}
                />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Calle y número
                <input
                  type="text"
                  placeholder="Ingresar dirección..."
                  value={form.destinatario.direccion}
                  onChange={(e) => updateField('destinatario', 'direccion', e.target.value)}
                />
              </label>
              <label>
                Colonia
                <input type="text" placeholder="Ingresar colonia..." />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--tres">
              <label>
                Ciudad
                <input
                  type="text"
                  value={form.destinatario.ciudad}
                  onChange={(e) => updateField('destinatario', 'ciudad', e.target.value)}
                />
              </label>
              <label>
                Estado
                <select
                  value={form.destinatario.estado}
                  onChange={(e) => updateField('destinatario', 'estado', e.target.value)}
                >
                  <option>CDMX</option>
                  <option>Jalisco</option>
                  <option>Nuevo León</option>
                </select>
              </label>
              <label>
                Código postal
                <input
                  type="text"
                  placeholder="Ingresar código postal..."
                  value={form.destinatario.codigo_postal}
                  onChange={(e) => updateField('destinatario', 'codigo_postal', e.target.value)}
                />
              </label>
            </div>
          </div>

          {error ? <p style={{ color: '#b71c1c', marginTop: '12px' }}>{error}</p> : null}
        </article>

        <div className="acciones-formulario">
          <a href="/operador/dashboard" className="boton-secundario">Cancelar</a>
          <button
            type="button"
            className="boton-primario"
            id="boton-siguiente"
            aria-label={pasoActivo === 0 ? 'Ir a destinatario' : 'Finalizar registro'}
            onClick={handleNext}
            disabled={isSavingDraft}
          >
            {pasoActivo === 0 ? '→' : isSavingDraft ? '...' : '✓'}
          </button>
        </div>
      </section>
    </main>
  </div>
  );
}
