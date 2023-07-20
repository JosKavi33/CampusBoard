import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyProyectoTarea from '../middleware/tarea_usuariomiddleware.js'; 
const storageTareaUsuario = Router();
let con = undefined;

storageTareaUsuario.use("/:id?", async (req, res, next) => {
    try {
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(req.params);
        const jwt = await jwtconstructor 
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        
        res.cookie('token', jwt, {httpOnly: true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

storageTareaUsuario.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageTareaUsuario.get("/:id?", proxyProyectoTarea , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT * FROM tarea_usuario WHERE id_tarea_usuario = ?`, jwtData.payload.id] 
        : [`SELECT * FROM tarea_usuario`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageTareaUsuario.post("/", proxyProyectoTarea ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO tarea_usuario SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear tarea_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageTareaUsuario.put("/:id", proxyProyectoTarea ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE tarea_usuario SET ?  WHERE id_tarea_usuario = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar tarea_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageTareaUsuario.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM tarea_usuario WHERE id_tarea_usuario = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar tarea_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageTareaUsuario;