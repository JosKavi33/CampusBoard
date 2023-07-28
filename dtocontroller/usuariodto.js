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
import { IsNumber, IsString } from 'class-validator';
export class usuarioDTO {
    constructor(id_usuario, nombre_usuario, numero_documento_usuario, tipo_documento_usuario, direccion_usuario, edad_usuario, genero_usuario, id) {
        this.ID = id_usuario;
        this.nombre = nombre_usuario;
        this.numero_documento = numero_documento_usuario;
        this.tipo_documento = tipo_documento_usuario;
        this.direccion = direccion_usuario;
        this.edad = edad_usuario;
        this.genero = genero_usuario;
        this.ID2 = id;
    }
}
__decorate([
    Expose({ name: 'id_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "ID", void 0);
__decorate([
    Expose({ name: 'nombre_completo_usuario' }),
    IsString()
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro nombre_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'numero_documento_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato documento incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "numero_documento", void 0);
__decorate([
    Expose({ name: 'tipo_documento_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato usu_direccion incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "tipo_documento", void 0);
__decorate([
    Expose({ name: 'direccion_usuario' }),
    IsString()
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro telefono_usuario es obligatorio` }}})
    @MaxLength(15, {message: ()=>{throw {status: 401, message: `El parametro telefono_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑüÜ\s,.# @]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato usu_direccion incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], usuarioDTO.prototype, "direccion", void 0);
__decorate([
    Expose({ name: 'edad_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato edad_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "edad", void 0);
__decorate([
    Expose({ name: 'genero_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato genero_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "genero", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], usuarioDTO.prototype, "ID2", void 0);
