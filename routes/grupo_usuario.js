import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyGrupoUsuario from '../middleware/grupo_usuariomiddleware.js'; 
const storageGrupoUsuario = Router();
let con = undefined;

storageGrupoUsuario.use("/:id?", async (req, res, next) => {
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

storageGrupoUsuario.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGrupoUsuario.get("/:id?", proxyGrupoUsuario , async (req,res)=>{
    const jwt = req.cookies.token; 

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.id)
        ? [`SELECT 
        pu.id_grupo_usuario,
        p.nombre_grupo AS nombre_grupo,
        u.nombre_completo_usuario AS nombre_usuario
    FROM grupo_usuario pu
    INNER JOIN grupo p ON pu.id_grupo = p.id_grupo
    INNER JOIN usuario u ON pu.id_usuario = u.id_usuario WHERE id_grupo_usuario = ?`, jwtData.payload.id] 
        : [`SELECT 
        pu.id_grupo_usuario,
        p.nombre_grupo AS nombre_grupo,
        u.nombre_completo_usuario AS nombre_usuario
    FROM grupo_usuario pu
    INNER JOIN grupo p ON pu.id_grupo = p.id_grupo
    INNER JOIN usuario u ON pu.id_usuario = u.id_usuario;`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageGrupoUsuario.post("/", proxyGrupoUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO grupo_usuario SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear grupo_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageGrupoUsuario.put("/:id", proxyGrupoUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE grupo_usuario SET ?  WHERE id_grupo_usuario = ?`,
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
storageGrupoUsuario.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM grupo_usuario WHERE id_grupo_usuario = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar grupo_usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageGrupoUsuario;