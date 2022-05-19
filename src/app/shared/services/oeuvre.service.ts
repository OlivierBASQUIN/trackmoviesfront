import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { OeuvreDetailModel } from '../models/oeuvre-detail.model';
import { OeuvreModel } from '../models/oeuvre.model';

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {

  private _API_URL = "http://localhost:8080/trackmovies/v1/";
  private _oeuvres$ = new BehaviorSubject<OeuvreModel[]>([]);
  private _oeuvresTrouvees$ = new BehaviorSubject<OeuvreModel[]>([]);
  private _oeuvreDetail$ = new BehaviorSubject<OeuvreDetailModel>(null!);
  private _parametreRechercheExiste = false;

  constructor(private httpClient:HttpClient) { }

    /*
      Role         : request api trackMoviesBack pour rechercher des films
      Endpoint     : /mes_oeuvres
      QueryString  : type, genre, statut, titre
    */

     getOeuvresInitiales():void {
      console.log('getOeuvresInitiales()');
      // récupération des oeuvres via le endpoint /mes_oeuvres de l'API backend
      this.httpClient.get(this._API_URL+'/mes_oeuvres')
        .pipe (
          // mapping de la réponse en tableau d'objets de type OeuvreModel
          map(
            (reponseApi:any) => reponseApi.oeuvres.map( (oeuvre:OeuvreModel) => new OeuvreModel(oeuvre) )
          ) // fin map
        ) // fin pipe
       .subscribe(
         (reponse:Array<OeuvreModel>) => this._oeuvres$.next(reponse)
       )
     }

     getOeuvresSuivantes():void {
      // récupération des oeuvres via le endpoint /mes_oeuvres de l'API backend
      this.httpClient.get(this._API_URL+'/mes_oeuvres')
        .pipe (
          // mapping de la réponse en tableau d'objets de type OeuvreModel
          map(
            (reponseApi:any) => reponseApi.oeuvres.map( (oeuvre:any) => new OeuvreModel(oeuvre) )
          ) // fin map
        ) // fin pipe
       .subscribe(
         (reponse:Array<OeuvreModel>) => { let oeuvres = [...this._oeuvres$.getValue(), ... reponse];
          this._oeuvres$.next(oeuvres);}
       )
     }

     searchOeuvres(texteRecherche:string, selectionType:string, selectionStatut: string, selectionGenre: string):void {

      this._parametreRechercheExiste = false;
      let endPoint = '/mes_oeuvres';
      let parametres = new HttpParams();

      if ((selectionType !== '')  && (selectionType !== 'tous'))  { parametres = parametres.append('type', selectionType); this._parametreRechercheExiste = true;  }
      if ((selectionStatut !== '') && (+selectionStatut !== -1)) { parametres = parametres.append('statut', selectionStatut); this._parametreRechercheExiste = true;}
      if ((selectionGenre !== '') && (+selectionGenre !== -1))   { parametres = parametres.append('genre', selectionGenre); this._parametreRechercheExiste = true; }
      if  (texteRecherche.trim().length > 0)                      { parametres = parametres.append('titre', texteRecherche); this._parametreRechercheExiste = true;}

      //console.log(parametres);
      console.log('httpClient.get');
      this.httpClient.get( this._API_URL + endPoint, {params:parametres} )
      .pipe (
        // mapping de la réponse en tableau d'objets de type OeuvreModel
        map(
          (reponseApi:any) => reponseApi.oeuvres.map( (oeuvre:any) => new OeuvreModel(oeuvre) )
        ) // fin map
      ) // fin pipe
     .subscribe(
       (reponse:Array<OeuvreModel>) => this._oeuvres$.next(reponse))
      }

      getParametreRechercheExiste(): boolean {
        return this._parametreRechercheExiste;
      }

  
      /*
      Role         : request api trackMoviesBack pour rechercher une oeuvre par son id
      Endpoint     : /mes_oeuvres/{id}
    */
      public getOeuvreById(movieId:number) {
        // récupération d'une oeuvre via le endpoint /mes_oeuvres/{id} de l'API backend
        this.httpClient.get(this._API_URL+'/mes_oeuvres/'+movieId)
        .pipe( 
           // mapping de la réponse en objet Oeuvre de type OeuvreDetailModel
           map( 
             (reponseApi:any) => 
             new OeuvreDetailModel(reponseApi)
           ) // fin map
         ) // fin pipe() retourne un Observable
        .subscribe(
          (response:OeuvreDetailModel) => {
            console.log(response)
            this._oeuvreDetail$.next(response)
           }
        )
      }

      /*
    Role        : Getter _oeuvres$
    Return      : Observable
    Consommable : this.movieService.oeuvres$.subscribe()
  */

    get oeuvres$():Observable<OeuvreModel[]> {
    return this._oeuvres$.asObservable();
  }

        /*
    Role        : Getter _oeuvre$
    Return      : Observable
    Consommable : this.movieService.oeuvre$.subscribe()
  */

    get oeuvreDetail$():Observable<OeuvreDetailModel> {
      return this._oeuvreDetail$.asObservable();
    }

        /*
    Role        : Setter _oeuvre$
    Return      : OeuvreDetailModel
  */

     setOeuvreDetail(oeuvreDetail:OeuvreDetailModel){
       return this._oeuvreDetail$.next(oeuvreDetail);
     }

  /*
    Role        : Getter _oeuvresTrouvees$
    Return      : Observable
    Consommable : this.movieService.oeuvresTrouvees$.subscribe()
  */

    get oeuvresTrouvees$():Observable<OeuvreModel[]> {
      return this._oeuvresTrouvees$.asObservable();
    }
}
