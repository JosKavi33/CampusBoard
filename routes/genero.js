import mysql from 'mysql2';
import {Router} from 'express';
import { SignJWT } from 'jose';
import proxyGenero from '../middleware/generomiddleware.js';
const storageGenero = Router();
let con = undefined;

storageGenero.use(async (req, res, next) => {
    try {
        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(req.params);
        const jwt = await jwtconstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        /* res.send({jwt}); */
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

storageGenero.get("/:id?", proxyGenero ,(req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM genero WHERE id_genero = ?`, req.params.id]
        : [`SELECT * FROM genero`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageGenero.post("/", proxyGenero ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO genero SET ?`,
        req.body,
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


export default storageGenero;