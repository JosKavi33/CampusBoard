import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class telefonoDTO {

    @Expose({ name: 'id_telefono' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato telefono incumple los parametros acordados`};},{ toClassOnly: true})
    ID: number;

    @Expose({ name: 'numero_telefono' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro nombre_usuario no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato numero incumple los parametros acordados`};},{ toClassOnly: true})
    numero: string;

    @Expose({ name: 'usuario_telefono' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato usuario incumple los parametros acordados`};},{ toClassOnly: true})
    usuario: number;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    ID2: number;

    constructor(
        id_telefono: number,
        numero_telefono: string,
        usuario_telefono: number,
        id: number
    ) {
        this.ID = id_telefono;
        this.numero = numero_telefono;
        this.usuario = usuario_telefono;
        this.ID2 = id;  
    }
} 