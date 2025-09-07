-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-09-2025 a las 00:42:22
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_crud_nextjs_mysql`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `profession` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `english_level` varchar(50) NOT NULL DEFAULT 'Básico',
  `photo` varchar(250) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `profession`, `gender`, `age`, `english_level`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'Urian Viera', 'Desarrollador', 'Masculino', 28, 'Intermedio', NULL, '2025-09-04 00:52:33', '2025-09-04 00:52:33'),
(2, 'María García', 'Diseñadora', 'Femenino', 25, 'Avanzado', NULL, '2025-09-04 00:52:33', '2025-09-04 00:52:33'),
(3, 'Braudin Laya', 'Analista', 'Masculino', 32, 'No', NULL, '2025-09-04 00:52:33', '2025-09-04 03:28:43'),
(6, 'Any', 'Analista de Sistemas', 'Femenino', 28, 'No', NULL, '2025-09-04 03:39:57', '2025-09-04 03:40:18'),
(7, 'Luis', 'Diseñador UX/UI', 'Masculino', 29, 'Avanzado', NULL, '2025-09-04 03:40:10', '2025-09-04 03:40:10'),
(12, 'Ana maria', 'Programador Senior', 'Femenino', 35, 'No', NULL, '2025-09-04 04:12:10', '2025-09-07 22:30:42'),
(15, 'Albelardo Perez', 'Programador Senior', 'Masculino', 29, 'No', NULL, '2025-09-04 04:30:08', '2025-09-04 04:30:15'),
(16, 'Jorge', 'Programador Senior', 'Masculino', 33, 'Sí', NULL, '2025-09-07 22:36:10', '2025-09-07 22:36:22');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
