import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyTelefono from '../middleware/telefonomiddleware.js';
const storageTelefono = Router();
let con = undefined;

storageTelefono.use("/:id?", async (req, res, next) => {
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

storageTelefono.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageTelefono.get("/:id?", proxyTelefono , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT * FROM telefono WHERE id_telefono = ?`, jwtData.payload.id] 
        : [`SELECT * FROM telefono`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageTelefono.post("/", proxyTelefono ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO telefono SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear telefono:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageTelefono.put("/:id", proxyTelefono ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE telefono SET ?  WHERE id_telefono = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar telefono:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageTelefono.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM telefono WHERE id_telefono = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar telefono:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageTelefono; 