import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class generoDTO {

    @Expose({ name: 'id_genero' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_genero incumple los parametros acordados`};},{ toClassOnly: true})
    id_genero: number;

    @Expose({ name: 'tipo_genero' })
    @IsString()
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipo_genero es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro tipo_genero no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    tipo_genero: string;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    id: number;

    constructor(
        ID: number,
        genero: string,
        ID2: number,
    ) {
        this.id_genero = ID;
        this.tipo_genero = genero;
        this.id = ID2;
    }
}