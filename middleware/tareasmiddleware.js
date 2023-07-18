import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {tareasDTO} from "../dtocontroller/tareasdto.js";
import { validate } from "class-validator";

const proxyTarea = express();
proxyTarea.use("/:id" ,async(req,res,next)=>{
    try {
        let data = plainToClass(tareasDTO, req.body && req.params, { excludeExtraneousValues: true});
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyTarea;