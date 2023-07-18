import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {tareasDTO} from "../dtocontroller/tareasdto.js";
import { validate } from "class-validator";

const proxyTarea = express();
proxyTarea.use(async(req,res,next)=>{
    try {
        let data = plainToClass(tareasDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyTarea;