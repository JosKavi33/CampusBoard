import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class grupoDTO {

    @Expose({ name: 'id_grupo' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_grupo incumple los parametros acordados`};},{ toClassOnly: true})
    id_grupo: number;

    @Expose({ name: 'desarrollador_grupo' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato desarrollador_grupo incumple los parametros acordados`};},{ toClassOnly: true})
    desarrollador_grupo: number;

    @Expose({ name: 'proyecto_grupo' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato proyecto_grupo incumple los parametros acordados`};},{ toClassOnly: true})
    proyecto_grupo: number;


    constructor(
        ID: number,
        desarrollador: number,
        proyecto: number
    ) {
        this.id_grupo = ID;
        this.desarrollador_grupo = desarrollador;
        this.proyecto_grupo = proyecto;
    }
}