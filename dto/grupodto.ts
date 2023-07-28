import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class grupoDTO {

    @Expose({ name: 'id_grupo' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato ID incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'nombre_grupo' })
    @IsString()
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipo_estado es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro tipo_estado no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value) || typeof value=="undefined" ) return value; else throw {status: 400, message:`El dato grupo incumple los parametros acordados`};},{ toClassOnly: true})
    grupo: string;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;


    constructor(
        id_grupo: number,
        nombre_grupo: string,
        id: number
    ) {
        this.ID = id_grupo;
        this.grupo = nombre_grupo;
        this.ID2 = id;
    }
}