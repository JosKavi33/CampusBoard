
SELECT * FROM tarea_usuario;
SELECT id_usuario, nombre_completo_usuario, numero_documento_usuario, direccion_usuario, edad_usuario, 
documento.tipo_documento AS tipo_documento_usuario,
genero.tipo_genero AS genero_usuario
FROM usuario 
INNER JOIN documento  ON tipo_documento_usuario = documento.id_documento
INNER JOIN genero  ON genero_usuario = genero.id_genero WHERE id_usuario = 2;
SELECT * FROM telefono;
SELECT id_telefono, numero_telefono,
usuario.nombre_completo_usuario AS usuario_telefono
FROM telefono 
INNER JOIN usuario  ON usuario_telefono = usuario.id_usuario;
SELECT * FROM email;
SELECT id_email, nombre_email,
usuario.nombre_completo_usuario AS usuario_email
FROM email 
INNER JOIN usuario  ON usuario_email = usuario.id_usuario;
SELECT * FROM tareas;
SELECT id_tarea, tarea_asignada, tiempo_inicio, tiempo_entrega,
estado.tipo_estado AS estado_tarea
FROM tareas 
INNER JOIN estado  ON estado_tarea = estado.id_estado;
SELECT * FROM proyecto;
SELECT id_proyecto, nombre_proyecto, tiempo_inicio_proyecto, tiempo_entrega_proyecto,
estado.tipo_estado AS estado_proyecto
FROM proyecto 
INNER JOIN estado  ON estado_proyecto = estado.id_estado;
SELECT 
    pu.id_proyecto_usuario,
    p.nombre_proyecto AS nombre_proyecto,
    u.nombre_completo_usuario AS nombre_usuario
FROM proyecto_usuario pu
INNER JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
INNER JOIN usuario u ON pu.id_usuario = u.id_usuario;
SELECT 
    pu.id_tarea_usuario,
    p.tarea_asignada AS nombre_tarea,
    u.nombre_completo_usuario AS nombre_usuario
FROM tarea_usuario pu
INNER JOIN tareas p ON pu.id_tarea = p.id_tarea
INNER JOIN usuario u ON pu.id_usuario = u.id_usuario;
SELECT * FROM grupo_usuario;
SELECT 
    pu.id_grupo_usuario,
    p.nombre_grupo AS nombre_grupo,
    u.nombre_completo_usuario AS nombre_usuario
FROM grupo_usuario pu
INNER JOIN grupo p ON pu.id_grupo = p.id_grupo
INNER JOIN usuario u ON pu.id_usuario = u.id_usuario;
SELECT * FROM rol_usuario;
SELECT 
    pu.id_rol_usuario,
    p.nombre_rol AS nombre_rol,
    u.nombre_completo_usuario AS nombre_usuario
FROM rol_usuario pu
INNER JOIN rol p ON pu.id_rol = p.id_rol
INNER JOIN usuario u ON pu.id_usuario = u.id_usuario;

/*  
?CONSULTAS
*/
/*  
?tareas por estado
*/
SELECT t.*
FROM tareas t
INNER JOIN estado e ON t.estado_tarea = e.id_estado
WHERE e.tipo_estado = 'Pendiente';
/*  
?proyecto por estado
*/
SELECT p.*
FROM proyecto p
INNER JOIN estado e ON p.estado_proyecto = e.id_estado
WHERE e.tipo_estado = ?;
/*  
?usuarios por tipo de documento 
*/
SELECT u.*
FROM usuario u
INNER JOIN documento d ON u.tipo_documento_usuario = d.id_documento
WHERE d.tipo_documento = 'Cédula';
/*  
?usuarios por genero
*/
SELECT u.*
FROM usuario u
INNER JOIN genero g ON u.genero_usuario = g.id_genero
WHERE g.tipo_genero = 'Femenino';
/* 
?usuarios por rol
*/
SELECT u.*
FROM usuario u
INNER JOIN rol r ON u.tipo_documento_usuario = r.id_rol
WHERE r.nombre_rol = ?;
/*  
?telefonos por usuario
*/
SELECT t.*, u.nombre_completo_usuario AS nombre_usuario
FROM telefono t
INNER JOIN usuario u ON t.usuario_telefono = u.id_usuario
WHERE u.nombre_completo_usuario = 'Juan Pérez';
/*  
?email por usuario
*/
SELECT e.*, u.nombre_completo_usuario AS nombre_usuario
FROM email e
INNER JOIN usuario u ON e.usuario_email = u.id_usuario
WHERE u.nombre_completo_usuario = 'Juan Pérez';
/*  
?usuarios por grupo
*/
SELECT u.*
FROM usuario u
INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
WHERE g.nombre_grupo = 'Grupo A';
/*  
?roles por grupo
*/
SELECT r.*
FROM rol r
INNER JOIN rol_usuario ru ON r.id_rol = ru.id_rol
INNER JOIN grupo_usuario gu ON ru.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
WHERE g.nombre_grupo = 'Grupo A';
/*  
?Proyectos por grupo
*/
SELECT p.*
FROM proyecto p
INNER JOIN proyecto_usuario pu ON p.id_proyecto = pu.id_proyecto
INNER JOIN grupo_usuario gu ON pu.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
WHERE g.nombre_grupo = ?;
/*  
?tareas por grupo
*/
SELECT t.*
FROM tareas t
INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
INNER JOIN grupo_usuario gu ON tu.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
WHERE g.nombre_grupo = 'Grupo C';
/*  
?estado de proyecto por grupo
*/
SELECT p.*, e.tipo_estado
FROM proyecto p
INNER JOIN proyecto_usuario pu ON p.id_proyecto = pu.id_proyecto
INNER JOIN grupo_usuario gu ON pu.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
INNER JOIN estado e ON p.estado_proyecto = e.id_estado
WHERE g.nombre_grupo = 'Grupo A';
/*  
?estado de tarea por grupo
*/
SELECT t.*, e.tipo_estado
FROM tareas t
INNER JOIN estado e ON t.estado_tarea = e.id_estado
INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
INNER JOIN grupo_usuario gu ON tu.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
WHERE g.nombre_grupo = 'Grupo A';
/*  
?usuarios por genero en los grupos
*/
SELECT u.*, g1.tipo_genero
FROM usuario u
INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
INNER JOIN genero g1 ON u.genero_usuario = g1.id_genero
INNER JOIN grupo g2 ON gu.id_grupo = g2.id_grupo
WHERE g1.tipo_genero = 'Masculino' AND g2.nombre_grupo = 'Grupo A';
/*  
?usuarios por genero en los proyectos
*/
SELECT u.*, g.tipo_genero
FROM usuario u
INNER JOIN proyecto_usuario pu ON u.id_usuario = pu.id_usuario
INNER JOIN genero g ON u.genero_usuario = g.id_genero
INNER JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
WHERE g.tipo_genero = 'Masculino' AND p.nombre_proyecto = 'Proyecto A';

/*  
?genero por tipo de documento
*/
SELECT g.tipo_genero, d.tipo_documento
FROM genero g
INNER JOIN usuario u ON g.id_genero = u.genero_usuario
INNER JOIN documento d ON u.tipo_documento_usuario = d.id_documento;
/*  
?numero de proyectos por estado
*/
SELECT e.tipo_estado, COUNT(*) AS numero_proyectos
FROM proyecto p
INNER JOIN estado e ON p.estado_proyecto = e.id_estado
GROUP BY e.tipo_estado;
/*  
?proyecto por usuario
*/
SELECT u.*
FROM usuario u
INNER JOIN proyecto_usuario pu ON u.id_usuario = pu.id_usuario
INNER JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
WHERE p.nombre_proyecto = 'Proyecto A';
/*  
?tarea por usuario
*/
SELECT u.*
FROM usuario u
INNER JOIN tarea_usuario tu ON u.id_usuario = tu.id_usuario
INNER JOIN tareas t ON tu.id_tarea = t.id_tarea
WHERE t.tarea_asignada = 'Realizar informe';
/*  
?numero de tareas por estado
*/
SELECT g.nombre_grupo, e.tipo_estado, COUNT(*) AS numero_tareas
FROM tareas t
INNER JOIN estado e ON t.estado_tarea = e.id_estado
INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
INNER JOIN usuario u ON tu.id_usuario = u.id_usuario
INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
GROUP BY g.nombre_grupo, e.tipo_estado;
/*  
?numero de tareas por estado especifico en los grupos
*/
SELECT g.nombre_grupo, t.tarea_asignada
FROM tareas t
INNER JOIN estado e ON t.estado_tarea = e.id_estado
INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
INNER JOIN usuario u ON tu.id_usuario = u.id_usuario
INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
WHERE e.tipo_estado = 'Pendiente'
GROUP BY g.nombre_grupo, t.tarea_asignada;
/*  
?numero de proyectos por estado especifico
*/
SELECT g.nombre_grupo, p.nombre_proyecto
FROM proyecto p
INNER JOIN estado e ON p.estado_proyecto = e.id_estado
INNER JOIN proyecto_usuario pu ON p.id_proyecto = pu.id_proyecto
INNER JOIN usuario u ON pu.id_usuario = u.id_usuario
INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
WHERE e.tipo_estado = 'Pendiente'
GROUP BY g.nombre_grupo, p.nombre_proyecto;
/*  
?Consulta Todo 
*/
SELECT g.nombre_grupo, u.nombre_completo_usuario, r.nombre_rol, p.nombre_proyecto, e.tipo_estado
FROM grupo g
LEFT JOIN grupo_usuario gu ON g.id_grupo = gu.id_grupo
LEFT JOIN usuario u ON gu.id_usuario = u.id_usuario
LEFT JOIN rol_usuario ru ON u.id_usuario = ru.id_usuario
LEFT JOIN rol r ON ru.id_rol = r.id_rol
LEFT JOIN proyecto_usuario pu ON u.id_usuario = pu.id_usuario
LEFT JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
LEFT JOIN estado e ON p.estado_proyecto = e.id_estado;