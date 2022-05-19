import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TypeModel } from '../shared/models/type.model';
import { TypeService } from '../shared/services/type.service';

@Component({
  selector: 'app-formulaire-edition-oeuvre',
  templateUrl: './formulaire-edition-oeuvre.component.html',
  styleUrls: ['./formulaire-edition-oeuvre.component.css'],
})
export class FormulaireEditionOeuvreComponent implements OnInit {
  oeuvreForm: FormGroup;

  types!: TypeModel[];
  selectionType: string = '';

  constructor(private fb: FormBuilder, public typeService: TypeService) {
    this.oeuvreForm = this.fb.group({
      typeOeuvre: ['', [Validators.required, Validators.minLength(1)]],
      titre: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.types = this.typeService.getTypesPourEditionOeuvre();
  }

  onSubmitForm(event:Event) {
    //évite de recharger la parge au moment de la soumission
    //sinon, l'event normal de soumission est de faire l'action et recharger la page
    event.preventDefault();


    console.log(this.oeuvreForm.value);
    //check s'il est valide
    console.log(this.oeuvreForm.valid);
    console.log(this.oeuvreForm);
  }
}
