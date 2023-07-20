import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyDocumenoUsuario from '../middleware/documento_usuariomiddleware.js'; 
const storageDocumentoUsuario = Router();
let con = undefined;

storageDocumentoUsuario.use("/:id?", async (req, res, next) => {
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

storageDocumentoUsuario.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageDocumentoUsuario.get("/:id?", proxyDocumenoUsuario , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT * FROM documento_usuario WHERE id_documento_usuario = ?`, jwtData.payload.id] 
        : [`SELECT * FROM documento_usuario`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageDocumentoUsuario.post("/", proxyDocumenoUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO documento_usuario SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear documento_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageDocumentoUsuario.put("/:id", proxyDocumenoUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE documento_usuario SET ?  WHERE id_documento_usuario = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar documento_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageDocumentoUsuario.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM documento_usuario WHERE id_documento_usuario = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar documento_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageDocumentoUsuario;