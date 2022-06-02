import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { GenreModel } from '../shared/models/genre.model';
import { StatutModel } from '../shared/models/statut.model';
import { TypeModel } from '../shared/models/type.model';
import { GenreService } from '../shared/services/genre.service';
import { OeuvreService } from '../shared/services/oeuvre.service';
import { StatutService } from '../shared/services/statut.service';
import { TypeService } from '../shared/services/type.service';

@Component({
  selector: 'app-formulaire-edition-oeuvre',
  templateUrl: './formulaire-edition-oeuvre.component.html',
  styleUrls: ['./formulaire-edition-oeuvre.component.css'],
})
export class FormulaireEditionOeuvreComponent implements OnInit {
  private _URL_YOUTUBE="https://www.youtube.com/embed/";

  //a supprimer: sert  pour debug en json
  oeuvreASauverJson : any;

  subscriptions:Subscription[] =[];

  oeuvreForm: FormGroup;
  isOeuvreSauvee :boolean = false ;

  types!: TypeModel[];
  selectionType: string = '';

  genres!: GenreModel[];
  selectedGenres:GenreModel[]=[];

  statutVisionnages!: StatutModel[];

  notePossibles : Number[] = [0,1,2,3,4,5];

  //gestion des messages d'erreur
  isSauvegardeOk:boolean = true;
  msgErreur:String='';

  constructor(private fb: FormBuilder, public typeService: TypeService, public oeuvreService: OeuvreService,
            public genreService : GenreService, public statutService : StatutService,private el: ElementRef)
  {
      this.oeuvreForm = this.fb.group({
      typeOeuvre: ['', [Validators.required, Validators.minLength(1)]],
      titre: ['', [Validators.required, Validators.minLength(1)]],
      genreIds: [''],
      statutVisionnageId: [''],
      note: [''],
      createurs: [''],
      acteurs: [''],
      duree: ['', [Validators.pattern("^[0-9]*$")]],
      description: [''],
      urlAffiche: [''],
      urlBandeAnnonce: ['']
    });
  }

  ngOnInit(): void {
    this.types = this.typeService.getTypesPourEditionOeuvre();

    this.subscriptions.push(
      this.genreService.genres$.subscribe(data => this.genres=data)
    );

    this.subscriptions.push(
      this.statutService.statuts$.subscribe(data => this.statutVisionnages=data)
    );

  }

  onSubmitForm(event:Event, formDirective: FormGroupDirective) {
    //évite de recharger la parge au moment de la soumission
    //sinon, l'event normal de soumission est de faire l'action et recharger la page
    event.preventDefault();

    if (this.oeuvreForm.valid) {
      console.log('formulaire valide')
      console.log(this.oeuvreForm.value);
      this.oeuvreASauverJson=this.oeuvreForm.value;

      //on sauvegarde une url youtube
      let key:String  = this.oeuvreForm.controls["urlBandeAnnonce"].value;
      if (key!=null && key.trim()!='') {
        this.oeuvreForm.controls["urlBandeAnnonce"].setValue(this._URL_YOUTUBE+key);
      } else {
        this.oeuvreForm.controls["urlBandeAnnonce"].setValue('');
      }

      this.oeuvreService.saveOeuvre(this.oeuvreForm.value).subscribe(
        {
          next  : response => {
            console.log(response)//si tout s'est bien passé
            this.isOeuvreSauvee=true;
            formDirective.resetForm() //to reset les controles de validité
            this.oeuvreForm.reset();//to reset les valeurs du formulaire
          },
          error : response =>  {
            console.log("response=",response);
            this.isSauvegardeOk=false;
            this.msgErreur=response.error;
          }
        }
      )
    } else {
      console.log('formulaire invalide')
      //on met le focus sur le 1er control invalide
      for (const key of Object.keys(this.oeuvreForm.controls)) {
        if (this.oeuvreForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
  }
    }


  }

  removeMessage() {
    this.isOeuvreSauvee=false;
    this.msgErreur='';
    this.isSauvegardeOk=true;
  }

  resetForm() {
    this.oeuvreForm.reset();
  }

  convertOeuvreFormToModel(formValues:any) {

  }


  ngOnDestroy() {
    //on detruit les subscriptions en place
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
