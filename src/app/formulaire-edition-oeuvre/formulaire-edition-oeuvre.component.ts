import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TypeModel } from '../shared/models/type.model';
import { OeuvreService } from '../shared/services/oeuvre.service';
import { TypeService } from '../shared/services/type.service';

@Component({
  selector: 'app-formulaire-edition-oeuvre',
  templateUrl: './formulaire-edition-oeuvre.component.html',
  styleUrls: ['./formulaire-edition-oeuvre.component.css'],
})
export class FormulaireEditionOeuvreComponent implements OnInit {
  private _URL_YOUTUBE="https://www.youtube.com/embed/";


  oeuvreForm: FormGroup;
  msgOeuvreSauvee :boolean = false ;

  types!: TypeModel[];
  selectionType: string = '';

  constructor(private fb: FormBuilder, public typeService: TypeService, public oeuvreService: OeuvreService) {
    this.oeuvreForm = this.fb.group({
      typeOeuvre: ['', [Validators.required, Validators.minLength(1)]],
      titre: ['', [Validators.required, Validators.minLength(1)]],
      //genres: [''],
      //statutVisionnage: [''],
      //note: [''],
      //duree: ['', [Validators.pattern("^[0-9]*$")]],
      urlAffiche: [''],
      urlBandeAnnonce: ['']
    });
  }

  ngOnInit(): void {
    this.types = this.typeService.getTypesPourEditionOeuvre();
  }

  onSubmitForm(event:Event) {
    //évite de recharger la parge au moment de la soumission
    //sinon, l'event normal de soumission est de faire l'action et recharger la page
    event.preventDefault();

    if (this.oeuvreForm.valid) {
      console.log('formulaire valide')
      console.log(this.oeuvreForm.value);

      //on sauvegarde une url youtube
      this.oeuvreForm.controls["urlBandeAnnonce"].setValue(this._URL_YOUTUBE+this.oeuvreForm.controls["urlBandeAnnonce"].value);

      this.oeuvreService.saveOeuvre(this.oeuvreForm.value).subscribe(
        {
          next  : response => {
            console.log(response)//si tout s'est bien passé
            this.msgOeuvreSauvee=true;
            //this.alerteSvc.showMessage('vous avez bien ajouté un nouvel apprenant','Fermer');
            //this.router.navigate(['/students']);
          }
        }
      )


      //check s'il est valide
      //console.log(this.oeuvreForm.valid);
      //console.log(this.oeuvreForm);
    } else {
      console.log('formulaire invalide')
    }


  }

  removeMessage() {
    this.msgOeuvreSauvee=false;
  }

  resetForm() {
    this.oeuvreForm.reset();
  }
}
