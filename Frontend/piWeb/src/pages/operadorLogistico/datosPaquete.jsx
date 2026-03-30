import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOperador from './menuOperador.jsx';
import {
  asignarEnvioConConductor,
  cancelarEnvioOperador,
  createEnvioWeb,
  getConductoresDisponibles,
} from '../../services/operadorService';

export default function DatosPaquete() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingConductores, setIsLoadingConductores] = useState(false);
  const [conductores, setConductores] = useState([]);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [guia, setGuia] = useState('PAK00000000');
  const [createdEnvioId, setCreatedEnvioId] = useState(null);
  const [isDeletingRecent, setIsDeletingRecent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    peso: '1',
    largo: '20',
    ancho: '15',
    alto: '10',
    valor_declarado: '',
    descripcion: '',
    tipo_contenido: 'General',
    tipo_servicio: 'normal',
    fecha_asignacion: today,
    id_conductor: '',
    es_fragil: false,
    requiere_seguro: false,
  });

  const draft = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('registroEnvioDraft');
      return raw ? JSON.parse(raw) : null;
    } catch (_error) {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!draft) {
      navigate('/operador/registrar-paquete');
    }
  }, [draft, navigate]);

  useEffect(() => {
    let isMounted = true;

    async function loadConductores() {
      try {
        setIsLoadingConductores(true);
        const data = await getConductoresDisponibles(form.fecha_asignacion);

        if (!isMounted) {
          return;
        }

        setConductores(data);
      } catch (_error) {
        if (!isMounted) {
          return;
        }

        setConductores([]);
      } finally {
        if (isMounted) {
          setIsLoadingConductores(false);
        }
      }
    }

    loadConductores();

    return () => {
      isMounted = false;
    };
  }, [form.fecha_asignacion]);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validateFormData() {
    const peso = Number(form.peso);
    const largo = Number(form.largo) || 0;
    const ancho = Number(form.ancho) || 0;
    const alto = Number(form.alto) || 0;
    const valorDeclarado = Number(form.valor_declarado) || 0;

    // Validar peso
    if (!Number.isFinite(peso) || peso <= 0) {
      return { valid: false, message: 'El peso debe ser un número mayor a 0.' };
    }

    if (peso > 100) {
      return { valid: false, message: 'El peso no puede exceder 100 kg.' };
    }

    // Validar dimensiones
    if (largo < 0 || ancho < 0 || alto < 0) {
      return { valid: false, message: 'Las dimensiones no pueden ser negativas.' };
    }

    // Verificar coherencia de dimensiones
    const tieneDimension = largo > 0 || ancho > 0 || alto > 0;
    if (tieneDimension && (largo === 0 || ancho === 0 || alto === 0)) {
      return { valid: false, message: 'Si ingresas dimensiones, todas debe tener un valor mayor a 0.' };
    }

    // Validar valor declarado
    if (valorDeclarado < 0) {
      return { valid: false, message: 'El valor declarado no puede ser negativo.' };
    }

    if (form.es_fragil && valorDeclarado === 0) {
      return { valid: false, warning: 'Advertencia: El paquete es frágil pero no tiene valor declarado. Se recomienda declarar un valor.' };
    }

    // Evitar redundancia: Descripción no debe ser copia del tipo_contenido
    const descLower = form.descripcion.toLowerCase().trim();
    const tipoLower = form.tipo_contenido.toLowerCase().trim();
    
    if (descLower && descLower === tipoLower) {
      return { valid: false, message: 'La descripción no debe ser idéntica al tipo de contenido. Por favor, proporciona más detalles.' };
    }

    // Si es frágil, recomendar seguro
    if (form.es_fragil && !form.requiere_seguro) {
      return { valid: true, warning: 'Sugerencia: Este paquete es frágil. Considera agregar seguro.' };
    }

    return { valid: true };
  }

  async function handleGuardar() {
    setError('');
    setWarning('');

    if (!draft) {
      setError('Primero captura remitente y destinatario.');
      return;
    }

    // Validar datos del formulario
    const validation = validateFormData();
    
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    if (validation.warning) {
      setWarning(validation.warning);
    }

    const peso = Number(form.peso);

    const payload = {
      remitente: draft.remitente,
      destinatario: draft.destinatario,
      paquete: {
        descripcion: form.descripcion,
        tipo_contenido: form.tipo_contenido,
        peso,
        largo: form.largo ? Number(form.largo) : null,
        ancho: form.ancho ? Number(form.ancho) : null,
        alto: form.alto ? Number(form.alto) : null,
        valor_declarado: form.valor_declarado ? Number(form.valor_declarado) : 0,
        tipo_servicio: form.tipo_servicio,
        es_fragil: form.es_fragil,
        requiere_seguro: form.requiere_seguro,
      },
    };

    try {
      setIsSaving(true);
      const created = await createEnvioWeb(payload);

      if (form.id_conductor) {
        try {
          await asignarEnvioConConductor({
            idEnvio: created.id_envio,
            idConductor: Number(form.id_conductor),
            fechaAsignacion: form.fecha_asignacion,
          });
        } catch (assignError) {
          setWarning(assignError.message || 'El envío se creó, pero no se pudo asignar al conductor seleccionado.');
        }
      }

      const tracking = created?.paquete?.codigo_rastreo || 'SIN-GUIA';
      setGuia(tracking);
      setCreatedEnvioId(created?.id_envio || null);
      setShowModal(true);
      sessionStorage.removeItem('registroEnvioDraft');
    } catch (apiError) {
      setError(apiError.message || 'No se pudo guardar el paquete.');
    } finally {
      setIsSaving(false);
    }
  }

  function handleAceptar() {
    navigate(`/operador/envios?registro=ok&guia=${encodeURIComponent(guia)}`);
  }

  async function handleEliminarRecienAgregado() {
    if (!createdEnvioId || isDeletingRecent) {
      return;
    }

    try {
      setError('');
      setWarning('');
      setIsDeletingRecent(true);
      await cancelarEnvioOperador(createdEnvioId);
      setShowModal(false);
      navigate(`/operador/envios?registro=eliminado&guia=${encodeURIComponent(guia)}`);
    } catch (deleteError) {
      setWarning(deleteError.message || 'No se pudo eliminar el envio recien agregado.');
    } finally {
      setIsDeletingRecent(false);
    }
  }

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

      <h2 className="titulo-pagina-operador">Registrar Paquete</h2>

      <section className="modulo-registro">
        <article className="tarjeta-formulario-registro">
          <section className="bloque-registro">
            <h3 className="bloque-registro__titulo">Datos del Paquete</h3>

            <div className="grupo-campos grupo-campos--cuatro">
              <label>
                Peso (kg)
                <input type="number" value={form.peso} onChange={(e) => updateField('peso', e.target.value)} />
              </label>
              <label>
                Largo (cm)
                <input type="number" value={form.largo} onChange={(e) => updateField('largo', e.target.value)} />
              </label>
              <label>
                Ancho (cm)
                <input type="number" value={form.ancho} onChange={(e) => updateField('ancho', e.target.value)} />
              </label>
              <label>
                Alto (cm)
                <input type="number" value={form.alto} onChange={(e) => updateField('alto', e.target.value)} />
              </label>
            </div>

            <div className="grupo-campos grupo-campos--dos">
              <label>
                Valor Declarado
                <input
                  type="number"
                  placeholder="Ingrese monto..."
                  value={form.valor_declarado}
                  onChange={(e) => updateField('valor_declarado', e.target.value)}
                />
              </label>
              <label>
                Descripción (opcional)
                <input
                  type="text"
                  placeholder="Ingresar descripción..."
                  value={form.descripcion}
                  onChange={(e) => updateField('descripcion', e.target.value)}
                />
              </label>
            </div>

            <div className="checks-linea">
              <label className="check-item">
                <input 
                  type="checkbox" 
                  checked={form.es_fragil}
                  onChange={(e) => updateField('es_fragil', e.target.checked)}
                /> 
                ¿Es frágil?
              </label>
              <label className="check-item">
                <input 
                  type="checkbox" 
                  checked={form.requiere_seguro}
                  onChange={(e) => updateField('requiere_seguro', e.target.checked)}
                /> 
                ¿Requiere seguro?
              </label>
            </div>
          </section>

          <section className="bloque-registro bloque-registro--secundario">
            <h3 className="bloque-registro__titulo">Información Logística</h3>

            <div className="subbloque">
              <p className="campo-titulo">Tipo de Servicio</p>
              <div className="opciones-linea">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="servicio"
                    checked={form.tipo_servicio === 'normal'}
                    onChange={() => updateField('tipo_servicio', 'normal')}
                  />
                  Normal
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="servicio"
                    checked={form.tipo_servicio === 'express'}
                    onChange={() => updateField('tipo_servicio', 'express')}
                  />
                  Exprés
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="servicio"
                    checked={form.tipo_servicio === 'economico'}
                    onChange={() => updateField('tipo_servicio', 'economico')}
                  />
                  Económico
                </label>
              </div>
            </div>

            <div className="subbloque grupo-campos grupo-campos--dos">
              <label>
                Fecha programada de envío
                <input
                  type="date"
                  value={form.fecha_asignacion}
                  onChange={(e) => updateField('fecha_asignacion', e.target.value)}
                />
              </label>
              <label>
                Repartidor asignado
                <select
                  value={form.id_conductor}
                  onChange={(e) => updateField('id_conductor', e.target.value)}
                  disabled={isLoadingConductores}
                >
                  <option value="">
                    {isLoadingConductores
                      ? 'Cargando repartidores...'
                      : 'Seleccionar repartidor...'}
                  </option>
                  {conductores.map((conductor) => (
                    <option key={conductor.id_conductor} value={String(conductor.id_conductor)}>
                      {conductor.nombre}
                    </option>
                  ))}
                </select>
                {!isLoadingConductores && conductores.length === 0 ? (
                  <small style={{ color: '#8a95b3' }}>No hay conductores disponibles en este momento.</small>
                ) : null}
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

        {error ? <p style={{ color: '#b71c1c', marginTop: '10px' }}>{error}</p> : null}
        {warning ? <p style={{ color: '#9a6700', marginTop: '10px' }}>{warning}</p> : null}

        <div className="acciones-formulario">
          <a href="/operador/registrar-paquete" className="boton-secundario">Cancelar</a>
          <button
            type="button"
            className="boton-primario boton-primario--texto"
            id="boton-guardar"
            onClick={handleGuardar}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </section>
    </main>
  </div>

  <div
    className={`modal-exito ${showModal ? '' : 'modal-exito--oculto'}`}
    id="modal-exito"
    role="dialog"
    aria-modal="true"
    aria-labelledby="titulo-exito"
  >
    <div className="modal-exito__tarjeta">
      <div className="modal-exito__check">✓</div>
      <h2 id="titulo-exito">¡Paquete Registrado!</h2>
      <p>
        El paquete se ha registrado exitosamente con el número de guía <strong id="guia-generada">{guia}</strong>.
      </p>
      <div className="modal-exito__acciones">
        <button
          type="button"
          className="boton-secundario"
          onClick={handleEliminarRecienAgregado}
          disabled={isDeletingRecent}
        >
          {isDeletingRecent ? 'Eliminando...' : 'Eliminar envio recien agregado'}
        </button>
        <button
          type="button"
          className="boton-primario boton-primario--texto"
          id="boton-aceptar"
          onClick={handleAceptar}
          disabled={isDeletingRecent}
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
  </>
  );
}
