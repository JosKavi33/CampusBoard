
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
typescript,
jose,
cookie-parser,
express-session,
express-query-boolean

# IMPLEMENTACION PROYECTO

### CLONACION DEL REPOSITORIO

Clonamos el repositorio con visual estudio code y lo guardamos en una carpeta de nuestra elección

```
https://github.com/JoseCabrejoVillarCampus/CampusBoard.git
```

### INSTALACION DE DEPENDENCIAS

Para Usar las Dependencias que estan en el package.json :
```
npm install
```

# CONFIGURACION DEL .env

Dentro de la ruta CAMPUSBOARD cree un archivo que se llame ".env"
En el archivo .env, configurar las siguientes variables de conexión a la base de datos:
```
MY_CONFIG={"hostname": "", "port":}
MY_CONNECT={"host":"localhost","user":"","database":"CAMPUSBOARD","password":""}
JWT_PRIVATE_KEY=""
```
En el campo de MY_CONFIG ingrese un hostname y un puerto a su elección(preferiblemente mayor al 5000). Recuerde que por defecto el local host requiere que el hostname es 127.0.0.1. pero puede ser,
El user es el usuario de la base de datos registrado en Mysql, por defecto es root, database es el nombre de la base de datos y el passworld es la contraseña de el usuario Mysql

para este proyecto usamos esta configuracion:

```
MY_CONFIG={"hostname": "127.9.63.30", "port":5042}
MY_CONNECT={"host":"localhost","user":"jose","database":"CAMPUSBOARD","password":"admin"}
JWT_PRIVATE_KEY="tablas"
```

# INICIAR nodemon

```
npm run dev
```

# SI SE REQUIERE HACER CAMBIOS EN EL DTO O CREAR LOS CONTROLADORES NUEVAMENTE,  DEBES INICIAR tsc

En una consola diferente a la que iniciamos el dev. El sigueitne comando iniciara el transpilador. En caso de borra la carpteta de los controladores este se creara nuevamente con el nombre que se le asigno en el tsconfig.json

```
npm run tsc
```
# INSTALACION BASE DE DATOS

Primero verificamos que la base de datos este activa, luego abrimos la carpeta scripts, en el archivo db.sql y corremos todo, ya tiene incluido datos de prueba

## CONSULTAS MAQUETACION

La maquetacion de consultas que vamos a implementar estan almacenadas en el archivo consultas.sql dentro de la carpeta script

# GENERACION DE TOKEN DE ACCESO

Generar Token de acceso 

- Generación: Una vez ejecutado el anterior comando, dirijase a la herramienta que va a utilizar:

```
http://${config.hostname}:${config.port}/token
```

- Utilización: El endPoint anterior es el que va a generar el token. Tome ese token (solo el valor, sin comillas ni corchetes) y dirijase al apartado de HEADERS, agrege el header/Autorization y en el valor ingrese el token suministrado anteriormente.

Este token tiene un limite de tiempo, en ese rango de tiempo podremos acceder a las rutas y endPoints de nuestra Api. Una vez pasada esta hora será necesario generar uno nuevo.

# CONSULTAS


## FUNCIONAMIENTO Y ENDPOINTS.


**CRUD DE LAS TABLAS**
Los siguiente endPoints corresponden a los CRUDs de cada tabla. Para estos endPoints se pueden realizar las consultas básicas, get, get by id, post, put y delete. La entrada de los datos está encriptada usando JWT y cookies. Además se cuenta con un middleware que permite la validación de los datos antes de que ingresen para evitar consumir recursos innecesarios y evitar problemas con el ingreso de la data en la base de datos.  

* EndPoint CRUD de la Tabla CAMPUSBOARD:
Estos funciona  para POST/ GET/ DELETE/ PUT/,dentro del cliente que deseemos usar

  *http://${config.hostname}:${config.port}/documento*

* EndPoint CRUD de la Tabla email: 
  *http://${config.hostname}:${config.port}/email*

* EndPoint CRUD de la Tabla estado:
  *http://${config.hostname}:${config.port}/estado*

* EndPoint CRUD de la Tabla genero: 
  *http://${config.hostname}:${config.port}/genero*

* EndPoint CRUD de la Tabla grupo_usuario:
  *http://${config.hostname}:${config.port}/grupo_usuario*

* EndPoint CRUD de la Tabla grupo: 
  *http://${config.hostname}:${config.port}/grupo*

* EndPoint CRUD de la Tabla proyecto_usuario: 
  *http://${config.hostname}:${config.port}/proyecto_usuario*

* EndPoint CRUD de la Tabla proyecto: 
  *http://${config.hostname}:${config.port}/proyecto*

* EndPoint CRUD de la Tabla rol_usuario: 
  *http://${config.hostname}:${config.port}/rol_usuario*

* EndPoint CRUD de la Tabla rol: 
  *http://${config.hostname}:${config.port}/rol*

* EndPoint CRUD de la Tabla tarea_usuario: 
  *http://${config.hostname}:${config.port}/tarea_usuario*

* EndPoint CRUD de la Tabla tareas: 
  *http://${config.hostname}:${config.port}/tareas*

* EndPoint CRUD de la Tabla telefono: 
  *http://${config.hostname}:${config.port}/telefono*

* EndPoint CRUD de la Tabla usuario: 
  *http://${config.hostname}:${config.port}/usuario*


## GET Para todas las tablas


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
http://127.9.63.30:5042/usuario/generogrupo?genero=Masculino&grupo=Grupo%20A
```

<img src="./img/usuariogrupo.png">

## Buscar Usuarios por genero en los grupos
|
```
http://127.9.63.30:5042/usuario/generoyproyecto?genero=Masculino&proyecto=Proyecto%20A
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

# DOCUMENTACION

## VALIDACION TOKEN 

Con esta linea verificamos que el token en la url coincida con el que generamos, esto debido a la persistencia de cookies de la url

```
if (jwtData.payload.id && jwtData.payload.id !== req.params.id) {
        return res.sendStatus(403);
    }
```

## express-session

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

