import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {estadoDTO} from "../dtocontroller/estadodto.js";
import { validate } from "class-validator";

const proxyEstado = express();
proxyEstado.use(async(req,res,next)=>{
    try {
        let data = plainToClass(estadoDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyEstado;