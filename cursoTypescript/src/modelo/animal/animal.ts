export abstract class Animal {
    
    constructor(protected _nombre: string) {
        
    }

    // setNombre(nombre: string): void{
    //     this.nombre = nombre;
    // }

    set nombre(nombre:string){
        if (nombre.length <= 3) {
            console.log('Nombre muy corto ', nombre.length);
            return;
        }
        this._nombre = nombre;
    }   

    // getNombre(): string{
    //     return this._nombre;
    // }

    get nombre(): string{
        return `[gato cool: ${this._nombre}]`;
    }

    abstract desplazar(): void;
}