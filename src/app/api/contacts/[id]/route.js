import { NextResponse } from 'next/server'; // Importando NextResponse para manejar respuestas HTTP
import { query } from '../../lib/db'; // Importando la función query para ejecutar consultas en la base de datos

/**
 * Función para obtener un contacto por su ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const contact = await query('SELECT * FROM contacts WHERE id = ?', [id]);
    
    // Si el contacto no existe
    if (contact.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Contacto no encontrado'
      }, { status: 404 });
    }
    
    // Si el contacto existe
    return NextResponse.json({
      success: true,
      contact: contact[0]
    });
    
  } catch (error) {
    console.error('Error al obtener contacto:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * Función para actualizar un contacto por su ID
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, profession, gender, age, speaksEnglish } = await request.json();

    if (!name || !profession || !gender || age === undefined) {
      return NextResponse.json({
        success: false,
        message: 'Todos los campos son requeridos'
      }, { status: 400 });
    }

    // Verificar si el contacto existe
    const existingContact = await query('SELECT id FROM contacts WHERE id = ?', [id]);
    
    if (existingContact.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Contacto no encontrado'
      }, { status: 404 });
    }

    // Convertir speaksEnglish a english_level
    const englishLevel = speaksEnglish ? 'Sí' : 'No';

    // Actualizar el contacto
    await query(
      'UPDATE contacts SET name = ?, profession = ?, gender = ?, age = ?, english_level = ?, updated_at = NOW() WHERE id = ?',
      [name, profession, gender, age, englishLevel, id]
    );

    // Obtener el contacto actualizado
    const updatedContact = await query('SELECT * FROM contacts WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Contacto actualizado exitosamente',
      contact: updatedContact[0]
    });

  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * Función para eliminar un contacto por su ID
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Verificar si el contacto existe
    const existingContact = await query('SELECT id FROM contacts WHERE id = ?', [id]);
    
    if (existingContact.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Contacto no encontrado'
      }, { status: 404 });
    }

    // Eliminar el contacto
    await query('DELETE FROM contacts WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Contacto eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    }, { status: 500 });
  }
}
