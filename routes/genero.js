import session from 'express-session';
import expressQueryBoolean from 'express-query-boolean';
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
storageGenero.use(expressQueryBoolean()); 
const getTareaById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT * FROM genero WHERE id_genero = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getGeneroAndDocumento = () => {
    return new Promise((resolve, reject) => {
        const sql = [
            `SELECT g.tipo_genero, d.tipo_documento
            FROM genero g
            INNER JOIN usuario u ON g.id_genero = u.genero_usuario
            INNER JOIN documento d ON u.tipo_documento_usuario = d.id_documento`
        ];
        con.query(...sql, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

storageGenero.get("/", proxyGenero , async (req,res)=>{
    try { 
        if (req.query.id) {
            const data = await getTareaById(req.query.id);
            res.send(data);
        }else { 
            const sql = [`SELECT * FROM genero`]; 
            con.query(...sql, (err, data) => {
            if (err) {
                console.error("Ocurrió un error intentando traer los datos de genero", err.message);
                res.status(err.status || 500);
            } else {
                res.send(data);
            }
            });
        }
        } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
        }
    });
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
storageGenero.get("/genero-y-documento", proxyGenero, async (req, res) => {
    try {
        const data = await getGeneroAndDocumento();
        res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageGenero.put("/:id", proxyGenero ,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE genero SET ? WHERE id_genero = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
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
storageGenero.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM genero WHERE id_genero = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando genero ${req.params.id}: `, err.message);
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
export default storageGenero; 
