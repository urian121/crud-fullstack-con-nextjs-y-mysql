'use client';
import { useForm } from 'react-hook-form'; // Importar useForm de react-hook-form
import { useEffect, useState } from 'react'; // Importar useEffect y useState de React

// Componente para editar un contacto
export default function EditModal({ contactoEditando, cerrarModal, guardarEdicion }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Inicializar el formulario
  const [mostrar, setMostrar] = useState(false); // Estado para mostrar el modal

  // Manejar el evento de submit del formulario
  useEffect(() => {
    if (contactoEditando) {
      reset(contactoEditando); // Resetear el formulario con los datos del contacto a editar
      // Pequeño delay para permitir que el modal se monte antes de mostrar la animación
      setTimeout(() => setMostrar(true), 10);
    } else {
      setMostrar(false);
    }
  }, [contactoEditando, reset]);

  // Manejar el evento de submit del formulario
  const onSubmit = (data) => {
    guardarEdicion({ ...data, id: contactoEditando.id });
  };

  // Manejar el evento de cierre del modal
  const manejarCierre = () => {
    setMostrar(false);
    setTimeout(() => cerrarModal(), 150); // Esperar a que termine la animación
  };

  if (!contactoEditando) return null;

  return (
    <>
      <div className={`modal fade ${mostrar ? 'show' : ''}`} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Contacto</h5>
              <button type="button" className="btn-close" onClick={manejarCierre}></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    {...register('name', { required: 'El nombre es requerido' })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Profesión</label>
                  <input
                    type="text"
                    className={`form-control ${errors.profession ? 'is-invalid' : ''}`}
                    {...register('profession', { required: 'La profesión es requerida' })}
                  />
                  {errors.profession && <div className="invalid-feedback">{errors.profession.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Sexo</label>
                  <select
                    className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                    {...register('gender', { required: 'El sexo es requerido' })}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                  {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Edad</label>
                  <input
                    type="number"
                    className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    min="1"
                    max="120"
                    {...register('age', { 
                      required: 'La edad es requerida',
                      min: { value: 1, message: 'La edad debe ser mayor a 0' },
                      max: { value: 120, message: 'La edad debe ser menor a 120' }
                    })}
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    {...register('speaksEnglish')}
                  />
                  <label className="form-check-label">Habla inglés</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={manejarCierre}>
                  <i className="bi bi-x-circle me-2"></i>Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-circle me-2"></i>Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${mostrar ? 'show' : ''}`} onClick={manejarCierre}></div>
    </>
  );
}