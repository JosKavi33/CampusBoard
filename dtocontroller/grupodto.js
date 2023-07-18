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
export class grupoDTO {
    constructor(ID, desarrollador, proyecto, ID2) {
        this.id_grupo = ID;
        this.desarrollador_grupo = desarrollador;
        this.proyecto_grupo = proyecto;
        this.id = ID2;
    }
}
__decorate([
    Expose({ name: 'id_grupo' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id_grupo incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], grupoDTO.prototype, "id_grupo", void 0);
__decorate([
    Expose({ name: 'desarrollador_grupo' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato desarrollador_grupo incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], grupoDTO.prototype, "desarrollador_grupo", void 0);
__decorate([
    Expose({ name: 'proyecto_grupo' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato proyecto_grupo incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], grupoDTO.prototype, "proyecto_grupo", void 0);
__decorate([
    Expose({ name: 'id' }),
    IsNumber(),
    Transform(({ value }) => { if (/^[0-9]+$/.test(value) || value == undefined)
        return Math.floor(value);
    else
        throw { status: 400, message: `El dato id incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", Number)
], grupoDTO.prototype, "id", void 0);
