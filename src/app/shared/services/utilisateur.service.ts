import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilisateurModel } from '../models/utilisateur.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  /**
   * Gestion affichage utilisateur dans le header avec subject
   */
  private _statutUtilisateur$ = new BehaviorSubject<UtilisateurModel>(new UtilisateurModel('',false));

  constructor(tokenService: TokenStorageService ) {
  /**
   * Gestion du refresh
   */
    if(tokenService.getToken()) {
      let utilisateurConnecte = new UtilisateurModel(tokenService.getUser().identifiant,true);
      this.setStatutUtilisateur(utilisateurConnecte);
    }
  }

  setStatutUtilisateur(utilisateur: UtilisateurModel): void {

    this._statutUtilisateur$.next(utilisateur);

  }

  get statutUtilisateur$():Observable<UtilisateurModel> {
    console.log('get StatutUtilisateur$()');
    return this._statutUtilisateur$.asObservable();
  }
}
