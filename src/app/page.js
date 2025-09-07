'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ConfirmModal from './components/ConfirmModal';
import useToast from '@/app/hooks/useToast';

export default function Home() {
  const [contacts, setContacts] = useState([]); // Estado para almacenar la lista de contactos
  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando
  const [contactoEditando, setContactoEditando] = useState(null); // Estado para almacenar el contacto que se está editando
  const [mostrarConfirmModal, setMostrarConfirmModal] = useState(false); // Estado para mostrar el modal de confirmación
  const [contactoAEliminar, setContactoAEliminar] = useState(null); // Estado para almacenar el contacto que se está eliminando
  const toast = useToast(); // Hook para mostrar notificaciones

  // Cargar contactos desde la API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contacts');
      setContacts(response.data.contacts || []); // Actualizar la lista de contactos
    } catch (error) {
      toast.error("Error al cargar contactos");
      setContacts([]); // Limpiar la lista de contactos
    } finally {
      setLoading(false); // Indicar que se ha completado la carga
    }
  };

  // Cargar contactos al montar el componente
  useEffect(() => {
    fetchContacts();
  }, []);

  // Manejar el evento de agregar un nuevo contacto
  const handleContactAdded = (newContact) => {
    // Recargar la lista completa desde la API
    fetchContacts();
  };

  // Manejar el evento de eliminar un contacto
  const abrirModalEliminar = (id) => {
    setContactoAEliminar(id);
    setMostrarConfirmModal(true);
  };

  // Manejar el evento de cerrar el modal de eliminación
  const cerrarModalEliminar = () => {
    setMostrarConfirmModal(false);
    setContactoAEliminar(null);
  };

  // Manejar el evento de confirmar la eliminación
  const confirmarEliminacion = async () => {
    if (contactoAEliminar) {
      try {
        const response = await axios.delete(`/api/contacts/${contactoAEliminar}`);
        if (response.data.success) {
          toast.success("Contacto eliminado exitosamente");
          fetchContacts();
        } else {
          toast.error('Error al eliminar el contacto: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error al eliminar contacto:', error);
        toast.error('Error al eliminar el contacto: ' + (error.response?.data?.message || error.message));
      }
    }
    cerrarModalEliminar();
  };

  // Manejar el evento de abrir el modal de edición
  const abrirModalEditar = (contact) => {
    setContactoEditando({
      ...contact,
      speaksEnglish: contact.english_level === 'Sí' || contact.english_level === 'Avanzado' || contact.englishLevel === 'Sí' || contact.englishLevel === 'Avanzado'
    });
  };

  // Manejar el evento de cerrar el modal de edición
  const cerrarModal = () => {
    setContactoEditando(null);
  };

  // Manejar el evento de guardar la edición
  const guardarEdicion = async (datosActualizados) => {
    try {
      const { id, ...datos } = datosActualizados;
      const response = await axios.put(`/api/contacts/${id}`, datos);
      if (response.data.success) {
        toast.success('¡Contacto actualizado exitosamente!');
        fetchContacts();
        cerrarModal();
      } else {
        toast.error('Error al actualizar el contacto: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar contacto:', error);
      toast.error('Error al actualizar el contacto: ' + (error.response?.data?.message || error.message));
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
