import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class estadoDTO { 

    @Expose({ name: 'id_estado' })
    /* @IsNumber() */
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || typeof value=="undefined" ) return Math.floor(value); else throw {status: 400, message:`El dato id_estado incumple los parametros acordados`};},{ toClassOnly: true})
    id_estado: number; 

    @Expose({ name: 'tipo_estado' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipo_estado es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro tipo_estado no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value) || typeof value=="undefined" ) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    tipo_estado: string;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || typeof value=="undefined" ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    id: number; 

    constructor(
        ID: number,
        estado: string,
        ID2: number,
    ) {
        this.id_estado = ID;
        this.tipo_estado = estado;
        this.id = ID2;
    }
}