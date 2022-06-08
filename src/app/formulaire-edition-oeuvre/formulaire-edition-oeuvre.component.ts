import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { GenreModel } from '../shared/models/genre.model';
import { RechercheModel } from '../shared/models/recherche.model';
import { StatutModel } from '../shared/models/statut.model';
import { TypeModel } from '../shared/models/type.model';
import { ApiService } from '../shared/services/api.service';
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

  types!: TypeModel[];
  selectionType: string = '';

  genres!: GenreModel[];
  selectedGenres:GenreModel[]=[];

  statutVisionnages!: StatutModel[];

  notePossibles : Number[] = [0,1,2,3,4,5];

  oeuvresApiTrouvees: Array<RechercheModel> = [];
  selectionOeuvreApi: RechercheModel = {id: 0, type: '', titre: '', urlAffiche: '', urlBandeAnnonce: '', description: ''};
  oeuvreApiChoisie: boolean = false;
  saisieRecherche: string = '';


  //gestion des messages (on met 2 booleen car on peut ne pas afficherde message du tout egalement)
  displayMsgOeuvreSauvee :boolean = false ;
  displayMsgErreurSauvegarde:boolean = false;

  msgErreur:String='';

  constructor(private fb: FormBuilder, public typeService: TypeService, public oeuvreService: OeuvreService,
            public genreService : GenreService, public statutService : StatutService,private el: ElementRef
            ,private _snackBar: MatSnackBar, public apiService: ApiService)
  {
      this.oeuvreForm = this.fb.group({
      typeOeuvre: ['', [Validators.required, Validators.minLength(1)]],
      titre: ['', [Validators.required, Validators.minLength(1)]],
      genreIds: [''],
      statutVisionnageId: [1],//statut par défaut le 1er, normalement ='A Voir'
      note: [''],
      createurs: [''],
      acteurs: [''],
      duree: ['', [Validators.pattern("^[0-9]*$")]],
      description: [''],
      urlAffiche: [''],
      urlBandeAnnonce: [''],
      saisons: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.types = this.typeService.getTypesPourEditionOeuvre();

    this.subscriptions.push(
      this.genreService.genres$.subscribe( data => { if (data.length == 0) { this.genreService.getGenres(); }; this.genres = data; } )
    );

    this.subscriptions.push(
      this.statutService.statuts$.subscribe( data => { if (data.length == 0) { this.statutService.getStatuts(); } this.statutVisionnages = data } )
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
            this.displayMsgOeuvreSauvee=true;
            this.displayMsgErreurSauvegarde=false;//on desactive le message d'erreur au cas où

            formDirective.resetForm() //to reset les controles de validité
            this.oeuvreForm.reset();//to reset les valeurs du formulaire
            this.saisons.clear();//on clear les saisons

            //on remet statut visionnage à sa valeur par defaut
            this.oeuvreForm.controls["statutVisionnageId"].setValue(1);
            this._snackBar.open('Sauvegarde OK', 'Fermer', {
              duration: 3000
            });

            //const messageSuccessDiv = this.el.nativeElement.querySelector('#SuccessMsg');
            //messageSuccessDiv.focus();
            //window.location.hash ='#SuccessMsg';
          },
          error : response =>  {
            console.log("response=",response);
            this.displayMsgErreurSauvegarde=true;
            this.displayMsgOeuvreSauvee=false;
            this.msgErreur=response.error;

            this._snackBar.open('Echec de la Sauvegarde', 'Fermer', {
              duration: 3000
            });
            //const messageErrorDiv = this.el.nativeElement.querySelector('#ErrorMsg');
            //messageErrorDiv.focus();
           //window.location.hash ='#ErrorMsg';
          }
        }
      )
    } else {
      console.log('formulaire invalide')
      console.log(this.oeuvreForm);
      //on met le focus sur le 1er control invalide
      for (const key of Object.keys(this.oeuvreForm.controls)) {
        if (this.oeuvreForm.controls[key].invalid) {
          console.log('control invalide key :',key);
          console.log('control invalide :',this.oeuvreForm.controls[key]);
          //const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          //invalidControl.focus();

          if (key!='saisons') {
            console.log('control invalide :',this.oeuvreForm.controls[key]);
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
          } else {
            //a voir plus tard si ca a un interet d'essaye de mettre le focus sur cette partie
            /*let saisonFormArray =this.oeuvreForm.controls["saisons"];
            console.log('saisonFormArray=',saisonFormArray);
            for (const saison of Object.keys(saisonFormArray.value)) {
              console.log('saison=',saison);
              console.log('control invalide :',this.saisonForm.controls[key]);
            }*/
          }
          break;
       }
      }
    }
  }

  get saisons()  {
    return this.oeuvreForm.controls["saisons"] as FormArray;
  }

  addSaison(){
    const saisonForm = this.fb.group({
      id: new FormControl('', [Validators.pattern("^[0-9]*$")]),
      numero: new FormControl('', [Validators.required, Validators.minLength(1)]),
      statutVisionnageId: [1],//statut par défaut le 1er, normalement ='A Voir'
      nbEpisodes: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    })
    this.saisons.push(saisonForm);
  }

  deleteSaison(saisonIndex: number) {
    this.saisons.removeAt(saisonIndex);
  }

  removeMessage() {
    this.displayMsgErreurSauvegarde=false;
    this.msgErreur='';
    this.displayMsgOeuvreSauvee=false;
  }

  resetForm() {
    this.oeuvreForm.reset();//to reset les valeurs du formulaire
    this.saisons.clear();//on clear les saisons

    //on remet statut visionnage à sa valeur par defaut
    this.oeuvreForm.controls["statutVisionnageId"].setValue(1);
    this.apiService.initialiserRechercheOeuvreApi();


    this.oeuvreApiChoisie = false;
    this.saisieRecherche ='';
    this.oeuvresApiTrouvees = [];
  }

    chargeForm() {

    this.selectionOeuvreApi = this.apiService.recupererOeuvreApi();

    if (this.selectionOeuvreApi) {
      if (this.selectionOeuvreApi.titre !== '') {

        console.log('Oeuvre sélectionnée pour le chargement : ' + this.selectionOeuvreApi.titre);

        this.oeuvreForm.patchValue({
          typeOeuvre: this.selectionOeuvreApi.type,
          titre: this.selectionOeuvreApi.titre,
          urlAffiche: this.selectionOeuvreApi.urlAffiche,
          description: this.selectionOeuvreApi.description
        });
      }
      else {
        console.log('Aucune oeuvre sélectionnée pour le chargement');
      }
    }
    else {
      console.log('Aucune oeuvre sélectionnée pour le chargement');
    }
  }

  ngOnDestroy() {
    //on detruit les subscriptions en place
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
