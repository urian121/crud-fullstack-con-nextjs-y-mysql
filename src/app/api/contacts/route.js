import { NextResponse } from 'next/server';
import { query } from '../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, profession, gender, age, speaksEnglish } = body;

    // Determinar nivel de inglés basado en speaksEnglish
    const englishLevel = speaksEnglish ? 'Avanzado' : 'Básico';

    // Insertar en la base de datos
    const result = await query(
      'INSERT INTO contacts (name, profession, gender, age, english_level) VALUES (?, ?, ?, ?, ?)',
      [name, profession, gender, age, englishLevel]
    );

    // Crear objeto de respuesta con el nuevo contacto
    const newContact = {
      id: result.insertId,
      name,
      profession,
      gender,
      age: parseInt(age),
      englishLevel
    };

    return NextResponse.json({
      success: true,
      message: 'Contacto creado exitosamente',
      contact: newContact
    }, { status: 201 });

  } catch (error) {
    console.error('Error al crear contacto:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await query('SELECT * FROM contacts ORDER BY id DESC');
    
    return NextResponse.json({
      success: true,
      contacts
    });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al obtener contactos',
      error: error.message
    }, { status: 500 });
  }
}