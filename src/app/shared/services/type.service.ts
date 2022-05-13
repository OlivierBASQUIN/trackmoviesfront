import { Injectable } from '@angular/core';
import { TypeModel } from '../models/type.model';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  types: TypeModel[] = [
    {
      id: -1,
      libelle: 'tous',
    },
    {
      id: 0,
      libelle: 'film',
    },
    {
      id: 1,
      libelle: 'serie',
    }

  ]
  constructor() { }

  getTypes(): TypeModel[] {
    return this.types;
  }
}
