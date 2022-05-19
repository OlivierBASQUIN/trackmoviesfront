import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOeuvreComponent } from './detail-oeuvre/detail-oeuvre.component';
import { ListComponent } from './list/list.component';

/* définir les routes de l'applications */
const routes: Routes = [
  { path: 'mes-oeuvres', component: ListComponent },
  { path: 'mes-oeuvres/:id', component: DetailOeuvreComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
