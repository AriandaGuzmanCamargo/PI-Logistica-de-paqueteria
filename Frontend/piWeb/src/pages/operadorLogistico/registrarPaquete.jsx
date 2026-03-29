import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOperador from './menuOperador.jsx';

const ESTADOS_MX = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'CDMX',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

const ESTADO_SUGERENCIAS = {
  'Aguascalientes': { ciudades: ['Aguascalientes'], codigo_postal: '20000' },
  'Baja California': { ciudades: ['Mexicali', 'Tijuana'], codigo_postal: '21000' },
  'Baja California Sur': { ciudades: ['La Paz', 'Los Cabos'], codigo_postal: '23000' },
  'Campeche': { ciudades: ['Campeche'], codigo_postal: '24000' },
  'Chiapas': { ciudades: ['Tuxtla Gutierrez', 'San Cristobal de las Casas'], codigo_postal: '29000' },
  'Chihuahua': { ciudades: ['Chihuahua', 'Ciudad Juarez'], codigo_postal: '31000' },
  'CDMX': { ciudades: ['Ciudad de Mexico', 'Coyoacan', 'Iztapalapa'], codigo_postal: '01000' },
  'Coahuila': { ciudades: ['Saltillo', 'Torreon'], codigo_postal: '25000' },
  'Colima': { ciudades: ['Colima', 'Manzanillo'], codigo_postal: '28000' },
  'Durango': { ciudades: ['Durango', 'Gomez Palacio'], codigo_postal: '34000' },
  'Estado de México': { ciudades: ['Toluca', 'Naucalpan', 'Ecatepec'], codigo_postal: '50000' },
  'Guanajuato': { ciudades: ['Leon', 'Irapuato', 'Guanajuato'], codigo_postal: '36000' },
  'Guerrero': { ciudades: ['Chilpancingo', 'Acapulco'], codigo_postal: '39000' },
  'Hidalgo': { ciudades: ['Pachuca', 'Tulancingo'], codigo_postal: '42000' },
  'Jalisco': { ciudades: ['Guadalajara', 'Zapopan', 'Puerto Vallarta'], codigo_postal: '44100' },
  'Michoacán': { ciudades: ['Morelia', 'Uruapan'], codigo_postal: '58000' },
  'Morelos': { ciudades: ['Cuernavaca', 'Jiutepec'], codigo_postal: '62000' },
  'Nayarit': { ciudades: ['Tepic'], codigo_postal: '63000' },
  'Nuevo León': { ciudades: ['Monterrey', 'Guadalupe', 'San Nicolas'], codigo_postal: '64000' },
  'Oaxaca': { ciudades: ['Oaxaca de Juarez', 'Juchitan'], codigo_postal: '68000' },
  'Puebla': { ciudades: ['Puebla', 'Tehuacan'], codigo_postal: '72000' },
  'Querétaro': { ciudades: ['Queretaro', 'San Juan del Rio'], codigo_postal: '76000' },
  'Quintana Roo': { ciudades: ['Chetumal', 'Cancun'], codigo_postal: '77000' },
  'San Luis Potosí': { ciudades: ['San Luis Potosi', 'Ciudad Valles'], codigo_postal: '78000' },
  'Sinaloa': { ciudades: ['Culiacan', 'Mazatlan'], codigo_postal: '80000' },
  'Sonora': { ciudades: ['Hermosillo', 'Ciudad Obregon'], codigo_postal: '83000' },
  'Tabasco': { ciudades: ['Villahermosa'], codigo_postal: '86000' },
  'Tamaulipas': { ciudades: ['Ciudad Victoria', 'Tampico'], codigo_postal: '87000' },
  'Tlaxcala': { ciudades: ['Tlaxcala'], codigo_postal: '90000' },
  'Veracruz': { ciudades: ['Xalapa', 'Veracruz'], codigo_postal: '91000' },
  'Yucatán': { ciudades: ['Merida', 'Valladolid'], codigo_postal: '97000' },
  'Zacatecas': { ciudades: ['Zacatecas', 'Guadalupe'], codigo_postal: '98000' },
};

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

  function updateEstado(section, estado) {
    setForm((prev) => {
      const current = prev[section];
      const sugerencia = ESTADO_SUGERENCIAS[estado];

      return {
        ...prev,
        [section]: {
          ...current,
          estado,
          ciudad: current.ciudad?.trim() ? current.ciudad : (sugerencia?.ciudades?.[0] || current.ciudad),
          codigo_postal: current.codigo_postal?.trim() ? current.codigo_postal : (sugerencia?.codigo_postal || current.codigo_postal),
        },
      };
    });
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

  const ciudadesRemitente = ESTADO_SUGERENCIAS[form.remitente.estado]?.ciudades || [];
  const ciudadesDestinatario = ESTADO_SUGERENCIAS[form.destinatario.estado]?.ciudades || [];
  const cpRemitenteSugerido = ESTADO_SUGERENCIAS[form.remitente.estado]?.codigo_postal || '';
  const cpDestinatarioSugerido = ESTADO_SUGERENCIAS[form.destinatario.estado]?.codigo_postal || '';

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
                  list="ciudades-remitente"
                  value={form.remitente.ciudad}
                  onChange={(e) => updateField('remitente', 'ciudad', e.target.value)}
                />
                <datalist id="ciudades-remitente">
                  {ciudadesRemitente.map((ciudad) => (
                    <option key={ciudad} value={ciudad} />
                  ))}
                </datalist>
              </label>
              <label>
                Estado
                <select
                  value={form.remitente.estado}
                  onChange={(e) => updateEstado('remitente', e.target.value)}
                >
                  {ESTADOS_MX.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </label>
              <label>
                Código postal
                <input
                  type="text"
                  placeholder={cpRemitenteSugerido ? `Ej. ${cpRemitenteSugerido}` : 'Ingresar código postal...'}
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
                  list="ciudades-destinatario"
                  value={form.destinatario.ciudad}
                  onChange={(e) => updateField('destinatario', 'ciudad', e.target.value)}
                />
                <datalist id="ciudades-destinatario">
                  {ciudadesDestinatario.map((ciudad) => (
                    <option key={ciudad} value={ciudad} />
                  ))}
                </datalist>
              </label>
              <label>
                Estado
                <select
                  value={form.destinatario.estado}
                  onChange={(e) => updateEstado('destinatario', e.target.value)}
                >
                  {ESTADOS_MX.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </label>
              <label>
                Código postal
                <input
                  type="text"
                  placeholder={cpDestinatarioSugerido ? `Ej. ${cpDestinatarioSugerido}` : 'Ingresar código postal...'}
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
