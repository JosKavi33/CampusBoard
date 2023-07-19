import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class documentoDTO {

    @Expose({ name: 'id_documento' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_documento incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'tipo_documento' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipo_documento es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro tipo_documento no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    documento: string;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || typeof value=="undefined" ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number; 


    constructor(
        id_documento: number,
        tipo_documento: string,
        id: number
    ) {
        this.ID = id_documento;
        this.documento = tipo_documento;
        this.ID2 = id;
    }
}