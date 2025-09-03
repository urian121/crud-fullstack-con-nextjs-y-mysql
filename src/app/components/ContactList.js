'use client';

export default function ContactList({ contacts }) {
  return (
    <div className="col-md-8">
      <h4 className="mb-0 text-dark fw-bold">Lista de Contactos ({contacts.length})</h4>
      <div className="card-body contacts-scroll" style={{maxHeight: '600px', overflowY: 'auto'}}>
        <div className="row g-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                        <i className="bi bi-person-fill text-muted fs-4"></i>
                      </div>
                    </div>
                    <div className="col-8">
                      <h6 className="mb-1 fw-bold text-dark">{contact.name}</h6>
                      <p className="mb-1 text-muted small">Profesión: {contact.profession}</p>
                      <p className="mb-1 text-muted small">Edad: {contact.age} años</p>
                      <p className="mb-0 text-muted small">Sexo: {contact.gender}</p>
                    </div>
                    <div className="col-3 text-end">
                      <button className="btn btn-success btn-sm me-2">
                        <i className="bi bi-pencil-fill"></i> Editar
                      </button>
                      <button className="btn btn-danger btn-sm">
                        <i className="bi bi-trash-fill"></i> Borrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}