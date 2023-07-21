import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyProyectoUsuario from '../middleware/proyecto_usuariomiddleware.js'; 
const storageProyectoUsuario = Router();
let con = undefined;

storageProyectoUsuario.use("/:id?", async (req, res, next) => {
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

storageProyectoUsuario.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageProyectoUsuario.get("/:id?", proxyProyectoUsuario , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT 
        pu.id_proyecto_usuario,
        p.nombre_proyecto AS nombre_proyecto,
        u.nombre_completo_usuario AS nombre_usuario
    FROM proyecto_usuario pu
    INNER JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
    INNER JOIN usuario u ON pu.id_usuario = u.id_usuario WHERE id_proyecto_usuario = ?`, jwtData.payload.id] 
        : [`SELECT 
        pu.id_proyecto_usuario,
        p.nombre_proyecto AS nombre_proyecto,
        u.nombre_completo_usuario AS nombre_usuario
    FROM proyecto_usuario pu
    INNER JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
    INNER JOIN usuario u ON pu.id_usuario = u.id_usuario;`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageProyectoUsuario.post("/", proxyProyectoUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO proyecto_usuario SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear proyecto_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageProyectoUsuario.put("/:id", proxyProyectoUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE proyecto_usuario SET ?  WHERE id_proyecto_usuario = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar proyecto_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageProyectoUsuario.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM proyecto_usuario WHERE id_proyecto_usuario = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar proyecto_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageProyectoUsuario;