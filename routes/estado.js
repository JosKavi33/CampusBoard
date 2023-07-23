import session from 'express-session';
import mysql from 'mysql2';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyEstado from '../middleware/estadomiddleware.js';

const storageEstado = Router();
let con = undefined;

storageEstado.use(session({
    secret: 'mi-secreto1',
    resave: false,
    saveUninitialized: true,   
}));

storageEstado.use("/:id?", async (req, res, next) => {
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
storageEstado.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next(); 
})
storageEstado.get("/:id?", proxyEstado, async (req, res) => {
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
        ? [`SELECT * FROM estado WHERE id_estado = ?`, jwtData.payload.id]  
        : [`SELECT * FROM estado`];   
    con.query(...sql,
        (err, data, fie)=>{ 
            res.send(data);  
        }
    );
})
storageEstado.post("/", proxyEstado ,async (req, res) => {
    con.query( 
        /*sql*/
        `INSERT INTO estado SET ?`,
        await getBody(req),  
        (err, result) => {
            if (err) {
                console.error('Error al crear estado:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageEstado.put("/:id", proxyEstado,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE estado SET ? WHERE id_estado = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar estado:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageEstado.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM estado WHERE id_estado = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando estado ${req.params.id}: `, err.message);
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
export default storageEstado;