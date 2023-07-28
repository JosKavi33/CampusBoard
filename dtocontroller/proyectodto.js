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
import { IsNumber, IsString, IsDate } from 'class-validator';
export class proyectoDTO {
    constructor(id_proyecto, nombre_proyecto, estado_proyecto, tiempo_inicio_proyecto, tiempo_entrega_proyecto, id) {
        this.ID = id_proyecto;
        this.proyecto = nombre_proyecto;
        this.estado = estado_proyecto;
        this.tiempo_inicio = tiempo_inicio_proyecto;
        this.tiempo_entrega = tiempo_entrega_proyecto;
        this.ID2 = id;
    }
}
__decorate([
    Expose({ name: 'id_proyecto' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato proyecto incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], proyectoDTO.prototype, "ID", void 0);
__decorate([
    Expose({ name: 'nombre_proyecto' }),
    IsString()
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro nombre_proyecto es obligatorio` }}})
    @MaxLength(80, {message: ()=>{throw {status: 401, message: `El parametro nombre_proyecto no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato proyecto incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], proyectoDTO.prototype, "proyecto", void 0);
__decorate([
    Expose({ name: 'estado_proyecto' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato estado incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], proyectoDTO.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'tiempo_inicio_proyecto' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para tiempo inicio no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], proyectoDTO.prototype, "tiempo_inicio", void 0);
__decorate([
    Expose({ name: 'tiempo_entrega_proyecto' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para tiempo entrega no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], proyectoDTO.prototype, "tiempo_entrega", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], proyectoDTO.prototype, "ID2", void 0);
