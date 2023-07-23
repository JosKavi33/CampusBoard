import session from 'express-session';
import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyRolUsuario from '../middleware/rol_usuariomiddleware.js'; 
const storageRolUsuario = Router();
let con = undefined;

storageRolUsuario.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageRolUsuario.use("/:id?", async (req, res, next) => {
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
        req.session.jwt = jwt;
        const maxAgeInSeconds = 3600;
        res.cookie('token', jwt, { httpOnly: true, maxAge: maxAgeInSeconds * 1000 });
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
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    if (jwtData.payload.id && jwtData.payload.id !== req.params.id) {
        return res.sendStatus(403);
    }
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
storageRolUsuario.post("/", proxyRolUsuario ,async (req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO rol_usuario SET ?`,
        await getBody(req),
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
const getBody = async (req) =>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify( 
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    delete jwtData.payload.iat;
    delete jwtData.payload.exp;   
    return jwtData.payload.body 
}
export default storageRolUsuario;