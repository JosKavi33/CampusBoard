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
import { IsNumber, MaxLength, IsDefined } from 'class-validator';
export class rolDTO {
    constructor(ID, rol) {
        this.id_rol = ID;
        this.nombre_rol = rol;
    }
}
__decorate([
    Expose({ name: 'id_rol' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id_rol incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], rolDTO.prototype, "id_rol", void 0);
__decorate([
    Expose({ name: 'nombre_rol' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro nombre_rol es obligatorio` }; } }),
    MaxLength(30, { message: () => { throw { status: 401, message: `El parametro nombre_rol no puede pasar os 30 caracteres` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], rolDTO.prototype, "nombre_rol", void 0);
