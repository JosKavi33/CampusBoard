import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {generoDTO} from "../dtocontroller/generodto.js";
import { validate } from "class-validator";

const proxyGenero = express();
proxyGenero.use(async(req,res,next)=>{
    try {
        let data = plainToClass(generoDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyGenero;