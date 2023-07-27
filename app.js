import dotenv from 'dotenv';
import express from 'express';
import storageEstado from './routes/estado.js';
import storageDocumento from './routes/documento.js';
import storageGenero from './routes/genero.js';
import storageRol from './routes/rol.js';
import storageTarea from './routes/tareas.js';
import storageProyecto from './routes/proyecto.js';
import storageUsuario from './routes/usuario.js';
import storageGrupo from './routes/grupo.js';
import cookieParser from 'cookie-parser';
import storageTelefono from './routes/telefono.js';
import storageEmail from './routes/email.js';
import storageProyectoUsuario from './routes/proyecto_usuario.js';
import storageTareaUsuario from './routes/tarea_usuario.js';
import storageGrupoUsuario from './routes/grupo_usuario.js';
import storageRolUsuario from './routes/rol_usuario.js';
import { generateToken ,validateToken } from './middleware/jwt.js';

dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());
appExpress.get("/token", generateToken, (req,res)=>{
    res.send({token: req.token})
}) 
appExpress.use("/estado", validateToken, storageEstado);
appExpress.use("/documento", validateToken, storageDocumento);
appExpress.use("/genero", validateToken, storageGenero);
appExpress.use("/rol", validateToken, storageRol);
appExpress.use("/tareas", validateToken, storageTarea);
appExpress.use("/proyecto", validateToken, storageProyecto);
appExpress.use("/usuario", validateToken, storageUsuario);
appExpress.use("/grupo", validateToken, storageGrupo);
appExpress.use("/telefono", validateToken, storageTelefono);
appExpress.use("/email", validateToken, storageEmail);
appExpress.use("/proyecto_usuario", validateToken, storageProyectoUsuario);
appExpress.use("/tarea_usuario", validateToken, storageTareaUsuario);
appExpress.use("/grupo_usuario", validateToken, storageGrupoUsuario);
appExpress.use("/rol_usuario", validateToken, storageRolUsuario);

const config =JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));


