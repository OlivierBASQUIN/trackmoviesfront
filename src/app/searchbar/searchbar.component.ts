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

  types: string[] = ['Tous', 'Série', 'Film'];

  constructor(public statutService:StatutService, public genreService:GenreService,public oeuvreService:OeuvreService) {
    console.log(this);
  }

  ngOnInit(): void {

    // Souscription observable return par la méthode genres§

    this.genreService.genres$.subscribe( (genreData:Array<GenreModel>) => {

      //--> Réponse vide : appel à la méthode getGenres()
      //-->  1. init requête HTTP Get
      //-->  2. subscribe() à la réponse HTTP (observable)
      //-->  3. next() dans _genre$ (subject) return en observable part la méthode genres$

      if(genreData.length==0) {
        this.genreService.getGenres()
      }
    });

    // Souscription observable return par la méthode statuts§

    this.statutService.statuts$.subscribe( (statutData:Array<StatutModel>) => {

      //--> Réponse return par observable vide : appel à la méthode getStatuts()
      //-->  1. init requête HTTP (get)
      //-->  2. subscribe() à la réponse HTTP (observable)
      //-->  3. next() dans _statuts$ (subject) return en observable part la méthode statuts$

      if(statutData.length==0) {
        this.statutService.getStatuts()
      }
    });
  }

  searchOeuvresInput(texte:string){
    console.log(texte);
    this.oeuvreService.searchOeuvres(texte);
  }
}
