import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {proyectoDTO} from "../dtocontroller/proyectodto.js";
import { validate } from "class-validator";

const proxyProyecto = express();
proxyProyecto.use(async(req,res,next)=>{
    try {
        let data = plainToClass(proyectoDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyProyecto;