'use client'; // Indicar que este componente es un cliente
import { useEffect, useState } from 'react'; // Importar useEffect y useState de React

// Componente para mostrar un modal de confirmación
export default function ConfirmModal({ mostrar, titulo, mensaje, onConfirmar, onCancelar }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (mostrar) {
      setTimeout(() => setMostrarModal(true), 10);
    } else {
      setMostrarModal(false);
    }
  }, [mostrar]);

  const manejarConfirmar = () => {
    setMostrarModal(false);
    setTimeout(() => onConfirmar(), 150);
  };

  const manejarCancelar = () => {
    setMostrarModal(false);
    setTimeout(() => onCancelar(), 150);
  };

  if (!mostrar) return null;

  return (
    <>
      <div className={`modal fade ${mostrarModal ? 'show' : ''}`} tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {titulo}
              </h5>
              <button type="button" className="btn-close" onClick={manejarCancelar}></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">{mensaje}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={manejarCancelar}>
                <i className="bi bi-x-circle me-2"></i>Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={manejarConfirmar}>
                <i className="bi bi-trash3 me-2"></i>Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${mostrarModal ? 'show' : ''}`} onClick={manejarCancelar}></div>
    </>
  );
}