import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyEmail from '../middleware/emailmiddleware.js';
const storageEmail = Router();
let con = undefined;

storageEmail.use("/:id?", async (req, res, next) => {
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

storageEmail.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageEmail.get("/:id?", proxyEmail , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT * FROM email WHERE id_email = ?`, jwtData.payload.id] 
        : [`SELECT * FROM email`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageEmail.post("/", proxyEmail ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO email SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear email:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageEmail.put("/:id", proxyEmail ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE email SET ?  WHERE id_email = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar email:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageEmail.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM email WHERE id_email = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar email:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageEmail;