CREATE DATABASE CAMPUSBOARD;
DROP DATABASE CAMPUSBOARD;
USE  CAMPUSBOARD;
CREATE TABLE tareas (
    id_tarea INT PRIMARY KEY NOT NULL,
    tarea_asignada VARCHAR(80) NOT NULL,
    tiempo_inicio DATE NOT NULL,
    tiempo_entrega DATE NOT NULL
);

CREATE TABLE estado_de_la_tarea (
    id_estado_tarea INT PRIMARY KEY NOT NULL,
    estado_tarea VARCHAR(30) NOT NULL
);

CREATE TABLE rol (
    id_rol INT PRIMARY KEY NOT NULL,
    nombre_rol VARCHAR(20) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY NOT NULL,
    rol_usu INT NOT NULL,
    tarea_usu INT NOT NULL,
    nombre_usu VARCHAR(20) NOT NULL,
    segundo_nombre_usu VARCHAR(20) NOT NULL,
    apellido_usu VARCHAR(20) NOT NULL,
    segundo_apellido_usu VARCHAR(20) NOT NULL,
    telefono_usu VARCHAR(15),
    email_usu VARCHAR(20) NOT NULL,
    edad_usu INT NOT NULL,
    tipodoc_usu INT NOT NULL,
    genero_usu INT NOT NULL,
    acudiente_usu INT NOT NULL,
    FOREIGN KEY (rol_usu) REFERENCES rol(id_rol),
    FOREIGN KEY (tarea_usu) REFERENCES tareas(id_tarea)
);

CREATE TABLE grupo (
    id_grupo INT PRIMARY KEY NOT NULL,
    lider_grupo INT NOT NULL,
    estado_tarea_lider INT NOT NULL,
    desarrollador_uno INT,
    estado_tarea_desarrollador_uno INT,
    desarrollador_dos INT,
    estado_tarea_desarrollador_dos INT,
    desarrollador_tres INT,
    estado_tarea_desarrollador_tres INT,
    nombre_proyecto INT NOT NULL,
    fecha_entrega_proyecto DATE NOT NULL,
    estado_proyecto INT NOT NULL,
    FOREIGN KEY (lider_grupo) REFERENCES usuario(id_usuario),
    FOREIGN KEY (estado_tarea_lider) REFERENCES estado_de_la_tarea(id_estado_tarea),
    FOREIGN KEY (desarrollador_uno) REFERENCES usuario(id_usuario),
    FOREIGN KEY (estado_tarea_desarrollador_uno) REFERENCES estado_de_la_tarea(id_estado_tarea),
    FOREIGN KEY (desarrollador_dos) REFERENCES usuario(id_usuario),
    FOREIGN KEY (estado_tarea_desarrollador_dos) REFERENCES estado_de_la_tarea(id_estado_tarea),
    FOREIGN KEY (desarrollador_tres) REFERENCES usuario(id_usuario),
    FOREIGN KEY (estado_tarea_desarrollador_tres) REFERENCES estado_de_la_tarea(id_estado_tarea),
    FOREIGN KEY (nombre_proyecto) REFERENCES proyecto(id_proyecto),
    FOREIGN KEY (estado_proyecto) REFERENCES estado_del_proyecto(id_estado_proyecto)
);

CREATE TABLE proyecto (
    id_proyecto INT PRIMARY KEY NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    tiempo_entrega_proyecto DATE NOT NULL
);

CREATE TABLE estado_del_proyecto (
    id_estado_proyecto INT PRIMARY KEY NOT NULL,
    estado_proyecto VARCHAR(20) NOT NULL
);
