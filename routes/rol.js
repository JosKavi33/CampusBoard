import session from 'express-session';
import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyRol from '../middleware/rolmiddleware.js';
const storageRol = Router();
let con = undefined;

storageRol.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));

storageRol.use("/:id?", async (req, res, next) => {
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

storageRol.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageRol.get("/:id?", proxyRol , async (req,res)=>{
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
        ? [`SELECT * FROM rol WHERE id_rol = ?`, jwtData.payload.id]
        : [`SELECT * FROM rol`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})
storageRol.post("/", proxyRol ,async (req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO rol SET ?`,
        await getBody(req),
        (err, result) => {
            if (err) {
                console.error('Error al crear rol:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});

storageRol.put("/:id", proxyRol ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE rol SET ?  WHERE id_rol = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar rol:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageRol.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM rol WHERE id_rol = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar rol:', err.message);
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
export default storageRol;