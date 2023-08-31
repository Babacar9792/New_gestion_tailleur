import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
// import {}
import {HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { ListComponent } from './article/list/list.component';
import { ItemComponent } from './article/list/item/item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleventeComponent } from './articlevente/articlevente.component';
import { FormventeComponent } from './articlevente/formvente/formvente.component';
import { ItemventeComponent } from './articlevente/listevente/itemvente/itemvente.component';
import { ListeventeComponent } from './articlevente/listevente/listevente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormComponent,
    ListComponent,
    ItemComponent,
    NavbarComponent,
    ArticleventeComponent,
    FormventeComponent,
    ItemventeComponent,
    ListeventeComponent,
    PaginationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
