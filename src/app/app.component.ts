import { Component } from '@angular/core';
import { UtilisateurModel } from './shared/models/utilisateur.model';
import { TokenStorageService } from './shared/services/token-storage.service';
import { UtilisateurService } from './shared/services/utilisateur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trackMovies';

  connexionUtilisateur = false;
  identifiantUtilisateur !: string;

  constructor(private tokenService: TokenStorageService, private utilisateurService: UtilisateurService){ }

  ngOnInit(): void {

    this.utilisateurService.statutUtilisateur$.subscribe( data => {
      this.connexionUtilisateur = data.statutConnexion;
      this.identifiantUtilisateur = data.identifiant;
    })
  }

  logout(): void {
    this.connexionUtilisateur = false;
    this.tokenService.signOut();
  }
}
