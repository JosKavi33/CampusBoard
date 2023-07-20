import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class rol_usuarioDTO {

    @Expose({ name: 'id_rol_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato rol_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'id_rol' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato rol incumple los parametros acordados`};},{ toClassOnly: true})
    rol: number;

    @Expose({ name: 'id_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    usuario: number;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;

    constructor(
        id_rol_usuario: number,
        id_rol: number,
        id_usuario: number,
        id: number
    ) {
        this.ID = id_rol_usuario;
        this.rol = id_rol;
        this.usuario = id_usuario;
        this.ID2= id;  
    }
}