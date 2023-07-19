import { Expose, Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MaxLength, IsDefined } from 'class-validator';

export class usuarioDTO {

    @Expose({ name: 'id_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    id_usuario: number;

    @Expose({ name: 'rol_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato rol_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    rol_usuario: number;

    @Expose({ name: 'tarea_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato tarea_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    tarea_usuario: number;

    @Expose({ name: 'nombre_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro nombre_usuario no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    nombre_usuario: string;

    @Expose({ name: 'segundo_nombre_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro segundo_nombre_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro segundo_nombre_usuario no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    segundo_nombre_usuario: string;

    @Expose({ name: 'apellido_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro apellido_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro apellido_usuario no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    apellido_usuario: string;

    @Expose({ name: 'segundo_apellido_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro segundo_apellido_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro segundo_apellido_usuario no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    segundo_apellido_usuario: string;

    @Expose({ name: 'telefono_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro telefono_usuario es obligatorio` }}})
    @MaxLength(15, {message: ()=>{throw {status: 401, message: `El parametro telefono_usuario no puede pasar os 30 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value)) return value; else throw {status: 400, message:`El dato tipo_categoria incumple los parametros acordados`};},{ toClassOnly: true})
    telefono_usuario: string;

    @Expose({ name: 'email_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro email_usuario es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro email_usuario no puede pasar os 45 caracteres`}}}) */
    @Transform(({value})=>{if(/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value)) return value; else throw {status: 400, message:`El dato email_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    email_usuario: string;

    @Expose({ name: 'edad_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato edad_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    edad_usuario: number;

    @Expose({ name: 'tipodoc_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato tipodoc_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    tipodoc_usuario: number;

    @Expose({ name: 'genero_usuario' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato genero_usuario incumple los parametros acordados`};},{ toClassOnly: true})
    genero_usuario: number;

    @Expose({ name: 'id' })
    @IsNumber()
    @Transform(({value})=>{if(/^[0-9]+$/.test(value) || value==undefined ) return Math.floor(value); else throw {status: 400, message:`El dato id incumple los parametros acordados`};},{ toClassOnly: true})
    id: number;

    constructor(
        ID: number,
        rol: number,
        tarea: number,
        primer_nombre: string,
        segundo_nombre: string,
        primer_apellido: string,
        segundo_apellido: string,
        telefono: string, 
        email: string,
        edad: number,
        documento: number,
        genero: number,
        ID2: number
    ) {
        this.id_usuario = ID;
        this.rol_usuario = rol;
        this.tarea_usuario = tarea;
        this.nombre_usuario = primer_nombre;
        this.segundo_nombre_usuario = segundo_nombre;
        this.apellido_usuario = primer_apellido;
        this.segundo_apellido_usuario = segundo_apellido;
        this.telefono_usuario = telefono;
        this.email_usuario = email;
        this.edad_usuario = edad;
        this.tipodoc_usuario = documento;
        this.genero_usuario = genero;
        this.id = ID2; 
    }
} 