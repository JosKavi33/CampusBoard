import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyUsuario from '../middleware/usuariomiddleware.js';
const storageUsuario = Router();
let con = undefined;

storageUsuario.use("/:id?", async (req, res, next) => {
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

storageUsuario.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageUsuario.get("/:id?", proxyUsuario, async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify( 
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT id_usuario, nombre_completo_usuario, direccion_usuario, edad_usuario, 
        documento.numero_documento AS numero_documento_usuario,
        documento.tipo_documento AS tipo_documento_usuario,
        genero.tipo_genero AS genero_usuario
        FROM usuario 
        INNER JOIN documento  ON numero_documento_usuario = documento.id_documento
        INNER JOIN genero  ON genero_usuario = genero.id_genero WHERE id_usuario = ?`, jwtData.payload.id]
        : [`SELECT id_usuario, nombre_completo_usuario, direccion_usuario, edad_usuario, 
        documento.numero_documento AS numero_documento_usuario,
        documento.tipo_documento AS tipo_documento_usuario,
        genero.tipo_genero AS genero_usuario
        FROM usuario 
        INNER JOIN documento  ON numero_documento_usuario = documento.id_documento
        INNER JOIN genero  ON genero_usuario = genero.id_genero`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageUsuario.post("/", proxyUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO usuario SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageUsuario.put("/:id", proxyUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE usuario SET ?  WHERE id_usuario = ?`,
        [req.body, req.params.id],
        (err, result) => {id_tarea
            if (err) {
                console.error('Error al actualizar usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageUsuario.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM usuario WHERE id_usuario = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageUsuario;