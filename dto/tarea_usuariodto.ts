import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class tarea_usuarioDTO {

    @Expose({ name: 'id_tarea_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato tarea_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'id_tarea' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato tarea incumple los parametros acordados`};},{ toClassOnly: true})
    tarea: number;

    @Expose({ name: 'id_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    usuario: number;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;

    constructor(
        id_tarea_usuario: number,
        id_tarea: number,
        id_usuario: number,
        id: number
    ) {
        this.ID = id_tarea_usuario;
        this.tarea = id_tarea;
        this.usuario = id_usuario;
        this.ID2= id;  
    }
}