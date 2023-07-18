import mysql from 'mysql2';
import {Router} from 'express';
import proxyProyecto from '../middleware/proyectomiddleware.js';
const storageProyecto = Router();
let con = undefined;

storageProyecto.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageProyecto.get("/:id?", (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM proyecto WHERE id_proyecto = ?`, req.params.id]
        : [`SELECT * FROM proyecto`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageProyecto.post("/", proxyProyecto ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO proyecto SET ?`,
        req.body,
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


storageProyecto.put("/:id", proxyProyecto ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE proyecto SET ?  WHERE id_proyecto = ?`,
        [req.body, req.params.id],
        (err, result) => {id_tarea
            if (err) {
                console.error('Error al actualizar proyecto:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageProyecto.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM proyecto WHERE id_proyecto = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar tareas:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageProyecto;