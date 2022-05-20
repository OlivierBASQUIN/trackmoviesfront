import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOeuvreComponent } from './detail-oeuvre/detail-oeuvre.component';
import { FormulaireEditionOeuvreComponent } from './formulaire-edition-oeuvre/formulaire-edition-oeuvre.component';
import { ListComponent } from './list/list.component';

/* définir les routes de l'applications */
const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'liste', component: ListComponent },
  { path: 'mes-oeuvres/:id', component: DetailOeuvreComponent },
  { path: 'edition-oeuvre', component: FormulaireEditionOeuvreComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
