import session from 'express-session';
import mysql from 'mysql2';
import expressQueryBoolean from 'express-query-boolean';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import proxyUsuario from '../middleware/usuariomiddleware.js';
const storageUsuario = Router();
let con = undefined;

storageUsuario.use(session({
    secret: 'mi-secreto',
    resave: false, 
    saveUninitialized: true,   
}));
storageUsuario.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder();
        const payload = { body: req.body, params: req.params};
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

storageUsuario.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})
storageUsuario.use(expressQueryBoolean());
const getUsuarioById = (id) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT id_usuario, nombre_completo_usuario, numero_documento_usuario, direccion_usuario, edad_usuario, 
    documento.tipo_documento AS tipo_documento_usuario,
    genero.tipo_genero AS genero_usuario
    FROM usuario 
    INNER JOIN documento  ON tipo_documento_usuario = documento.id_documento
    INNER JOIN genero  ON genero_usuario = genero.id_genero WHERE id_usuario = ?`, id];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getUsuarioByTipoDocumento = (documento) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT u.*
    FROM usuario u
    INNER JOIN documento d ON u.tipo_documento_usuario = d.id_documento
    WHERE d.tipo_documento = ?`, documento];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getUsuarioByRol = (rol) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT u.*
    FROM usuario u
    INNER JOIN rol r ON u.tipo_documento_usuario = r.id_rol
    WHERE r.nombre_rol = ?`, rol];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getUsuarioByGenero = (genero) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT u.*
    FROM usuario u
    INNER JOIN genero g ON u.tipo_documento_usuario = g.id_genero
    WHERE g.tipo_genero = ?`, genero];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getUsuarioByGrupo = (grupo) => {
    return new Promise((resolve, reject) => {
    const sql = [`SELECT u.*
    FROM usuario u
    INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
    INNER JOIN grupo g ON gu.id_grupo = g.id_grupo
    WHERE g.nombre_grupo = ?`, grupo];
    con.query(...sql, (err, data) => {
        if (err) {
        reject(err);
        } else {
        resolve(data);
        }
    });
    });
};
const getUsuarioByGeneroYGrupo = (genero, grupo) => {
    return new Promise((resolve, reject) => {
        const sql = [
            `SELECT u.*, g1.tipo_genero
            FROM usuario u
            INNER JOIN grupo_usuario gu ON u.id_usuario = gu.id_usuario
            INNER JOIN genero g1 ON u.genero_usuario = g1.id_genero
            INNER JOIN grupo g2 ON gu.id_grupo = g2.id_grupo
            WHERE g1.tipo_genero = ? AND g2.nombre_grupo = ?`,
            genero,
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

const getUsuarioByGeneroYProyecto = (genero, proyecto) => {
    return new Promise((resolve, reject) => {
        const sql = [
            `SELECT u.*, g.tipo_genero
            FROM usuario u
            INNER JOIN proyecto_usuario pu ON u.id_usuario = pu.id_usuario
            INNER JOIN genero g ON u.genero_usuario = g.id_genero
            INNER JOIN proyecto p ON pu.id_proyecto = p.id_proyecto
            WHERE g.tipo_genero = ? AND p.nombre_proyecto = ?`,
            genero,
            proyecto
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
storageUsuario.get("//:data?/:data2?", proxyUsuario, async (req, res) => {
    try {
        const { id, documento, genero, rol, grupo, proyecto } = req.query;
        if (id) { 
            const data = await getUsuarioById(id);
            res.send(data);
        } else if (documento) {
            const data = await getUsuarioByTipoDocumento(documento);
            res.send(data);
        } else if (genero) {
            const data = await getUsuarioByGenero(genero);
            res.send(data);
        } else if (rol) {
            const data = await getUsuarioByRol(rol);
            res.send(data);
        } else if (grupo) {
            const data = await getUsuarioByGrupo(grupo);
            res.send(data);
        } else if (genero && grupo) {
            const data = await getUsuarioByGeneroYGrupo(genero, grupo);
            res.send(data);
        } else if (genero && proyecto) {
            const data = await getUsuarioByGeneroYProyecto(genero, proyecto);
            res.send(data);
        } else {
            const sql = [
                `SELECT id_usuario, nombre_completo_usuario, numero_documento_usuario, direccion_usuario, edad_usuario,
                documento.tipo_documento AS tipo_documento_usuario,
                genero.tipo_genero AS genero_usuario
                FROM usuario 
                INNER JOIN documento ON tipo_documento_usuario = documento.id_documento
                INNER JOIN genero ON genero_usuario = genero.id_genero`
            ];
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

storageUsuario.post("/", proxyUsuario ,async (req, res) => {
    con.query( 
        /*sql*/
        `INSERT INTO usuario SET ?`,
        await getBody(req), 
        (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});
storageUsuario.put("/:id", proxyUsuario ,async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    ) 
    con.query(`UPDATE usuario SET ? WHERE id_usuario = ?`, [jwtData.payload.body, jwtData.payload.params.id], 
        (err, result) => { 
            if (err) {
                console.error('Error al actualizar usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageUsuario.delete("/:id",async (req, res) => {
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    con.query(`DELETE FROM usuario WHERE id_usuario = ?`, jwtData.payload.params.id, 
        (err,info)=>{
        if(err) {
            console.error(`error eliminando usuario ${req.params.id}: `, err.message);
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
export default storageUsuario; 