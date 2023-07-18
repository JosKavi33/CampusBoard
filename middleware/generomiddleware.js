import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {generoDTO} from "../dtocontroller/generodto.js";
import { validate } from "class-validator";

const proxyGenero = express();
proxyGenero.use("/:id", async(req,res,next)=>{ 
    try {
        let data = plainToClass(generoDTO, req.body && req.params, { excludeExtraneousValues: true});
        await validate(data);
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyGenero;