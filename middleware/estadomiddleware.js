import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {estadoDTO} from "../dtocontroller/estadodto.js";
import { validate } from "class-validator";

const proxyEstado = express();
proxyEstado.use("/:id",async(req,res,next)=>{ 
    try {
        console.log(req.params);
        let data = plainToClass(estadoDTO, req.body && req.params, { excludeExtraneousValues: true});
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyEstado;