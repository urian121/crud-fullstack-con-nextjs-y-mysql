'use client';

export default function ContactForm({ formData, handleInputChange, handleSubmit }) {
  return (
    <div className="col-md-4 border-end">
      <h4 className="mb-0 text-dark fw-bold mb-4 text-center opacity-75">Agregar Contacto</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-muted small">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Profesión */}
          <div className="mb-3">
            <label htmlFor="profession" className="form-label text-muted small">Profesión</label>
            <select
              className="form-select"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione una profesión</option>
              <option value="Ingeniero de software">Ingeniero de software</option>
              <option value="Programador Senior">Programador Senior</option>
              <option value="Diseñador UX/UI">Diseñador UX/UI</option>
              <option value="Analista de Sistemas">Analista de Sistemas</option>
            </select>
          </div>

          {/* Sexo */}
          <div className="mb-3">
            <label className="form-label text-muted small">Sexo</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="masculino"
                  value="Masculino"
                  checked={formData.gender === 'Masculino'}
                  onChange={handleInputChange}
                />
                <label className="form-check-label text-muted small" htmlFor="masculino">
                  Masculino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="femenino"
                  value="Femenino"
                  checked={formData.gender === 'Femenino'}
                  onChange={handleInputChange}
                />
                <label className="form-check-label text-muted small" htmlFor="femenino">
                  Femenino
                </label>
              </div>
            </div>
          </div>

          {/* Edad */}
          <div className="mb-3">
            <label htmlFor="age" className="form-label text-muted small">Edad: {formData.age} años</label>
            <input
              type="range"
              className="form-range"
              id="age"
              name="age"
              min="18"
              max="65"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>

          {/* Habla inglés */}
          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="speaksEnglish"
                name="speaksEnglish"
                checked={formData.speaksEnglish}
                onChange={handleInputChange}
              />
              <label className="form-check-label text-muted small" htmlFor="speaksEnglish">
                ¿Habla inglés?
              </label>
            </div>
            <small className="text-muted">{formData.speaksEnglish ? 'Sí' : 'No'}</small>
          </div>

          {/* Cambiar Foto */}
          <div className="mb-4">
            <label htmlFor="photo" className="form-label text-muted small">Cambiar Foto del empleado</label>
            <input
              type="file"
              className="form-control"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleInputChange}
            />
            <small className="text-muted">Seleccionar archivo | Ningún archivo seleccionado</small>
          </div>

          {/* Botón Guardar */}
          <button type="submit" className="btn btn-success w-100 fw-bold">
            Guardar Contacto
            <i className="bi bi-arrow-right mx-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
}