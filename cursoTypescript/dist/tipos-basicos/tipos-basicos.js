"use strict";
var numeroEstudiantes;
numeroEstudiantes = 56;
console.log('Numero de estudiantes ', numeroEstudiantes);
var cursoIniciado = true;
cursoIniciado = false;
var nombreCurso = 'Angular desde cero';
var contenidoCurso = "\nHerraminetas de desarrollo\nIntroduccion a Typescript\n";
console.log('nombreCurso: ', nombreCurso);
console.log('contenidoCurso: ', contenidoCurso);
var bienvenida = "Bienvenidos al curso " + nombreCurso;
console.log('bienvenidos: ', bienvenida);
var arregloA = [1, 2, 3, 4, 5, 6];
console.log('arregloA:', arregloA);
var arregloB;
arregloB = ['a', 'b', 'c'];
console.log('arregloB:', arregloB);
//typeScript Enums
var DiaCurso;
(function (DiaCurso) {
    DiaCurso[DiaCurso["MARTES"] = 0] = "MARTES";
    DiaCurso[DiaCurso["VIERNES"] = 1] = "VIERNES";
})(DiaCurso || (DiaCurso = {}));
;
var DiasSemana;
(function (DiasSemana) {
    DiasSemana[DiasSemana["LUNES"] = 0] = "LUNES";
    DiasSemana[DiasSemana["MARTES"] = 1] = "MARTES";
    DiasSemana[DiasSemana["MIERCOLES"] = 2] = "MIERCOLES";
    DiasSemana[DiasSemana["JUEVES"] = 3] = "JUEVES";
    DiasSemana[DiasSemana["VIERNES"] = 4] = "VIERNES";
})(DiasSemana || (DiasSemana = {}));
;
var primerDia;
primerDia = DiaCurso.MARTES;
console.log('primerDia', DiaCurso.MARTES);
console.log('primerDia(string)', DiaCurso[0]);
console.log('primerDia(string): ', DiaCurso[DiaCurso.MARTES]);
//no es recomendado
var miVariable;
miVariable = 5;
miVariable = 'hola mundo';
miVariable = true;
var PI = 3.14;
var persona = {
    nombre: 'Andres',
    curso: 'Angular'
};
var PERSONA = {
    nombre: 'Andres',
    curso: 'Angular'
};
console.log('PERSONA', PERSONA);
//Mutacion del objeto (Se puede)
PERSONA.nombre = 'juan';
PERSONA.curso = 'AngularJS';
console.log('PERSONA', PERSONA);
function holaMundo() {
    return 'hola mundo';
}
function saludar(mensaje) {
    console.log('saludo', mensaje);
}
saludar('Me gusta typescript');
