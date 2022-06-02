import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _API_URL = 'http://localhost:8080/trackmovies/v1';
  //private _HTTP_OPTIONS = { headers: ({ 'Content-Type': 'application/json' })};

  constructor(private httpClient: HttpClient) {}

  login(loginInput: LoginModel): Observable<any> {

    let endPoint = '/login';
   
    return this.httpClient.post(this._API_URL + endPoint, loginInput)
   
  }

  /*
  enregistrer(identifiant: string, motDePasse: string): Observable<any> {
    let endPoint = '/enregistrer';
    return this.httpClient.post(this._API_URL + endPoint, { identifiant, motDePasse }, this._HTTP_OPTIONS)
  }*/
}
