import dotenv from 'dotenv';
import express from 'express';
import storageEstado from './routes/estado.js';


dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/estado", storageEstado);


const config =JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>console.log(`http://${config.hostname}:${config.port}`));


