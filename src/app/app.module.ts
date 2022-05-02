import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ModelsComponent } from './shared/models/models.component';
import { ServicesComponent } from './shared/services/services.component';
import { FilterbarComponent } from './filterbar/filterbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    ListComponent,
    SearchbarComponent,
    ModelsComponent,
    ServicesComponent,
    FilterbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
