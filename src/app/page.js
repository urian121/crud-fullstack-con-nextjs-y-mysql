'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ConfirmModal from './components/ConfirmModal';
import useToast from '@/app/hooks/useToast';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactoEditando, setContactoEditando] = useState(null);
  const [mostrarConfirmModal, setMostrarConfirmModal] = useState(false);
  const [contactoAEliminar, setContactoAEliminar] = useState(null);
  const toast = useToast();

  // Cargar contactos desde la API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contacts');
      setContacts(response.data.contacts || []);
    } catch (error) {
      toast.error("Error al cargar contactos");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactAdded = (newContact) => {
    // Recargar la lista completa desde la API
    fetchContacts();
  };

  const abrirModalEliminar = (id) => {
    setContactoAEliminar(id);
    setMostrarConfirmModal(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarConfirmModal(false);
    setContactoAEliminar(null);
  };

  const confirmarEliminacion = async () => {
    if (contactoAEliminar) {
      try {
        const response = await axios.delete(`/api/contacts?id=${contactoAEliminar}`);
        if (response.data.success) {
           toast.success("Contacto eliminado exitosamente");
          fetchContacts();
        } else {
          toast.error('Error al eliminar el contacto: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error al eliminar contacto:', error);
      }
    }
    cerrarModalEliminar();
  };

  const abrirModalEditar = (contact) => {
    setContactoEditando({
      ...contact,
      speaksEnglish: contact.english_level === 'Sí'
    });
  };

  const cerrarModal = () => {
    setContactoEditando(null);
  };

  const guardarEdicion = async (datosActualizados) => {
    try {
      const response = await axios.put('/api/contacts', datosActualizados);
      if (response.data.success) {
        toast.success('¡Contacto actualizado exitosamente!');
        fetchContacts();
        cerrarModal();
      } else {
        toast.error('Error al actualizar el contacto: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar contacto:', error);
    }
  };



  return (
    <>
    <Navbar />
    <div className="container py-4">
      <div className="row">
        {/* Formulario de Agregar Contacto */}
        <ContactForm onContactAdded={handleContactAdded} />

        {/* Lista de Contactos */}
        <ContactList 
            contacts={contacts} 
            loading={loading} 
            eliminarContacto={abrirModalEliminar}
            abrirModalEditar={abrirModalEditar}
            contactoEditando={contactoEditando}
            cerrarModal={cerrarModal}
            guardarEdicion={guardarEdicion}
          />
      </div>
    </div>
    
    <ConfirmModal 
      mostrar={mostrarConfirmModal}
      titulo="Confirmar Eliminación"
      mensaje="¿Estás seguro de que deseas eliminar este contacto? Esta acción no se puede deshacer."
      onConfirmar={confirmarEliminacion}
      onCancelar={cerrarModalEliminar}
    />
    </>
  );
}
