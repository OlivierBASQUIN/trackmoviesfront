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
  genresParDefaut: string[] = ['Tous'];
  valeurParDefaut: string = 'Tous';

  constructor(public statutService:StatutService, public genreService:GenreService,public oeuvreService:OeuvreService) {
    console.log(this);
  }

  ngOnInit(): void {

    this.subscriptionGenre  = this.genreService.genres$.subscribe( (data:Array<GenreModel>) => this.genreService.getGenres());
    this.subscriptionStatut = this.statutService.statuts$.subscribe( (data:Array<StatutModel>) => this.statutService.getStatuts());

  }

  searchOeuvresInput(texte:string){
    console.log(texte);
    this.oeuvreService.searchOeuvres(texte);
  }
}
