
# CAMPUSBOARD

En este proyecto vamos a construir un Backend, para una aplicacion de asiganacion de tareas grupales, usuario(puede ser lider o participante)
con tiempos de inicio, tiempos de terminacion, grupos de trabajos, reasiganacion de tareas
y traslado de integrantes entre grupos


## OBJETIVOS ESPECIFICOS

CampusBoard, es una aplicacion de uso institucional, donde los campers podran entrenar la metodologia Scrum, mediante la creacion de proyectos por tareas tiempos definidos


## OBJETIVOS ESPECIFICOS

1. Organización de proyectos:
   - Los usuarios podrán crear proyectos dentro de la plataforma "CAMPUSBOARD".
   - Cada proyecto estará relacionado con un grupo.
   - Los lideres podrán asignar roles y permisos a los miembros del equipo dentro de cada proyecto.
2. Creación de tareas:
   - Dentro de cada proyecto, los usuarios podrán crear tareas individuales o en grupo para organizar el trabajo.
   - Las tareas podrán tener diferentes atributos, como nombre, asignación a un miembro del equipo, fecha de vencimiento, fecha de inicio, etc.
3. Gestión de tareas:
   - Los usuarios podrán ver todas las tareas asignadas a ellos en un panel personalizado.
   - Podrán actualizar el estado de las tareas (por ejemplo, "por hacer", "en progreso", "completada", etc.).


# DISEÑO BASE DE DATOS

<img src="img/DiagramaCampusBoard.png" alt="MySQL Logo" width="1280">

---

# TECNOLOGIAS IMPLEMENTADAS

<div>
<img src="img/nodejs-1-logo.svg" alt="MySQL Logo" width="100">
<img src="img/Unofficial_JavaScript_logo_2.svg.png" alt="MySQL Logo" width="100">
<img src="img/mysql-logo.svg" alt="MySQL Logo" width="100">
<img src="img/nodemon.svg" alt="MySQL Logo" width="100">
<img src="img/Typescript_logo_2020.svg.png" alt="MySQL Logo" width="100">
<img src="img/2560px-Npm-logo.svg.png" alt="MySQL Logo" width="100">
</div> 


# DEPENDENCIAS IMPLEMENTADAS

Express,
express-session,
class-transformer,
reflect-metadata,
mysql2,
dotenv,
nodemon,
typescript


# INTALACION DEPENDENCIAS

1. Inicializar el archivo package.json en la consola:
```
npm init -y
```
2. Instalar nodemon (para desarrollo):
```
npm i -E -D nodemon
```
3. Instalar Express (framework web):
```
npm i -E -D express
```
4. Instalar dotenv (para gestionar variables de entorno):
```
npm i -E -D dotenv
```
5. Instalar mysql2 (para la conexión con la base de datos):
```
npm i -E -D mysql2
```
6. Instalar class-transformer (para la transformación de datos):
```
npm i -E -D class-transformer
```
7. Instalar reflect-metadata (para habilitar los decoradores):
```
npm i -E -D reflect-metadata
```
8. Instalar TypeScript (para el soporte de tipado):
```
npm i -E -D typescript
```

# CONFIGURACION DEL .env

En el archivo .env, configurar las siguientes variables de conexión a la base de datos:

```
MY_CONFIG={"hostname": "", "port":}
MY_CONNECT={"host":"localhost","user":"","database":"","password":"","port":}

```

# CONFIGURACION tsconfig

En el archivo tsconfig.json, agregar las siguientes opciones de configuración:

```
{
    "compilerOptions":{
        "target":"es6",
        "module":"ES6",
        "moduleResolution":"node",
        "outDir":"./dtocontroller",
        "esModuleInterop":true,
        "experimentalDecorators":true,
        "emitDecoratorMetadata": true
    }
}
```

## VALIDACION TOKEN 

Con esta linea verificamos que el token en la url coincida con el que generamos, esto debido a la persistencia de cookies de la url

```
if (jwtData.payload.id && jwtData.payload.id !== req.params.id) {
        return res.sendStatus(403);
    }
```

# express-session

Express-session es un middleware de Express que proporciona un sistema de gestión de sesiones para las aplicaciones web. Las sesiones son un mecanismo que permite a los servidores web mantener información sobre el estado de un usuario entre diferentes solicitudes del cliente.

Cuando un cliente (navegador) se conecta a una aplicación web, el servidor web crea una sesión única para ese cliente. Esta sesión se identifica mediante un identificador único (un ID de sesión) que se envía al cliente en forma de cookie. En las solicitudes posteriores, el cliente incluirá este ID de sesión en las cabeceras de sus peticiones, lo que permite al servidor reconocer al cliente y mantener información específica relacionada con esa sesión.

Con esto eliminamos la persistencia que tenia la cookiees, que nos hacia tener que dar a buscar dos veces

# INTALACION

```
npm i -E -D express-session
```

#Configurar la sesión
```
Configurar la sesión
storageGenero.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true,   
}));
```

# express-query-boolean

Es una libreri que nos permite parsear los parámetros de consulta y luego definir cada tipo de consulta en una función separada.
Con este enfoque, cada tipo de consulta se maneja de manera separada en su propia función, lo que hace que el código sea más fácil de mantener y extender. Además, el uso de async/await y Promise permite manejar los errores de manera más efectiva

# INSTALACION

```
npm i -E -D express-query-boolean
```

# DEFINIMOS

Agregamos el middleware expressQueryBoolean para parsear los parámetros booleanos

```
storageTarea.use(expressQueryBoolean());
```

Función para obtener tareas por ID

```
const getTareaById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = [`SELECT * FROM tareas WHERE id_tarea = ?`, id];
    con.query(...sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
```
## Handler para la ruta de tareas
```
storageTarea.get("/", proxyTarea, async (req, res) => {
  try {
    if (req.query.id) {
      const data = await getTareaById(req.query.id);
      res.send(data);
    } else if (req.query.estado) {
      const data = await getTareaByEstado(req.query.estado);
      res.send(data);
    } else if (req.query.grupo) {
      const data = await getTareaByGrupo(req.query.grupo);
      res.send(data);
    } else {
      const sql = [`SELECT * FROM tareas`];
      con.query(...sql, (err, data) => {
        if (err) {
          console.error("Ocurrió un error intentando traer los datos de tareas", err.message);
          res.status(err.status || 500);
        } else {
          res.send(data);
        }
      });
    }
  } catch (err) {
    console.error("Ocurrió un error al procesar la solicitud", err.message);
    res.sendStatus(500);
  }
});
```

---

## Almacenar el JWT en la variable de sesión

```
req.session.jwt = jwt;
```

## Obtener el JWT de la variable de sesión

```
const jwt = req.session.jwt;
```

# Implementacion de los jwt y Coookies en el GET antes de enviar solicitud a la DB

<img src="./img/getjwt.png">

# Implementacion de los jwt y Cookies en el metodo POST

<img src="./img/jwtpost.png">

# Implementacion de los jwt y Cookies en el metodo PUT

<img src="./img/jwtput.png">

# Implementacion de los jwt y Cookies en el metodo DELETE

<img src="./img/jwtdel.png">

# Implementacion de los jwt y Cookies en el Archivo Middlewawre

<img src="./img/middleware.png"> 

---

# Tiempo de expiracion de permanencia de la cookies

Con esto eliminamos el tiempo de persistencia de la cookie en el navegador, ademas del masAge, tambien podemos usar "expire". 
```
const maxAgeInSeconds = 3600;
        res.cookie('token', jwt, { httpOnly: true, maxAge: maxAgeInSeconds * 1000 });
```

---

# Funcion getBody(req)

Con esta funcion vamos a enviar los parametros obtenidos de jwt y pasar el cuerpo al metodo post, aca aplicamos ya la obttencion de la variable de sesion.

```
const getBody = async (req) =>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify( 
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    delete jwtData.payload.iat; 
    delete jwtData.payload.exp;   
    return jwtData.payload.body 
}
```

---

# CONSULTAS

## GET Para todas las tablas

Donde '?', es el nombre de cualquier tabla, nos arrojara el contenido de estas mismas
TABLAS{
    documento,
    email,
    estado,
    genero,
    grupo_usuario,
    grupo,
    proyecto_usuario,
    proyecto,
    rol_usuario,
    rol,
    tarea_usuario,
    tareas,
    telefono,
    usuario
}
```
http://127.9.63.30:5042/?
```
EJEMPLO:

<img src="./img/gets.png">

## Consulta por ID para las tablas que no contienen consultas especiales

<div style="color:blue">"NOTA : ESTAS TABLAS GENERAN CONSULTA POR ESTAS URL, PORQUE NO ESTAN IMPLEMENTANDO 'express-query-boolean'"</div>


TABLAS PARA ESTA CONSULTA{
    documento,
    email,
    estado,
    grupo_usuario,
    proyecto_usuario,
    rol_usuario,
    rol,
    tarea_usuario,
    telefono,
}

Donde ?, es el id que buscamos en la tabla deseada

```
http://127.9.63.30:5042/{nombre de la tabla}/?
```

EJEMPLO:

<img src="./img/getporid.png">


## Metodo POST para todas las tablas

El metodo post funciona igual en todas las tablas, en la misma url del metodo get,
dependiendo si la Base de Datos tiene el Id auto incremental, este parametro dentro del body puede ser 
opcional. 
El body es donde vamos a hacer la insersion de datos y contiene los campos de la tabla, para cada tabla el body 
varia, por eso es importante tener presente los campos que corresponden a esta

EJEMPLO:

<img src="./img/POSTQ.png">
<img src="./img/POSTS.png">


## Metodo PUT para todas las tablas

El metodo put funciona igual en todas las tablas, en la misma url del metodo tabla/id,
este parametro id dentro del body se omite. 
Rcuerda, el body es donde vamos a hacer la insersion de datos y contiene los campos de la tabla, para cada tabla el body 
varia, por eso es importante tener presente los campos que corresponden a esta

EJEMPLO:

<img src="./img/put1.png">
<img src="./img/put2.png">


## Metodo DELETE para todas las tablas

El metodo delete funciona igual en todas las tablas, en la misma url tabla/id,
aunque en este metodo lo unico que necesitamos es esta url para efectuarlo

EJEMPLO:

<img src="./img/del.png">
<img src="./img/del2.png">

---

# CONSULTAS ESPECIFICAS

A continuación, se muestran algunas de las consultas específicas disponibles en la API:

## Estados

```
    "tipo_estado": "Pendiente
    "tipo_estado": "En progreso"
    "tipo_estado": "Completado"
    "tipo_estado": "Cancelado"
    "tipo_estado": "Revisión"
    "tipo_estado": "Aprobado"
    "tipo_estado": "Rechazado"
    "tipo_estado": "Entregado"
    "tipo_estado": "Suspendido"
    "tipo_estado": "Finalizado"
```

## Buscar tareas por id

```
http://127.9.63.30:5042/tareas?id=?
```
<img src="./img/tareasid.png">

## Buscar tareas por estado
```
http://127.9.63.30:5042/tareas?estado=?

```
<img src="./img/tareaestado.png">

## Buscar tareas por grupo

```
http://127.9.63.30:5042/tareas?grupo=? //el %20 es por el espacio, si el nombre del grupo no tuviese espacio seria sin este

    "Grupo%20A",
    "Grupo%20B",
    "Grupo%20C",
    "Grupo%20D",
    "Grupo%20E",
    "Grupo%20F",
    "Grupo%20G",
    "Grupo%20H",
    "Grupo%20I",
    "Grupo%20J"
```
<img src="./img/tarasgrupo.png">

## Buscar numero de tareas por estado en cada grupo
```
http://127.9.63.30:5042/tareas?numTare=?

```
<img src="./img/tareasestadogrupo.png">

## Buscar tareas por estado en cada grupo
```
http://127.9.63.30:5042/tareas?numTareGrupo=?
```
<img src="./img/tareasgrupoestado.png">

## Buscar Proyecto por estado

```
http://127.9.63.30:5042/proyecto?estado=?
```
<img src="./img/proyectoporestado.png">

## Proyectos por grupo

```
http://127.9.63.30:5042/proyecto?grupo=Grupo%20C
```
<img src="./img/proyectogrupo.png">

## Estado de Proyectos por grupo

```
http://127.9.63.30:5042/proyecto?estadoProyectoGrupo=?
```
<img src="./img/estadoproyectogrupo.png">

## Proyectos por usuario

```
http://127.9.63.30:5042/proyecto?usuario=?
```
<img src="./img/proyectousuario.png">

## Buscar Usuarios por id

```
http://127.9.63.30:5042/usuario?id=?
```
<img src="./img/usuarioID.png">

## Buscar Usuarios por tipo de documento

```
http://127.9.63.30:5042/usuario?documento=?
```
<img src="./img/usuariodoc.png">

## Buscar Usuarios por genero 

```
http://127.9.63.30:5042/usuario?genero=?
```
<img src="./img/usuariogen.png">

## Buscar Usuarios por rol

```
http://127.9.63.30:5042/usuario?rol=?
```
<img src="./img/usuariorol.png">

## Buscar Usuarios por grupo

```
http://127.9.63.30:5042/usuario?grupo=?
```
<img src="./img/usuariogrupo.png">

## Buscar Usuarios por rol en los grupos

```
http://127.9.63.30:5042/usuario?genero=Masculino&grupo=Grupo%20A
```

## Buscar Genero por id

```
http://127.9.63.30:5042/genero?id=?
```
<img src="./img/generoid.png">

## Buscar Generos por documento

```
http://127.9.63.30:5042/genero/genero-y-documento
```
<img src="./img/gendoc.png">

## Traer Toda la informacion de los grupos

```
http://127.9.63.30:5042/grupo/todo
```
<img src="./img/todo.png">

---

# [Author : Jose Alberto Cabrejo Villar]