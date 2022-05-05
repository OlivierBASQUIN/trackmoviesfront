import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StatutModel } from '../models/statut.model';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  private _API_URL = "http://localhost:8080";

  private _statuts$ = new BehaviorSubject<StatutModel[]>([]);

  constructor(private httpClient:HttpClient) { }

  getStatuts():void {
    // récupération des statuts via le endpoint /mes_oeuvres de l'API backend
    this.httpClient.get(this._API_URL+'/statuts')
        .pipe (
          // mapping de la réponse en tableau d'objets de type OeuvreModel
          map(
            (apiResponse:any) => apiResponse.statuts.map( (statut:any) => new StatutModel(statut) )
          ) // fin map
        ) // fin pipe
       .subscribe(
         (response:Array<StatutModel>) => this._statuts$.next(response)
       )
     }

  get statuts$():Observable<StatutModel[]> {
    return this._statuts$.asObservable();
  }

  set statuts$(statuts:any) {
    this._statuts$.next(statuts)
  }
}
