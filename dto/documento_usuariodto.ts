import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class documento_usuarioDTO {

    @Expose({ name: 'id_documento_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato documento_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'id_documento' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato documento incumple los parametros acordados`};},{ toClassOnly: true})
    documento: number;

    @Expose({ name: 'id_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    usuario: number;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;

    constructor(
        id_documento_usuario: number,
        id_documento: number,
        id_usuario: number,
        id: number
    ) {
        this.ID = id_documento_usuario;
        this.documento = id_documento;
        this.usuario = id_usuario;
        this.ID2= id;  
    }
}