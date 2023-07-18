import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined, IsDate } from 'class-validator';

export class proyectoDTO {

    @Expose({ name: 'id_proyecto' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_proyecto incumple los parametros acordados`};},{ toClassOnly: true})
    id_proyecto: number;

    @Expose({ name: 'nombre_proyecto' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_proyecto es obligatorio` }}})
    @MaxLength(80, {message: ()=>{throw {status: 401, message: `El parametro nombre_proyecto no puede pasar os 30 caracteres`}}})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    nombre_proyecto: string;

    @Expose({ name: 'estado_proyecto' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato estado_proyecto incumple los parametros acordados`};},{ toClassOnly: true})
    estado_proyecto: number;

    @Expose({ name: 'tiempo_inicio_proyecto' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo_inicio_proyecto no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    tiempo_inicio_proyecto: Date;

    @Expose({ name: 'tiempo_entrega_proyecto' })
    @IsDate()
    @Transform(({value})=> {if(/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined) return(value); else throw {status: 400, message:`el parámetro ingresado para tiempo_entrega_proyecto no es válido, debe seguir la sintaxis AAAA-MM-DD`};}, {toClassOnly:true})
    tiempo_entrega_proyecto: Date;

    constructor(
        ID: number,
        tarea: string,
        estado: number,
        inicio: Date,
        entrega: Date
    ) {
        this.id_proyecto = ID;
        this.nombre_proyecto = tarea;
        this.estado_proyecto = estado;
        this.tiempo_inicio_proyecto = inicio;
        this.tiempo_entrega_proyecto = entrega;
    }
}