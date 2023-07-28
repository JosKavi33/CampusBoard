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
export class telefonoDTO {
    constructor(id_telefono, numero_telefono, usuario_telefono, id) {
        this.ID = id_telefono;
        this.numero = numero_telefono;
        this.usuario = usuario_telefono;
        this.ID2 = id;
    }
}
__decorate([
    Expose({ name: 'id_telefono' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato telefono incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], telefonoDTO.prototype, "ID", void 0);
__decorate([
    Expose({ name: 'numero_telefono' }),
    IsString()
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_usuario es obligatorio` }}})
    @MaxLength(20, {message: ()=>{throw {status: 401, message: `El parametro nombre_usuario no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato numero incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], telefonoDTO.prototype, "numero", void 0);
__decorate([
    Expose({ name: 'usuario_telefono' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], telefonoDTO.prototype, "usuario", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], telefonoDTO.prototype, "ID2", void 0);
