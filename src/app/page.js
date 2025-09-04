'use client';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

export default function Home() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'nuevo',
      profession: 'Ingeniero de software',
      age: 22,
      gender: 'Masculino',
      photo: null
    },
    {
      id: 2,
      name: 'Luis Noel',
      profession: 'Programador Senior',
      age: 26,
      gender: 'Masculino',
      photo: null
    },
    {
      id: 3,
      name: 'Carlos',
      profession: 'Programador Senior',
      age: 25,
      gender: 'Masculino',
      photo: null
    },
    {
      id: 4,
      name: 'Nuevo Contacto',
      profession: 'Programador Senior',
      age: 29,
      gender: 'Masculino',
      photo: null
    },
    {
      id: 5,
      name: 'Urian Viera',
      profession: 'Programador Senior',
      age: 30,
      gender: 'Masculino',
      photo: null
    },
    {
      id: 6,
      name: 'Uriany',
      profession: 'Programador Senior',
      age: 44,
      gender: 'Femenino',
      photo: null
    }
  ]);

  const handleContactAdded = (newContact) => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };



  return (
    <>
    <Navbar />
    <div className="container py-4">
      <div className="row">
        {/* Formulario de Agregar Contacto */}
        <ContactForm onContactAdded={handleContactAdded} />

        {/* Lista de Contactos */}
        <ContactList contacts={contacts} />
      </div>
    </div>
    </>
  );
}
