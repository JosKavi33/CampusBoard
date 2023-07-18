var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class usuarioDTO {
    constructor(ID, rol, tarea, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, email, edad, documento, genero, ID2) {
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
__decorate([
    Expose({ name: 'id_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "id_usuario", void 0);
__decorate([
    Expose({ name: 'rol_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato rol_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "rol_usuario", void 0);
__decorate([
    Expose({ name: 'tarea_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato tarea_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "tarea_usuario", void 0);
__decorate([
    Expose({ name: 'nombre_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro nombre_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "nombre_usuario", void 0);
__decorate([
    Expose({ name: 'segundo_nombre_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro segundo_nombre_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro segundo_nombre_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "segundo_nombre_usuario", void 0);
__decorate([
    Expose({ name: 'apellido_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro apellido_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro apellido_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "apellido_usuario", void 0);
__decorate([
    Expose({ name: 'segundo_apellido_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro segundo_apellido_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro segundo_apellido_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "segundo_apellido_usuario", void 0);
__decorate([
    Expose({ name: 'telefono_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro telefono_usuario es obligatorio` }}})
    @MaxLength(15, {message: ()=>{throw {status: 401, message: `El parametro telefono_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "telefono_usuario", void 0);
__decorate([
    Expose({ name: 'email_usuario' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro email_usuario es obligatorio` }}})
    @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro email_usuario no puede pasar os 45 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.@]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato email_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "email_usuario", void 0);
__decorate([
    Expose({ name: 'edad_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato edad_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "edad_usuario", void 0);
__decorate([
    Expose({ name: 'tipodoc_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato tipodoc_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "tipodoc_usuario", void 0);
__decorate([
    Expose({ name: 'genero_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato genero_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "genero_usuario", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "id", void 0);
