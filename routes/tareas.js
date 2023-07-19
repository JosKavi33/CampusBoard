import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT } from 'jose';
import proxyTarea from '../middleware/tareasmiddleware.js';
const storageTarea = Router();
let con = undefined;

storageTarea.use(async (req, res, next) => {
    try {
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(req.params);
        const jwt = await jwtconstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        /* res.send({jwt}); */
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

storageTarea.get("/:id?", proxyTarea , (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM tareas WHERE id_tarea = ?`, req.params.id]
        : [`SELECT * FROM tareas`];
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