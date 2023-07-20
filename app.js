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


dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use(cookieParser());
appExpress.use("/estado", storageEstado);
appExpress.use("/documento", storageDocumento);
appExpress.use("/genero", storageGenero);
appExpress.use("/rol", storageRol);
appExpress.use("/tareas", storageTarea);
appExpress.use("/proyecto", storageProyecto);
appExpress.use("/usuario", storageUsuario);
appExpress.use("/grupo", storageGrupo);
appExpress.use("/telefono", storageTelefono);
appExpress.use("/email", storageEmail);
appExpress.use("/proyecto_usuario", storageProyectoUsuario);

const config =JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));


