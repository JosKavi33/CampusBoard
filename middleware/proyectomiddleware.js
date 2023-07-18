import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {proyectoDTO} from "../dtocontroller/proyectodto.js";
import { validate } from "class-validator";

const proxyProyecto = express();
proxyProyecto.use("/:id",async(req,res,next)=>{
    try {
        let data = plainToClass(proyectoDTO, req.body && req.params, { excludeExtraneousValues: true});
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyProyecto;