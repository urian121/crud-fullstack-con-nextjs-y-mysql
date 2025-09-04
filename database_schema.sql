-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS bd_crud_nextjs_mysql;
USE bd_crud_nextjs_mysql;

-- Eliminar tabla si existe para recrearla
DROP TABLE IF EXISTS contacts;

-- Crear tabla contacts con la estructura correcta
CREATE TABLE contacts (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  profession VARCHAR(100) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  age INT(11) NOT NULL,
  english_level VARCHAR(50) NOT NULL DEFAULT 'Básico',
  photo VARCHAR(250) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo
INSERT INTO contacts (name, profession, gender, age, english_level) VALUES
('Urian Viera', 'Desarrollador', 'Masculino', 28, 'Intermedio'),
('María García', 'Diseñadora', 'Femenino', 25, 'Avanzado'),
('Braudin Laya', 'Analista', 'Masculino', 32, 'Básico');