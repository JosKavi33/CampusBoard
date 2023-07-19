import express  from "express";
import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import {documentoDTO} from "../dtocontroller/documentodto.js";
import { validate } from "class-validator";
import { jwtVerify } from "jose";

const proxyDocumento = express();
proxyDocumento.use("/:id", async(req,res,next)=>{
    try {
        const jwt = req.jwt;

        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        )

        let data = plainToClass(documentoDTO, jwtData.payload, { excludeExtraneousValues: true});
        await validate(data); 
        next();
    } catch (err) {
        res.status(err.status).send(err);
    }
})
export default proxyDocumento;