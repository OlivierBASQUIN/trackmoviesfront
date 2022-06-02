import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  signOut(): void {
    console.log('signOut');
    console.log('TOKEN_KEY avant clear/removeItem : ' + window.sessionStorage.getItem(TOKEN_KEY));
    //sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.clear();
    console.log('TOKEN_KEY après removeItem : ' + window.sessionStorage.getItem(TOKEN_KEY));
    //sessionStorage.removeItem(USER_KEY);
    }

  public saveToken(token: string): void {
    console.log('TokenStorageService::saveToken, TOKEN_KEY avant save : ' + window.sessionStorage.getItem(TOKEN_KEY));
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log('TokenStorageService::saveToken, TOKEN_KEY après save : ' + window.sessionStorage.getItem(TOKEN_KEY));
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    //console.log('saveUser, USER_KEY : ' + USER_KEY  );

  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
