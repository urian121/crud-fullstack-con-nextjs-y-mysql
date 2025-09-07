# 📋 CRUD Contactos - Next.js & MySQL

Una aplicación web moderna para gestión de contactos desarrollada con Next.js, MySQL y Bootstrap 5. Incluye funcionalidades completas de CRUD (Crear, Leer, Actualizar, Eliminar) con carga de imágenes y una interfaz elegante.

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/refs/heads/master/crud-fullstack-nextjs-mysql.gif)

## ✨ Características

- **CRUD Completo**: Crear, leer, actualizar y eliminar contactos
- **Modales Elegantes**: Confirmación de eliminación y edición con animaciones suaves
- **Interfaz Moderna**: Diseño responsive con Bootstrap 5 y Bootstrap Icons
- **Validación de Formularios**: Validación client-side con React Hook Form
- **API RESTful**: Endpoints optimizados con Next.js App Router
- **Base de Datos MySQL**: Esquema robusto con timestamps automáticos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js** - Framework React con App Router
- **React** - Biblioteca de interfaz de usuario
- **React Hook Form** - Gestión de formularios y validación
- **Bootstrap 5** - Framework CSS para diseño responsive
- **Bootstrap Icons** - Iconografía moderna
- **Axios** - Cliente HTTP para peticiones API

### Backend
- **Next.js API Routes** - Endpoints del servidor
- **MySQL** - Base de datos relacional
- **Node.js** - Entorno de ejecución


## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js
- MySQL

### 1. Clonar el Repositorio
```bash
git clone <https://github.com/urian121/crud-fullstack-con-nextjs-y-mysql.git>
cd crud-fullstack-con-nextjs-y-mysql
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Base de Datos

#### Crear la base de datos e importar el esquema
```bash
    app/api/lib/contacts.sql
```

### 4. Ejecutar el Proyecto
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`


## 🎯 Funcionalidades Principales

### Gestión de Contactos
- ✅ Agregar nuevos contactos con foto
- ✅ Visualizar lista de contactos
- ✅ Editar información existente
- ✅ Eliminar contactos con confirmación
- ✅ Carga y actualización de imágenes

### Interfaz de Usuario
- ✅ Diseño responsive para móviles y desktop
- ✅ Modales con animaciones suaves
- ✅ Validación de formularios en tiempo real
- ✅ Feedback visual para acciones del usuario
- ✅ Iconografía consistente

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## 📝 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/contacts` | Obtener todos los contactos |
| POST | `/api/contacts` | Crear nuevo contacto |
| GET | `/api/contacts/[id]` | Obtener un contacto por ID |
| PUT | `/api/contacts/[id]` | Actualizar contacto existente |
| DELETE | `/api/contacts/[id]` | Eliminar contacto |


## 🙌 Cómo puedes apoyar 📢:

✨ **Comparte este proyecto** con otros desarrolladores para que puedan beneficiarse 📢.

☕ **Invítame un café o una cerveza 🍺**:
   - [Paypal](https://www.paypal.me/iamdeveloper86) (`iamdeveloper86@gmail.com`).

### ⚡ ¡No olvides SUSCRIBIRTE a la [Comunidad WebDeveloper](https://www.youtube.com/WebDeveloperUrianViera?sub_confirmation=1)!


#### ⭐ **Déjanos una estrella en GitHub**:
   - Dicen que trae buena suerte 🍀.
**Gracias por tu apoyo 🤓.**
