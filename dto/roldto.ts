import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class rolDTO {

    @Expose({ name: 'id_rol' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_rol incumple los parametros acordados`};},{ toClassOnly: true})
    id_rol: number;

    @Expose({ name: 'nombre_rol' })
    @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_rol es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro nombre_rol no puede pasar os 30 caracteres`}}})
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    nombre_rol: string;


    constructor(
        ID: number,
        rol: string,
    ) {
        this.id_rol = ID;
        this.nombre_rol = rol;
    }
}