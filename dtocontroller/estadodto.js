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
export class estadoDTO {
    constructor(ID, estado, ID2) {
        this.id_estado = ID;
        this.tipo_estado = estado;
        this.id = ID2;
    }
}
__decorate([
    Expose({ name: 'id_estado' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || typeof value == "undefined")
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id_estado incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], estadoDTO.prototype, "id_estado", void 0);
__decorate([
    Expose({ name: 'tipo_estado' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tipo_estado es obligatorio` }}}) */
    /* @MaxLength(30, {message: ()=>{throw {status: 401, message: `El parametro tipo_estado no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value) || typeof value == "undefined")
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], estadoDTO.prototype, "tipo_estado", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || typeof value == "undefined")
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], estadoDTO.prototype, "id", void 0);
