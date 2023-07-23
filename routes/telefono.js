import session from 'express-session';
import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyTelefono from '../middleware/telefonomiddleware.js';
const storageTelefono = Router();
let con = undefined; 

storageTelefono.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageTelefono.use("/:id?", async (req, res, next) => {
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

storageTelefono.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageTelefono.get("/:id?", proxyTelefono , async (req,res)=>{
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
        ? [`SELECT id_telefono, numero_telefono,
        usuario.nombre_completo_usuario AS usuario_telefono
        FROM telefono 
        INNER JOIN usuario  ON usuario_telefono = usuario.id_usuario WHERE id_telefono = ?`, jwtData.payload.id] 
        : [`SELECT id_telefono, numero_telefono,
        usuario.nombre_completo_usuario AS usuario_telefono
        FROM telefono 
        INNER JOIN usuario  ON usuario_telefono = usuario.id_usuario;`];
    con.query(...sql, 
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageTelefono.post("/", proxyTelefono ,async (req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO telefono SET ?`,
        await getBody(req),
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
storageTelefono.put("/:id", proxyTelefono ,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE telefono SET ? WHERE id_telefono = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
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
storageTelefono.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM telefono WHERE id_telefono = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando telefono ${req.params.id}: `, err.message);
            res.status(err.status)
        } else {
            res.send(info);
        }
    }) 
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
export default storageTelefono; 