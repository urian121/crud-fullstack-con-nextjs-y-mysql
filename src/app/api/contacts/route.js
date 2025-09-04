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

export async function PUT(request) {
  try {
    const { id, name, profession, gender, age, speaksEnglish } = await request.json();

    if (!id || !name || !profession || !gender || age === undefined) {
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

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID del contacto es requerido'
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