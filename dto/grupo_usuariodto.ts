import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class grupo_usuarioDTO {

    @Expose({ name: 'id_grupo_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato grupo_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'id_grupo' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato grupo incumple los parametros acordados`};},{ toClassOnly: true})
    grupo: number;

    @Expose({ name: 'id_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    usuario: number;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;

    constructor(
        id_grupo_usuario: number,
        id_grupo: number,
        id_usuario: number,
        id: number
    ) {
        this.ID = id_grupo_usuario;
        this.grupo = id_grupo;
        this.usuario = id_usuario;
        this.ID2= id;  
    }
}