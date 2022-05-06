import { Component, OnInit } from '@angular/core';
import { OeuvreModel } from '../shared/models/oeuvre.model';
import { OeuvreService } from '../shared/services/oeuvre.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //oeuvres:Array<OeuvreModel> = [];

  constructor(public oeuvreService:OeuvreService) {
  //  console.log(this);
  }

  ngOnInit(): void {
    this.oeuvreService.oeuvres$.subscribe( (data:Array<OeuvreModel>) => {
      if(data.length==0) {
        this.oeuvreService.getOeuvresInitiales()
      //  console.log("first init");
      //  console.log(data);
      }
      //else {
      //  this.oeuvres = data;
      //  console.log("data inchangé");
      //  console.log(data);
      //}
    });
  }

  oeuvresSuivantesActionBouton(){
    this.oeuvreService.getOeuvresSuivantes();
  }
}
