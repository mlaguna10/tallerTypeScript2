export class Student {
    codigo: number;
    cedula: number;
    edad: string;
    telefono: number;
  
    constructor(codigo: number, cedula:number, edad:string, telefono:number) {
      this.codigo = codigo;
      this.cedula = cedula;
      this.edad = edad;
      this.telefono = telefono;
    }
  }