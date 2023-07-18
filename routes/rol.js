import mysql from 'mysql2';
import {Router} from 'express';
import proxyRol from '../middleware/rolmiddleware.js';
const storageRol = Router();
let con = undefined;

storageRol.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageRol.get("/:id?", (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM rol WHERE id_rol = ?`, req.params.id]
        : [`SELECT * FROM rol`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})
storageRol.post("/", proxyRol ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO rol SET ?`,
        req.body,
        (err, result) => {
            if (err) {
                console.error('Error al crear rol:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    );
});

storageRol.put("/:id", proxyRol ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE rol SET ?  WHERE id_rol = ?`,
        [req.body, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar rol:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageRol.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM rol WHERE id_rol = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar rol:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageRol;