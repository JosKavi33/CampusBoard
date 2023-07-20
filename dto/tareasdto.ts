import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined, IsDate } from 'class-validator';

export class tareasDTO {

    @Expose({ name: 'id_tarea' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_tarea incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'tarea_asignada' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tarea_asignada es obligatorio` }}})
    @MaxLength(80, {message: ()=>{throw {status: 401, message: `El parametro tarea_asignada no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    tarea: string;

    @Expose({ name: 'estado_tarea' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato estado_tarea incumple los parametros acordados`};},{ toClassOnly: true})
    estado: number;

    @Expose({ name: 'tiempo_inicio' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo_inicio no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    inicio: Date;

    @Expose({ name: 'tiempo_entrega' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo_entrega no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    entrega: Date;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;

    constructor( 
        id_tarea: number,
        tarea_asignada: string,
        estado_tarea: number,
        tiempo_inicio: Date,
        tiempo_entrega: Date,
        id: number
    ) {
        this.ID = id_tarea;
        this.tarea = tarea_asignada;
        this.estado = estado_tarea;
        this.inicio = tiempo_inicio;
        this.entrega = tiempo_entrega;
        this.ID2 = id;
    }
}