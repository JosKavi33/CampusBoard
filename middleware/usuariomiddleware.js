import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {usuarioDTO} from "../dtocontroller/usuariodto.js";
import { validate } from "class-validator";

const proxyUsuario = express();
proxyUsuario.use("/:id", async(req,res,next)=>{
    try {
        let data = plainToClass(usuarioDTO, req.body && req.params, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyUsuario;