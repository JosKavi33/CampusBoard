import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {grupoDTO} from "../dtocontroller/grupodto.js";
import { validate } from "class-validator";

const proxyGrupo = express();
proxyGrupo.use(async(req,res,next)=>{
    try {
        let data = plainToClass(grupoDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyGrupo;