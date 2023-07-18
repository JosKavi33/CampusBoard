import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class documentoDTO {

    @Expose({ name: 'id_documento' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_documento incumple los parametros acordados`};},{ toClassOnly: true})
    id_documento: number;

    @Expose({ name: 'tipo_documento' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipo_documento es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro tipo_documento no puede pasar os 30 caracteres`}}})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    tipo_documento: string;


    constructor(
        ID: number,
        documento: string,
    ) {
        this.id_documento = ID;
        this.tipo_documento = documento;
    }
}