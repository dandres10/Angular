"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gato_1 = require("./modelo/animal/gato");
var gato;
gato = new gato_1.Gato('Misifu', 'Siames');
console.log('gato: ', gato);
gato.desplazar();
//Conversion de tipo (Casting)
gato.ronronear();
//set nombre
gato.nombre = 'Tom';
console.log('gato.nombre', gato.nombre);
gato.ronronear();
