import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {documentoDTO} from "../dtocontroller/documentodto.js";
import { validate } from "class-validator";

const proxyDocumento = express();
proxyDocumento.use(async(req,res,next)=>{
    try {
        let data = plainToClass(documentoDTO, req.body, { excludeExtraneousValues: true});
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data));
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyDocumento;