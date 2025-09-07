import { NextResponse } from 'next/server'; // Importando NextResponse para manejar respuestas HTTP
import { query } from '../lib/db'; // Importando la función query para ejecutar consultas en la base de datos


/**
 * Función para crear un nuevo contacto
 */
export async function POST(request) {
  try {
    const body = await request.json(); // Obteniendo el cuerpo de la solicitud
    const { name, profession, gender, age, speaksEnglish } = body; // Desestructurando el cuerpo de la solicitud

    // Validar campos requeridos
    if (!name || !profession || !gender || age === undefined) {
      return NextResponse.json({
        success: false,
        message: 'Todos los campos son requeridos'
      }, { status: 400 });
    }

    // Determinar nivel de inglés basado en speaksEnglish
    const englishLevel = speaksEnglish ? 'Sí' : 'No';

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

    // Retornando la respuesta
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

/**
 * Función para obtener todos los contactos
 */
export async function GET() {
  try {
    const contacts = await query('SELECT * FROM contacts ORDER BY id DESC');
    
    // Retornando la respuesta
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