import mysql from 'mysql2';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyEstado from '../middleware/estadomiddleware.js';
const storageEstado = Router();
let con = undefined;

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
        const maxAgeInSeconds = 3600; // 1 hora
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
    const jwt = req.cookies.token;

    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify( 
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )

    if (jwtData.payload.id && jwtData.payload.id !== req.params.id) {
        // Si el ID del JWT no coincide con el ID proporcionado en la ruta
        return res.sendStatus(403); // Prohibido - No tienes autorización para ver este recurso.
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


storageEstado.put("/:id", proxyEstado, (req, res) => {
    con.query(
        /*sql*/
        `UPDATE estado SET ?  WHERE id_estado = ?`,
        [req.body, req.params.id],
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
storageEstado.delete("/:id", (req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM estado WHERE id_estado = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar estado:', err.message);
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
export default storageEstado;