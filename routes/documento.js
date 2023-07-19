import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT } from 'jose';
import proxyDocumento from '../middleware/documentomiddleware.js';
const storageDocumento = Router();
let con = undefined;

storageDocumento.use(async (req, res, next) => {
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

storageDocumento.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageDocumento.get("/:id?", proxyDocumento ,(req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM documento WHERE id_documento = ?`, req.params.id]
        : [`SELECT * FROM documento`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageDocumento.post("/", proxyDocumento ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO documento SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear documento:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageDocumento.put("/:id", proxyDocumento ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE documento SET ?  WHERE id_documento = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar documento:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageDocumento.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM documento WHERE id_documento = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar documento:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageDocumento;