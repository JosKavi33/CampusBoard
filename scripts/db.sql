CREATE DATABASE CAMPUSBOARD;
USE  CAMPUSBOARD;
CREATE TABLE estado (
    id_estado INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_estado VARCHAR(30) NOT NULL
);
CREATE TABLE documento (
    id_documento INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_documento VARCHAR(50) NOT NULL
);
CREATE TABLE genero (
    id_genero INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_genero VARCHAR(30) NOT NULL
);
CREATE TABLE rol (
    id_rol INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_rol VARCHAR(20) NOT NULL
);
CREATE TABLE grupo (
    id_grupo INT PRIMARY KEY NOT NULL,
    nombre_grupo VARCHAR(40) NOT NULL
);
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_completo_usuario VARCHAR(120) NOT NULL,
    numero_documento_usuario VARCHAR (50) NOT NULL,
    tipo_documento_usuario INT NOT NULL,
    direccion_usuario VARCHAR(100) NOT NULL,
    edad_usuario INT (3) NOT NULL,
    genero_usuario INT NOT NULL,
    FOREIGN KEY (genero_usuario) REFERENCES genero(id_genero),
    FOREIGN KEY (tipo_documento_usuario) REFERENCES documento(id_documento)
);
CREATE TABLE telefono (
    id_telefono INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    numero_telefono VARCHAR(15) NOT NULL,
    usuario_telefono INT NOT NULL,
    FOREIGN KEY (usuario_telefono) REFERENCES usuario(id_usuario)
);
CREATE TABLE email (
    id_email INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_email VARCHAR(50) NOT NULL,
    usuario_email INT NOT NULL,
    FOREIGN KEY (usuario_email) REFERENCES usuario(id_usuario)
);
CREATE TABLE tareas (
    id_tarea INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tarea_asignada VARCHAR(80) NOT NULL,
    estado_tarea INT NOT NULL,
    tiempo_inicio DATE NOT NULL,
    tiempo_entrega DATE NOT NULL,
    FOREIGN KEY (estado_tarea) REFERENCES estado(id_estado)
);
CREATE TABLE proyecto (
    id_proyecto INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_proyecto VARCHAR(20) NOT NULL,
    estado_proyecto INT NOT NULL,
    tiempo_inicio_proyecto DATE NOT NULL,
    tiempo_entrega_proyecto DATE NOT NULL,
    FOREIGN KEY (estado_proyecto) REFERENCES estado(id_estado)
);
CREATE TABLE proyecto_usuario (
    id_proyecto_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_proyecto INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_proyecto) REFERENCES proyecto(id_proyecto),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
CREATE TABLE tarea_usuario (
    id_tarea_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_tarea INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
CREATE TABLE grupo_usuario (
    id_grupo_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_grupo INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
CREATE TABLE rol_usuario (
    id_rol_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_rol INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Inserts para la tabla estado
INSERT INTO estado (tipo_estado) VALUES
('Pendiente'),
('En progreso'),
('Completado'),
('Cancelado'),
('Revisión'),
('Aprobado'),
('Rechazado'),
('Entregado'),
('Suspendido'),
('Finalizado');

INSERT INTO documento (tipo_documento) VALUES ('Cédula'),
('Pasaporte'),
('Licencia de conducir'),
('DNI'),
('Carnet de identidad'),
('Visa'),
('Carnet estudiantil'),
('RUC'),
('Tarjeta de crédito'),
('DNI extranjero')
;

INSERT INTO genero (tipo_genero) VALUES
('Masculino'),
('Femenino'),
('No binario'),
('Prefiero no decirlo'),
('Otro');

INSERT INTO rol (nombre_rol) VALUES
('Administrador'),
('Profesor'),
('Estudiante'),
('Coordinador'),
('Invitado'),
('Supervisor'),
('Colaborador'),
('Responsable'),
('Participante'),
('Observador');

INSERT INTO grupo (id_grupo, nombre_grupo) VALUES
(1, 'Grupo A'),
(2, 'Grupo B'),
(3, 'Grupo C'),
(4, 'Grupo D'),
(5, 'Grupo E'),
(6, 'Grupo F'),
(7, 'Grupo G'),
(8, 'Grupo H'),
(9, 'Grupo I'),
(10, 'Grupo J');

INSERT INTO usuario (nombre_completo_usuario, numero_documento_usuario, tipo_documento_usuario ,direccion_usuario, edad_usuario, genero_usuario) VALUES
('Juan Pérez', '1413414', 1,'Calle 123, Ciudad A', 30, 1),
('María Gómez', '343234234', 2,'Avenida 456, Ciudad B', 25, 2),
('Pedro López', '5234232352', 3,'Carrera 789, Ciudad C', 28, 1),
('Laura Torres', '32342342', 4,'Calle 321, Ciudad A', 22, 2),
('Carlos Hernández', '76745745', 5, 'Avenida 654, Ciudad B', 27, 1),
('Ana García', '4234242', 6,'Carrera 987, Ciudad C', 29, 2),
('Luis Martínez', '1231231', 7,'Calle 567, Ciudad A', 26, 1),
('Mónica Rodríguez', '25525225',8, 'Avenida 432, Ciudad B', 24, 2),
('Javier Gutiérrez', '235235252',9, 'Carrera 876, Ciudad C', 31, 1),
('Martha Chávez', '23123141', 10,'Calle 890, Ciudad A', 23, 2);

INSERT INTO telefono (numero_telefono, usuario_telefono) VALUES
('123456789', 1),
('987654321', 2),
('567890123', 3),
('901234567', 4),
('345678901', 5),
('789012345', 6),
('234567890', 7),
('678901234', 8),
('012345678', 9),
('456789012', 10);

INSERT INTO email (nombre_email, usuario_email) VALUES
('juan@example.com', 1),
('maria@example.com', 2),
('pedro@example.com', 3),
('laura@example.com', 4),
('carlos@example.com', 5),
('ana@example.com', 6),
('luis@example.com', 7),
('monica@example.com', 8),
('javier@example.com', 9),
('martha@example.com', 10);

INSERT INTO tareas (tarea_asignada, estado_tarea, tiempo_inicio, tiempo_entrega) VALUES
('Realizar informe', 1, '2023-07-01', '2023-07-10'),
('Revisar diseño', 2, '2023-07-02', '2023-07-12'),
('Desarrollar funcionalidad', 3, '2023-07-03', '2023-07-15'),
('Actualizar base de datos', 1, '2023-07-04', '2023-07-08'),
('Crear presentación', 4, '2023-07-05', '2023-07-20'),
('Ejecutar pruebas', 3, '2023-07-06', '2023-07-18'),
('Configurar servidor', 5, '2023-07-07', '2023-07-14'),
('Planificar reunión', 1, '2023-07-08', '2023-07-11'),
('Resolver incidencias', 3, '2023-07-09', '2023-07-13'),
('Elaborar cronograma', 2, '2023-07-10', '2023-07-16');

INSERT INTO proyecto (nombre_proyecto, estado_proyecto, tiempo_inicio_proyecto, tiempo_entrega_proyecto) VALUES
('Proyecto A', 1, '2023-07-01', '2023-08-15'),
('Proyecto B', 2, '2023-07-05', '2023-08-20'),
('Proyecto C', 1, '2023-07-10', '2023-08-25'),
('Proyecto D', 3, '2023-07-15', '2023-08-30'),
('Proyecto E', 1, '2023-07-20', '2023-09-05'),
('Proyecto F', 2, '2023-07-25', '2023-09-10'),
('Proyecto G', 1, '2023-07-30', '2023-09-15'),
('Proyecto H', 4, '2023-08-01', '2023-09-20'),
('Proyecto I', 1, '2023-08-05', '2023-09-25'),
('Proyecto J', 3, '2023-08-10', '2023-09-30');

INSERT INTO proyecto_usuario (id_proyecto, id_usuario) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 6),
(3, 7),
(4, 8),
(4, 9),
(5, 10);

INSERT INTO tarea_usuario (id_tarea, id_usuario) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(3, 5),
(4, 6),
(5, 7),
(5, 8),
(6, 9),
(7, 10);

INSERT INTO grupo_usuario (id_grupo, id_usuario) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10);

INSERT INTO rol_usuario (id_rol, id_usuario) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);









