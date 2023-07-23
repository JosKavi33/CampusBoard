import session from 'express-session';
import expressQueryBoolean from 'express-query-boolean';
import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyProyecto from '../middleware/proyectomiddleware.js';
const storageProyecto = Router();
let con = undefined;

storageProyecto.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageProyecto.use("/:id?", async (req, res, next) => {
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
storageProyecto.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})
storageProyecto.use(expressQueryBoolean());
const getProyectoById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT id_proyecto, nombre_proyecto, tiempo_inicio_proyecto, tiempo_entrega_proyecto,
    estado.tipo_estado AS estado_proyecto
    FROM proyecto 
    INNER JOIN estado  ON estado_proyecto = estado.id_estado WHERE id_proyecto = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getProyectoByEstado = (estado) => {
    return new Promise((resolve, reject) => {
    const sql = [
        `SELECT p.*
        FROM proyecto p
        INNER JOIN estado e ON p.estado_proyecto = e.id_estado
        WHERE e.tipo_estado = ?`,
        estado
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
const getProyectoByGrupo = (grupo) => {
    return new Promise((resolve, reject) => {
    const sql = [
        `SELECT p.*
        FROM proyecto p
        INNER JOIN proyecto_usuario pu ON p.id_proyecto = pu.id_proyecto
        INNER JOIN grupo_usuario gu ON pu.id_usuario = gu.id_usuario
        INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
        WHERE g.nombre_grupo = ?`,
        grupo
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
storageProyecto.get("/:id?", proxyProyecto, async (req,res)=>{
    try {
        if (req.query.id) {
            const data = await getProyectoById(req.query.id);
            res.send(data);
        } else if (req.query.grupo) {
            const data = await getProyectoByGrupo(req.query.grupo);
            res.send(data); 
        } else if (req.query.estado) {
            const data = await getProyectoByEstado(req.query.estado);
            res.send(data); 
        } else {
            const sql = [`SELECT id_proyecto, nombre_proyecto, tiempo_inicio_proyecto, tiempo_entrega_proyecto,
            estado.tipo_estado AS estado_proyecto
            FROM proyecto 
            INNER JOIN estado  ON estado_proyecto = estado.id_estado`];
            con.query(...sql, (err, data) => {
            if (err) {
                console.error("Ocurrió un error intentando traer los datos de tareas", err.message);
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
    
storageProyecto.post("/", proxyProyecto ,async (req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO proyecto SET ?`,
        await getBody(req),
        (err, result) => {
            if (err) {
                console.error('Error al crear proyecto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageProyecto.put("/:id", proxyProyecto ,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE proyecto SET ? WHERE id_proyecto = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar proyecto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageProyecto.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM proyecto WHERE id_proyecto = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando proyecto ${req.params.id}: `, err.message);
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
export default storageProyecto;