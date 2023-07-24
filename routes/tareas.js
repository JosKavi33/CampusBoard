import session from 'express-session';
import expressQueryBoolean from 'express-query-boolean';
import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose'; 
import proxyTarea from '../middleware/tareasmiddleware.js'; 
const storageTarea = Router();
let con = undefined;

storageTarea.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageTarea.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder();
        const payload = { body: req.body, params: req.params };
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
storageTarea.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})
storageTarea.use(expressQueryBoolean());
const getTareaById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT id_tarea, tarea_asignada, tiempo_inicio, tiempo_entrega,
    estado.tipo_estado AS estado_tarea
    FROM tareas 
    INNER JOIN estado  ON estado_tarea = estado.id_estado WHERE id_tarea = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getTareaByEstado = (estado) => {
    return new Promise((resolve, reject) => {
    const sql = [
        `SELECT t.*
        FROM tareas t
        INNER JOIN estado e ON t.estado_tarea = e.id_estado
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
const getNumTareaByEstado = (numTare) => {
    return new Promise((resolve, reject) => {
        const sql = [
            `SELECT g.nombre_grupo, e.tipo_estado, COUNT(*) AS numero_tareas
            FROM tareas t
            INNER JOIN estado e ON t.estado_tarea = e.id_estado
            INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
            INNER JOIN usuario u ON tu.id_usuario = u.id_usuario
            INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
            INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
            WHERE e.tipo_estado = ?
            GROUP BY g.nombre_grupo, e.tipo_estado;`,
            numTare
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
const getNumTareaByEstadoGrupo = (numTareGrupo) => {
    return new Promise((resolve, reject) => {
        const sql = [
            `SELECT g.nombre_grupo, t.tarea_asignada
            FROM tareas t
            INNER JOIN estado e ON t.estado_tarea = e.id_estado
            INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
            INNER JOIN usuario u ON tu.id_usuario = u.id_usuario
            INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
            INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
            WHERE e.tipo_estado = ?
            GROUP BY g.nombre_grupo, t.tarea_asignada;`,
            numTareGrupo
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
const getTareaByGrupo = (grupo) => {
    return new Promise((resolve, reject) => {
    const sql = [
        `SELECT t.*
        FROM tareas t
        INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
        INNER JOIN grupo_usuario gu ON tu.id_usuario = gu.id_usuario
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
const getAllTareasWithEstados = () => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT g.nombre_grupo, e.tipo_estado, COUNT(*) AS numero_tareas
        FROM tareas t
        INNER JOIN estado e ON t.estado_tarea = e.id_estado
        INNER JOIN tarea_usuario tu ON t.id_tarea = tu.id_tarea
        INNER JOIN usuario u ON tu.id_usuario = u.id_usuario
        INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
        INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
        GROUP BY g.nombre_grupo, e.tipo_estado
        `;
        con.query(sql, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
storageTarea.get("/", proxyTarea, async (req, res) => {
    try {
    if (req.query.id) {
        const data = await getTareaById(req.query.id);
        res.send(data);
    } else if (req.query.estado) {
        const data = await getTareaByEstado(req.query.estado);
        res.send(data);
    } else if (req.query.numTare) {
        const data = await getNumTareaByEstado(req.query.numTare); 
        res.send(data); 
    } else if (req.query.numTareGrupo) {
        const data = await getNumTareaByEstadoGrupo(req.query.numTareGrupo);
        res.send(data);
    } else if (req.query.grupo) {
        const data = await getTareaByGrupo(req.query.grupo);
        res.send(data);
    } else { 
        const sql = [`SELECT id_tarea, tarea_asignada, tiempo_inicio, tiempo_entrega,
        estado.tipo_estado AS estado_tarea
        FROM tareas 
        INNER JOIN estado  ON estado_tarea = estado.id_estado`]; 
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
storageTarea.get("/all", proxyTarea, async (req, res) => {
    try {
        const data = await getAllTareasWithEstados();
        res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al obtener todas las tareas con estados:", err.message);
        res.sendStatus(500);
    }
}); 
storageTarea.post("/", proxyTarea ,async (req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO tareas SET ?`,
        await getBody(req),
        (err, result) => {
            if (err) {
                console.error('Error al crear tareas:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageTarea.put("/:id", proxyTarea ,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE tareas SET ? WHERE id_tarea = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar tareas:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageTarea.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM tareas WHERE id_tarea = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) { 
            console.error(`error eliminando tareas ${req.params.id}: `, err.message);
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
export default storageTarea;