import session from 'express-session';
import mysql from 'mysql2';
import { Router } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyGenero from '../middleware/generomiddleware.js';

const storageGenero = Router();
let con = undefined;

storageGenero.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true,   
}));

storageGenero.use("/:id?", async (req, res, next) => {
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

storageGenero.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGenero.get("/:id?", proxyGenero , async (req,res)=>{
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
        ? [`SELECT * FROM genero WHERE id_genero = ?`, jwtData.payload.id]
        : [`SELECT * FROM genero`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageGenero.post("/", proxyGenero , async(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO genero SET ?`,
        await getBody(req),
        (err, result) => {
            if (err) {
                console.error('Error al crear genero:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
}); 


storageGenero.put("/:id", proxyGenero ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE genero SET ?  WHERE id_genero = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar genero:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGenero.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM genero WHERE id_genero = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar genero:', err.message);
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
export default storageGenero; 
