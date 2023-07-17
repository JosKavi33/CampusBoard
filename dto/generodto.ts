import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class estadoDTO {

    @Expose({ name: 'id_genero' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_genero incumple los parametros acordados`};},{ toClassOnly: true})
    id_genero: number;

    @Expose({ name: 'tipo_genero' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipo_genero es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro tipo_genero no puede pasar os 30 caracteres`}}})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    tipo_genero: string;


    constructor(
        ID: number,
        genero: string,
    ) {
        this.id_genero = ID;
        this.tipo_genero = genero;
    }
}