import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GenreModel } from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private _API_URL = "http://localhost:8080";

  private _genres$ = new BehaviorSubject<GenreModel[]>([]);

  constructor(private httpClient:HttpClient) { }

  getGenres():void {
    // récupération des statuts via le endpoint /mes_oeuvres de l'API backend
    this.httpClient.get(this._API_URL+'/genres')
        .pipe (
          // mapping de la réponse en tableau d'objets de type OeuvreModel
          map(
            (apiResponse:any) => apiResponse.genres.map( (genre:any) => new GenreModel(genre) )
          ) // fin map
        ) // fin pipe
       .subscribe(
         (response:Array<GenreModel>) => this._genres$.next(response)
       )
     }

  get genres$():Observable<GenreModel[]> {
    return this._genres$.asObservable();
  }

  set genres$(genres:any) {
    this._genres$.next(genres)
  }
}
