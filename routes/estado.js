import mysql from 'mysql2';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyEstado from '../middleware/estadomiddleware.js';
const storageEstado = Router();
let con = undefined;

storageEstado.use("/:id?", async (req, res, next) => {
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

storageEstado.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageEstado.get("/:id?", proxyEstado, async (req, res) => {
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT * FROM estado WHERE id_estado = ?`, jwtData.payload.id]  
        : [`SELECT * FROM estado`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageEstado.post("/", proxyEstado, (req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO estado SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear area:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageEstado.put("/:id", proxyEstado, (req, res) => {
    con.query(
        /*sql*/
        `UPDATE estado SET ?  WHERE id_estado = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar estado:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageEstado.delete("/:id", (req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM estado WHERE id_estado = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar estado:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageEstado;