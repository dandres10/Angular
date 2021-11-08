import { Injectable } from '@angular/core';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  listPerson: Person[] =
    [
      {
        id: 1,
        nombre: 'Camila',
        edad: 25
      },
      {
        id: 2,
        nombre: 'Camilo',
        edad: 30
      },
      {
        id: 3,
        nombre: 'Mauricio',
        edad: 35
      },
      {
        id: 4,
        nombre: 'Andrea',
        edad: 18
      },
      {
        id: 5,
        nombre: 'Felipe',
        edad: 15
      },
      {
        id: 6,
        nombre: 'Carlos',
        edad: 38
      }
    ];

  constructor() { }

  getListPerson() {
    return this.listPerson;
  }
}
