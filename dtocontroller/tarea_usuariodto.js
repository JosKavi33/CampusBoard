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
export class tarea_usuarioDTO {
    constructor(id_tarea_usuario, id_tarea, id_usuario, id) {
        this.ID = id_tarea_usuario;
        this.tarea = id_tarea;
        this.usuario = id_usuario;
        this.ID2 = id;
    }
}
__decorate([
    Expose({ name: 'id_tarea_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato tarea_usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], tarea_usuarioDTO.prototype, "ID", void 0);
__decorate([
    Expose({ name: 'id_tarea' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato tarea incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], tarea_usuarioDTO.prototype, "tarea", void 0);
__decorate([
    Expose({ name: 'id_usuario' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato usuario incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], tarea_usuarioDTO.prototype, "usuario", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], tarea_usuarioDTO.prototype, "ID2", void 0);
