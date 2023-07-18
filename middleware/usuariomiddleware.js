import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {usuarioDTO} from "../dtocontroller/usuariodto.js";
import { validate } from "class-validator";

const proxyUsuario = express();
proxyUsuario.use(async(req,res,next)=>{
    try {
        let data = plainToClass(usuarioDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyUsuario;