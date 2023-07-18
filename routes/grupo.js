import mysql from 'mysql2';
import {Router} from 'express';
import proxyGrupo from '../middleware/grupomiddleware.js';
const storageGrupo = Router();
let con = undefined;

storageGrupo.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageGrupo.get("/:id?", proxyGrupo ,(req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM grupo WHERE id_grupo = ?`, req.params.id]
        : [`SELECT * FROM grupo`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageGrupo.post("/", proxyGrupo ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO grupo SET ?`,
        req.body,
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


storageGrupo.put("/:id", proxyGrupo ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE grupo SET ?  WHERE id_grupo = ?`,
        [req.body, req.params.id],
        (err, result) => {id_tarea
            if (err) {
                console.error('Error al actualizar grupo:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageGrupo.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM grupo WHERE id_grupo = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar grupo:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageGrupo;