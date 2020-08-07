"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animal = /** @class */ (function () {
    function Animal(_nombre) {
        this._nombre = _nombre;
    }
    Object.defineProperty(Animal.prototype, "nombre", {
        // getNombre(): string{
        //     return this._nombre;
        // }
        get: function () {
            return "[gato cool: " + this._nombre + "]";
        },
        // setNombre(nombre: string): void{
        //     this.nombre = nombre;
        // }
        set: function (nombre) {
            if (nombre.length <= 3) {
                console.log('Nombre muy corto ', nombre.length);
                return;
            }
            this._nombre = nombre;
        },
        enumerable: true,
        configurable: true
    });
    return Animal;
}());
exports.Animal = Animal;
