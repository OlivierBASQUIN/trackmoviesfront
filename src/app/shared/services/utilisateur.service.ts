import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilisateurModel } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  /*
  Gestion affichage utilisateur dans le header avec subject
  */
  private _statutUtilisateur$ = new BehaviorSubject<UtilisateurModel>(new UtilisateurModel('',false));

  constructor() { }

  setStatutUtilisateur(utilisateur: UtilisateurModel): void {

    this._statutUtilisateur$.next(utilisateur);

  }

  get statutUtilisateur$():Observable<UtilisateurModel> {

    return this._statutUtilisateur$.asObservable();
  }
}
