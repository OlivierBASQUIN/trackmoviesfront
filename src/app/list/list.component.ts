import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OeuvreModel } from '../shared/models/oeuvre.model';
import { OeuvreService } from '../shared/services/oeuvre.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  oeuvres:Array<OeuvreModel> = [];
  //subscriptionOeuvre:Subscription = new Subscription();

  constructor(public oeuvreService:OeuvreService) {
    console.log(this);
  }

  ngOnInit(): void {
    //this.subscriptionOeuvre = this.oeuvreService.oeuvres$.subscribe( (data:Array<OeuvreModel>) => this.oeuvreService.getOeuvresInitiales() );
  }

  //ngOnDestroy() {
  //  this.subscriptionOeuvre.unsubscribe();
  //}

  oeuvresSuivantesActionBouton(){
    this.oeuvreService.getOeuvresSuivantes();
  }
}
