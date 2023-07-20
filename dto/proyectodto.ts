import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined, IsDate } from 'class-validator';

export class proyectoDTO {

    @Expose({ name: 'id_proyecto' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato proyecto incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'nombre_proyecto' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_proyecto es obligatorio` }}})
    @MaxLength(80, {message: ()=>{throw {status: 401, message: `El parametro nombre_proyecto no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato proyecto incumple los parametros acordados`};},{ toClassOnly: true})
    proyecto: string;

    @Expose({ name: 'estado_proyecto' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato estado incumple los parametros acordados`};},{ toClassOnly: true})
    estado: number;

    @Expose({ name: 'tiempo_inicio_proyecto' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo inicio no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    tiempo_inicio: Date;

    @Expose({ name: 'tiempo_entrega_proyecto' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo entrega no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    tiempo_entrega: Date;

    @Expose({ name: 'id' }) 
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;

    constructor(
        id_proyecto: number,
        nombre_proyecto: string,
        estado_proyecto: number,
        tiempo_inicio_proyecto: Date,
        tiempo_entrega_proyecto: Date,
        id: number
    ) {
        this.ID = id_proyecto;
        this.proyecto = nombre_proyecto;
        this.estado = estado_proyecto;
        this.tiempo_inicio = tiempo_inicio_proyecto;
        this.tiempo_entrega = tiempo_entrega_proyecto;
        this.ID2= id 
    }
}