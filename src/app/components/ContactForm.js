'use client'; // Indicar que este componente es un cliente
import { useForm } from 'react-hook-form'; // Importar useForm de react-hook-form
import axios from 'axios'; // Importar axios
import useToast from '@/app/hooks/useToast'; // Importar useToast

// Componente para agregar un nuevo contacto
export default function ContactForm({ onContactAdded }) {
  // Inicializar el formulario con valores por defecto
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      name: '',
      profession: '',
      gender: 'Masculino',
      age: 20,
      speaksEnglish: false
    }
  });
  const toast = useToast();

  // Manejar el evento de submit del formulario
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/contacts', data);
      toast.success('¡Contacto guardado exitosamente!');
      reset(); // Limpiar formulario
      if (onContactAdded) {
        onContactAdded(response.data.contact); // Notificar al componente padre
      }
    } catch (error) {
      toast.error('Error al guardar contacto');
    }
  };

  return (
    <div className="col-md-4">
      <h4 className="mb-0 text-dark fw-bold fs-3 mb-4 text-center opacity-75">Agregar Contacto</h4>
      <hr className="mb-4" />

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-muted small">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              {...register('name', { required: 'El nombre es requerido' })}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="profession" className="form-label text-muted small">Profesión</label>
            <select
              className="form-select"
              id="profession"
              {...register('profession', { required: 'La profesión es requerida' })}
            >
              <option value="">Seleccione una profesión</option>
              <option value="Ingeniero de software">Ingeniero de software</option>
              <option value="Programador Senior">Programador Senior</option>
              <option value="Diseñador UX/UI">Diseñador UX/UI</option>
              <option value="Analista de Sistemas">Analista de Sistemas</option>
            </select>
            {errors.profession && <small className="text-danger">{errors.profession.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label text-muted small">Sexo</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="masculino"
                  value="Masculino"
                  {...register('gender', { required: 'El sexo es requerido' })}
                />
                <label className="form-check-label text-muted small" htmlFor="masculino">
                  Masculino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="femenino"
                  value="Femenino"
                  {...register('gender', { required: 'El sexo es requerido' })}
                />
                <label className="form-check-label text-muted small" htmlFor="femenino">
                  Femenino
                </label>
              </div>
            </div>
            {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label text-muted small">Edad: {watch('age') || 20} años</label>
            <input
              type="range"
              className="form-range"
              id="age"
              min="18"
              max="65"
              defaultValue="20"
              {...register('age')}
            />
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="speaksEnglish"
                {...register('speaksEnglish')}
              />
              <label className="form-check-label text-muted small" htmlFor="speaksEnglish">
                ¿Habla inglés?
              </label>
            </div>
            <small className="text-muted">{watch('speaksEnglish') ? 'Sí' : 'No'}</small>
          </div>

          <button type="submit" className="btn btn-dark w-100 fw-bold">
            Guardar Contacto
            <i className="bi bi-arrow-right mx-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
}