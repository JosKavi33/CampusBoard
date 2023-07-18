import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {documentoDTO} from "../dtocontroller/documentodto.js";
import { validate } from "class-validator";

const proxyDocumento = express();
proxyDocumento.use("/:id", async(req,res,next)=>{
    try {
        let data = plainToClass(documentoDTO, req.body && req.params, { excludeExtraneousValues: true});
        await validate(data); 
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyDocumento;