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
import { IsNumber, IsDate } from 'class-validator';
export class tareasDTO {
    constructor(ID, tarea, estado, inicio, entrega, ID2) {
        this.id_tarea = ID;
        this.tarea_asignada = tarea;
        this.estado_tarea = estado;
        this.tiempo_inicio = inicio;
        this.tiempo_entrega = entrega;
        this.id = ID2;
    }
}
__decorate([
    Expose({ name: 'id_tarea' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id_tarea incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], tareasDTO.prototype, "id_tarea", void 0);
__decorate([
    Expose({ name: 'tarea_asignada' })
    /* @IsDefined({message: ()=>{throw {status: 401, message: `El parametro tarea_asignada es obligatorio` }}})
    @MaxLength(80, {message: ()=>{throw {status: 401, message: `El parametro tarea_asignada no puede pasar os 30 caracteres`}}}) */
    ,
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], tareasDTO.prototype, "tarea_asignada", void 0);
__decorate([
    Expose({ name: 'estado_tarea' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato estado_tarea incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], tareasDTO.prototype, "estado_tarea", void 0);
__decorate([
    Expose({ name: 'tiempo_inicio' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para tiempo_inicio no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], tareasDTO.prototype, "tiempo_inicio", void 0);
__decorate([
    Expose({ name: 'tiempo_entrega' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para tiempo_entrega no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], tareasDTO.prototype, "tiempo_entrega", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], tareasDTO.prototype, "id", void 0);
