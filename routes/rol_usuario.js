import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyRolUsuario from '../middleware/rol_usuariomiddleware.js'; 
const storageRolUsuario = Router();
let con = undefined;

storageRolUsuario.use("/:id?", async (req, res, next) => {
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

storageRolUsuario.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageRolUsuario.get("/:id?", proxyRolUsuario , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT 
        pu.id_rol_usuario,
        p.nombre_rol AS nombre_rol,
        u.nombre_completo_usuario AS nombre_usuario
    FROM rol_usuario pu
    INNER JOIN rol p ON pu.id_rol = p.id_rol
    INNER JOIN usuario u ON pu.id_usuario = u.id_usuario WHERE id_rol_usuario = ?`, jwtData.payload.id] 
        : [`SELECT 
        pu.id_rol_usuario,
        p.nombre_rol AS nombre_rol,
        u.nombre_completo_usuario AS nombre_usuario
    FROM rol_usuario pu
    INNER JOIN rol p ON pu.id_rol = p.id_rol
    INNER JOIN usuario u ON pu.id_usuario = u.id_usuario;`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageRolUsuario.post("/", proxyRolUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO rol_usuario SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear rol_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageRolUsuario.put("/:id", proxyRolUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE rol_usuario SET ?  WHERE id_rol_usuario = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar rol_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageRolUsuario.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM rol_usuario WHERE id_rol_usuario = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar rol_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageRolUsuario;