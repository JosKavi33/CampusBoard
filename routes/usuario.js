import mysql from 'mysql2';
import {Router} from 'express';
import proxyUsuario from '../middleware/usuariomiddleware.js';
const storageUsuario = Router();
let con = undefined;

storageUsuario.use((req, res, next) => {

    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
})

storageUsuario.get("/:id?", proxyUsuario, (req,res)=>{
    let sql = (req.params.id)
        ? [`SELECT * FROM usuario WHERE id_usuario = ?`, req.params.id]
        : [`SELECT * FROM usuario`];
    con.query(...sql,
        (err, data, fie)=>{
            res.send(data);
        }
    );
})

storageUsuario.post("/", proxyUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `INSERT INTO usuario SET ?`,
        req.body,
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


storageUsuario.put("/:id", proxyUsuario ,(req, res) => {
    con.query(
        /*sql*/
        `UPDATE usuario SET ?  WHERE id_usuario = ?`,
        [req.body, req.params.id],
        (err, result) => {id_tarea
            if (err) {
                console.error('Error al actualizar usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});
storageUsuario.delete("/:id",(req, res) => {
    con.query(
        /*sql*/
        `DELETE FROM usuario WHERE id_usuario = ?`,
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar usuario:', err.message);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


export default storageUsuario;