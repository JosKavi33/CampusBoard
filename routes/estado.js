import mysql from 'mysql2';
import {Router} from 'express';
import proxyEstado from '../middleware/estadomiddleware.js';
const storageEstado = Router();
let con = undefined;

storageEstado.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageEstado.get("/:id?", (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM estado WHERE id_estado = ?`, req.params.id]
        : [`SELECT * FROM estado`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageEstado.post("/", proxyEstado ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO estado SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear area:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});


storageEstado.put("/:id", proxyEstado ,(req, res) => {
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
storageEstado.delete("/:id",(req, res) => {
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


export default storageEstado;