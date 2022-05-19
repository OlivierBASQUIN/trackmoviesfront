import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OeuvreDetailModel } from '../shared/models/oeuvre-detail.model';
import { OeuvreService } from '../shared/services/oeuvre.service';

@Component({
  selector: 'app-detail-oeuvre',
  templateUrl: './detail-oeuvre.component.html',
  styleUrls: ['./detail-oeuvre.component.css']
})
export class DetailOeuvreComponent implements OnInit {

  oeuvreDetailId:number = 0

  subscriptions:Subscription[] = [] ;
  constructor( private activatedRoute:ActivatedRoute, 
               public oeuvreService:OeuvreService,
               private sanitizer: DomSanitizer
               ) { }

  ngOnInit(): void {

    console.log(this.activatedRoute.snapshot.params); // renvoie l'objet lié à l'id présent dans l'url 

    //Récupérer l'ID de l'oeuvreDetail' dans l'URL
    this.oeuvreDetailId = this.activatedRoute.snapshot.params['id'];

    this.subscriptions.push(this.oeuvreService.oeuvreDetail$.subscribe( 
      (data:OeuvreDetailModel) => { 
        if(data == undefined  || data == null || data.id != this.oeuvreDetailId) {
          this.oeuvreService.getOeuvreById(this.oeuvreDetailId);
        }
      } 
    )
  )
  console.log(this.oeuvreService.oeuvreDetail$)

} // Fin ngOnInit

  getUrlAffiche(movieImageString:string | null ):string {
    return (movieImageString!=null &&movieImageString!='')
            ? 'https://image.tmdb.org/t/p/w500'+ movieImageString
            : 'https://via.placeholder.com/500x281.png?text=no+images'
  }

  getVideoUrl(videoKey:string) {
    let url =  'https://www.youtube.com/embed/'+ videoKey;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}


