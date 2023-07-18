import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined, IsDate } from 'class-validator';

export class tareasDTO {

    @Expose({ name: 'id_tarea' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_tarea incumple los parametros acordados`};},{ toClassOnly: true})
    id_tarea: number;

    @Expose({ name: 'tarea_asignada' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tarea_asignada es obligatorio` }}})
    @MaxLength(80, {message: ()=>{throw {status: 401, message: `El parametro tarea_asignada no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    tarea_asignada: string;

    @Expose({ name: 'estado_tarea' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato estado_tarea incumple los parametros acordados`};},{ toClassOnly: true})
    estado_tarea: number;

    @Expose({ name: 'tiempo_inicio' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo_inicio no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    tiempo_inicio: Date;

    @Expose({ name: 'tiempo_entrega' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo_entrega no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    tiempo_entrega: Date;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    id: number;

    constructor( 
        ID: number,
        tarea: string,
        estado: number,
        inicio: Date,
        entrega: Date,
        ID2: number
    ) {
        this.id_tarea = ID;
        this.tarea_asignada = tarea;
        this.estado_tarea = estado;
        this.tiempo_inicio = inicio;
        this.tiempo_entrega = entrega;
        this.id = ID2;
    }
}