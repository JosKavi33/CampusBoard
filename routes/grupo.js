import session from 'express-session';
import expressQueryBoolean from 'express-query-boolean';
import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyGrupo from '../middleware/grupomiddleware.js';
const storageGrupo = Router();
let con = undefined;

storageGrupo.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));

storageGrupo.use(expressQueryBoolean());
const getGrupoById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT * FROM grupo WHERE id_grupo = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getGrupoTodo = () => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT g.nombre_grupo, u.nombre_completo_usuario, r.nombre_rol, p.nombre_proyecto, e.tipo_estado
    FROM grupo g
    LEFT JOIN grupo_usuario gu ON g.id_grupo = gu.id_grupo
    LEFT JOIN usuario u ON gu.id_usuario = u.id_usuario
    LEFT JOIN rol_usuario ru ON u.id_usuario = ru.id_usuario
    LEFT JOIN rol r ON ru.id_rol = r.id_rol
    LEFT JOIN proyecto_usuario pu ON u.id_usuario = pu.id_usuario
    LEFT JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
    LEFT JOIN estado e ON p.estado_proyecto = e.id_estado;`];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
storageGrupo.use("/:id?", async (req, res, next) => {
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
storageGrupo.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})
storageGrupo.get("/", proxyGrupo , async (req,res)=>{
    try {
        if (req.query.id) {
            const data = await getGrupoById(req.query.id);
            res.send(data);
        } else { 
            const sql = [`SELECT * FROM grupo`]; 
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
storageGrupo.get("/todo", proxyGrupo, async (req, res) => {
    try {
        const data = await getGrupoTodo();
        res.send(data);
    } catch (err) {
        console.error("Ocurrió un error al procesar la solicitud", err.message);
        res.sendStatus(500);
    }
});
storageGrupo.post("/", proxyGrupo , async(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO grupo SET ?`,
        await getBody(req),
        (err, result) => {
            if (err) {
                console.error('Error al crear grupo:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageGrupo.put("/:id", proxyGrupo ,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE grupo SET ? WHERE id_grupo = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar grupo:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGrupo.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM grupo WHERE id_grupo = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando grupo ${req.params.id}: `, err.message);
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
export default storageGrupo; 