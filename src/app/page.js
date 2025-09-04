'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar contactos desde la API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contacts');
      setContacts(response.data.contacts || []);
    } catch (error) {
      console.error('Error al cargar contactos:', error);
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



  return (
    <>
    <Navbar />
    <div className="container py-4">
      <div className="row">
        {/* Formulario de Agregar Contacto */}
        <ContactForm onContactAdded={handleContactAdded} />

        {/* Lista de Contactos */}
        <ContactList contacts={contacts} loading={loading} />
      </div>
    </div>
    </>
  );
}
