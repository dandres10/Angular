let numeroEstudiantes: number;
numeroEstudiantes = 56;
console.log('Numero de estudiantes ',numeroEstudiantes);

let cursoIniciado = true;
cursoIniciado = false;

let nombreCurso: string = 'Angular desde cero';
let contenidoCurso:string = `
Herraminetas de desarrollo
Introduccion a Typescript
`;

console.log('nombreCurso: ', nombreCurso);
console.log('contenidoCurso: ', contenidoCurso);

let bienvenida: string = `Bienvenidos al curso ${nombreCurso}`;
console.log('bienvenidos: ', bienvenida);

let arregloA: number[] = [1,2,3,4,5,6];
console.log('arregloA:' ,arregloA);

let arregloB: Array<string>;
arregloB = ['a','b','c'];
console.log('arregloB:', arregloB);

//typeScript Enums
enum DiaCurso {MARTES,VIERNES};
enum DiasSemana{LUNES,MARTES,MIERCOLES,JUEVES,VIERNES};

let primerDia: DiaCurso;
primerDia = DiaCurso.MARTES;
console.log('primerDia', DiaCurso.MARTES);
console.log('primerDia(string)', DiaCurso[0]);
console.log('primerDia(string): ', DiaCurso[DiaCurso.MARTES]);


//no es recomendado
let miVariable: any;
miVariable = 5;
miVariable ='hola mundo';
miVariable = true;


const PI = 3.14;

let persona:any ={
    nombre: 'Andres',
    curso: 'Angular'
}


const PERSONA:any = {
    nombre: 'Andres',
    curso: 'Angular'
}
console.log('PERSONA', PERSONA);

//Mutacion del objeto (Se puede)
PERSONA.nombre = 'juan';
PERSONA.curso = 'AngularJS';
console.log('PERSONA', PERSONA);


function holaMundo(): string {
    return 'hola mundo';
}

function saludar(mensaje: string): void{
    console.log('saludo', mensaje);
}


saludar('Me gusta typescript');

