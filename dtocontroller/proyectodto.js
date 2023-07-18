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
import { IsNumber, MaxLength, IsDefined, IsDate } from 'class-validator';
export class proyectoDTO {
    constructor(ID, tarea, estado, inicio, entrega) {
        this.id_proyecto = ID;
        this.nombre_proyecto = tarea;
        this.estado_proyecto = estado;
        this.tiempo_inicio_proyecto = inicio;
        this.tiempo_entrega_proyecto = entrega;
    }
}
__decorate([
    Expose({ name: 'id_proyecto' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id_proyecto incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], proyectoDTO.prototype, "id_proyecto", void 0);
__decorate([
    Expose({ name: 'nombre_proyecto' }),
    IsDefined({ message: () => { throw { status: 401, message: `El parametro nombre_proyecto es obligatorio` }; } }),
    MaxLength(80, { message: () => { throw { status: 401, message: `El parametro nombre_proyecto no puede pasar os 30 caracteres` }; } }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ 0-9]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato tipo_categoria incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], proyectoDTO.prototype, "nombre_proyecto", void 0);
__decorate([
    Expose({ name: 'estado_proyecto' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato estado_proyecto incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], proyectoDTO.prototype, "estado_proyecto", void 0);
__decorate([
    Expose({ name: 'tiempo_inicio_proyecto' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para tiempo_inicio_proyecto no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], proyectoDTO.prototype, "tiempo_inicio_proyecto", void 0);
__decorate([
    Expose({ name: 'tiempo_entrega_proyecto' }),
    IsDate(),
    Transform(({ value }) => { if (/^\d{4}-\d{2}-\d{2}$/.test(value) || value == undefined)
        return (value);
    else
        throw { status: 400, message: `el parámetro ingresado para tiempo_entrega_proyecto no es válido, debe seguir la sintaxis AAAA-MM-DD` }; }, { toClassOnly: true }),
    __metadata("design:type", Date)
], proyectoDTO.prototype, "tiempo_entrega_proyecto", void 0);
