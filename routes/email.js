import mysql, { raw } from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyEmail from '../middleware/emailmiddleware.js';
const storageEmail = Router();
let con = undefined;

storageEmail.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder();
        const payload = { body: req.body, params: req.params, id: req.params.id  };
        const jwtconstructor = new SignJWT(payload);
        const jwt = await jwtconstructor 
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY)); 
        req.body = payload.body;
        const maxAgeInSeconds = 3600; // 1 hora
        res.cookie('token', jwt, { httpOnly: true, maxAge: maxAgeInSeconds * 1000 });
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

    if (jwtData.payload.id && jwtData.payload.id !== req.params.id) {
        return res.sendStatus(403);
    }

    let sql = (jwtData.payload.id)
        ? [`SELECT id_email, nombre_email,
        usuario.nombre_completo_usuario AS usuario_email
        FROM email 
        INNER JOIN usuario  ON usuario_email = usuario.id_usuario WHERE id_email = ?`, jwtData.payload.id] 
        : [`SELECT id_email, nombre_email,
        usuario.nombre_completo_usuario AS usuario_email
        FROM email 
        INNER JOIN usuario  ON usuario_email = usuario.id_usuario;`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageEmail.post("/", proxyEmail ,async (req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO email SET ?`,
        await getBody(req),
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
const getBody = async (req) =>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify( 
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    delete jwtData.payload.iat;
    delete jwtData.payload.exp;
    return jwtData.payload.body 
} 

export default storageEmail;