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

  oeuvreId:number = 0

  subscriptions:Subscription[] = [] ;
  constructor( private activatedRoute:ActivatedRoute, 
               public oeuvreService:OeuvreService,
               private sanitizer: DomSanitizer
               ) { }

  ngOnInit(): void {

    console.log(this.activatedRoute.snapshot.params); // renvoie un objet des paramètres nommés de l'url {id:3}

    //Récupérer l'ID de l'oeuvre' dans l'URL
    this.oeuvreId = this.activatedRoute.snapshot.params['id'];

    this.subscriptions.push(this.oeuvreService.oeuvre$.subscribe( 
      (data:OeuvreDetailModel) => { 
        if(data == undefined  || data == null || data.id != this.oeuvreId) {
          this.oeuvreService.getOeuvreById(this.oeuvreId);
        }
      } 
    )
  )
  console.log(this.oeuvreService.oeuvre$)

} // Fin ngOnInit

  getUrlAffiche(movieImageString:string | null ):string {
    return (movieImageString!=null &&movieImageString!='')
            ? 'https://image.tmdb.org/t/p/w500'+movieImageString
            : 'https://via.placeholder.com/500x281.png?text=no+images'
  }

  getVideoUrl(videoKey:string) {
    let url =  'https://www.youtube.com/embed/'+videoKey;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}


