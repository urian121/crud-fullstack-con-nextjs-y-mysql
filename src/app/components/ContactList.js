'use client';
import EditModal from './EditModal';

export default function ContactList({ contacts, loading, eliminarContacto, abrirModalEditar, contactoEditando, cerrarModal, guardarEdicion }) {

   return (
     <>
     <div className="col-md-8">
      <h4 className="mb-0 text-dark fw-bold text-center fs-3 opacity-75 mb-4">Lista de Contactos ({contacts.length})</h4>
       <hr className="mb-4" />
       
      <div className="card-body contacts-scroll" style={{maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden'}}>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2 text-muted">Cargando contactos...</p>
          </div>
        ) : contacts.length === 0 ? (
          <p className="text-center">No hay contactos para mostrar.</p>
        ) : (
        <div className="row g-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="col-12 border-bottom hover-bg-light">
              <div className="row align-items-center mx-3">
                <div className="col-1">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-person-fill text-muted fs-4"></i>
                  </div>
                </div>
                <div className="col-8">
                  <h6 className="mb-1 fw-bold text-dark">{contact.name}</h6>
                  <p className="mb-1 text-muted small">Profesión: {contact.profession}</p>
                  <p className="mb-1 text-muted small">Edad: {contact.age} años</p>
                  <p className="mb-1 text-muted small">Sexo: {contact.gender}</p>
                  <p className="mb-0 text-muted small">Nivel de inglés: {contact.english_level || 'No especificado'}</p>
                </div>
                <div className="col-2 d-flex flex-column ms-auto">
                  <button
                    className="btn btn-warning btn-sm mt-2"
                    onClick={() => abrirModalEditar(contact)}
                  >
                    <i className="bi bi-pen"></i> Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => eliminarContacto(contact.id)}
                  >
                    <i className="bi bi-trash3"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>

    {/* Modal de Edición */}
      <EditModal 
        contactoEditando={contactoEditando}
        cerrarModal={cerrarModal}
        guardarEdicion={guardarEdicion}
      />
     </>
   );
}