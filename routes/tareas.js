import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose'; 
import proxyTarea from '../middleware/tareasmiddleware.js'; 
const storageTarea = Router();
let con = undefined;

storageTarea.use("/:id?", async (req, res, next) => {
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

storageTarea.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageTarea.get("/:id?", proxyTarea , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT id_tarea, tarea_asignada, tiempo_inicio, tiempo_entrega,
        estado.tipo_estado AS estado_tarea
        FROM tareas 
        INNER JOIN estado  ON estado_tarea = estado.id_estado WHERE id_tarea = ?`, jwtData.payload.id]  
        : [`SELECT id_tarea, tarea_asignada, tiempo_inicio, tiempo_entrega,
        estado.tipo_estado AS estado_tarea
        FROM tareas 
        INNER JOIN estado  ON estado_tarea = estado.id_estado;`]; 
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageTarea.post("/", proxyTarea ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO tareas SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear tareas:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageTarea.put("/:id", proxyTarea ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE tareas SET ?  WHERE id_tarea = ?`,
        [req.body, req.params.id],
        (err, result) => {id_tarea
            if (err) {
                console.error('Error al actualizar tareas:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageTarea.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM tareas WHERE id_tarea = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar tareas:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageTarea;