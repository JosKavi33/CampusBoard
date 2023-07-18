import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {rolDTO} from "../dtocontroller/roldto.js";
import { validate } from "class-validator";

const proxyRol = express();
proxyRol.use("/:id" ,async(req,res,next)=>{
    try {
        let data = plainToClass(rolDTO, req.body && req.params, { excludeExtraneousValues: true});
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyRol;