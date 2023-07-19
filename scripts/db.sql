CREATE DATABASE CAMPUSBOARD;
DROP DATABASE CAMPUSBOARD;
USE  CAMPUSBOARD;
CREATE TABLE estado(
    id_estado INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_estado VARCHAR(30) NOT NULL
);
CREATE TABLE documento(
    id_documento INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_documento VARCHAR(30) NOT NULL
);
CREATE TABLE genero(
    id_genero INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tipo_genero VARCHAR(30) NOT NULL
);
CREATE TABLE rol (
    id_rol INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre_rol VARCHAR(20) NOT NULL
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
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    rol_usuario INT NOT NULL,
    tarea_usuario INT NOT NULL,
    nombre_usuario VARCHAR(20) NOT NULL,
    segundo_nombre_usuario VARCHAR(20) NOT NULL,
    apellido_usuario VARCHAR(20) NOT NULL,
    segundo_apellido_usuario VARCHAR(20) NOT NULL,
    telefono_usuario VARCHAR(15),
    email_usuario VARCHAR(20) NOT NULL,
    edad_usuario INT NOT NULL,
    tipodoc_usuario INT NOT NULL,
    genero_usuario INT NOT NULL,
    FOREIGN KEY (rol_usuario) REFERENCES rol(id_rol),
    FOREIGN KEY (tarea_usuario) REFERENCES tareas(id_tarea),
    FOREIGN KEY (tipodoc_usuario) REFERENCES documento(id_documento),
    FOREIGN KEY (genero_usuario) REFERENCES genero(id_genero)
);

CREATE TABLE grupo (
    id_grupo INT PRIMARY KEY NOT NULL,
    desarrollador_grupo INT NOT NULL,
    proyecto_grupo INT NOT NULL,
    FOREIGN KEY (desarrollador_grupo) REFERENCES usuario(id_usuario),
    FOREIGN KEY (proyecto_grupo) REFERENCES proyecto(id_proyecto)
);

SELECT * FROM estado;

