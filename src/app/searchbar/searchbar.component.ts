import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenreModel } from '../shared/models/genre.model';
import { StatutModel } from '../shared/models/statut.model';
import { GenreService } from '../shared/services/genre.service';
import { OeuvreService } from '../shared/services/oeuvre.service';
import { StatutService } from '../shared/services/statut.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  subscriptionGenre:Subscription = new Subscription();
  subscriptionStatut:Subscription = new Subscription();

  types: string[] = ['Tous', 'Série', 'Film'];
  genres:Array<GenreModel> = [];
  statuts:Array<StatutModel> = [];



  genresParDefaut: string[] = ['Tous'];
  valeurParDefaut: string = 'Tous';

  constructor(public statutService:StatutService, public genreService:GenreService,public oeuvreService:OeuvreService) {
    console.log(this);
  }

  ngOnInit(): void {

    // Souscription observable return par la méthode genres§ (get)
    this.genreService.genres$.subscribe( (genreData:Array<GenreModel>) => {

      //--> Réponse vide : appel à la méthode getGenres()
      //-->  1. init requête HTTP Get
      //-->  2. subscribe() à la réponse HTTP (observable)
      //-->  3. next() dans _genre$ (subject) return en observable part la méthode genre$
      if(genreData.length==0) {
        this.genreService.getGenres()
        console.log("first init genre");
        console.log(genreData);
      }
      //--> Réponse non vide : utilisation directe réponse dans l'observable return par la méthode genre
      else {
        this.genres = genreData;
        console.log("data inchangé genre");
        console.log(genreData);
      }
    });

    this.statutService.statuts$.subscribe( (statutData:Array<StatutModel>) => {
      if(statutData.length==0) {
        this.statutService.getStatuts()
        console.log("first init statut");
        console.log(statutData);
      }
      else {
        this.statuts = statutData;
        console.log("data inchangé statut");
        console.log(statutData);
      }
    });
  }

  searchOeuvresInput(texte:string){
    console.log(texte);
    this.oeuvreService.searchOeuvres(texte);
  }
}
