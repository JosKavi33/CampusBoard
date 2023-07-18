import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {rolDTO} from "../dtocontroller/roldto.js";
import { validate } from "class-validator";

const proxyRol = express();
proxyRol.use(async(req,res,next)=>{
    try {
        let data = plainToClass(rolDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyRol;