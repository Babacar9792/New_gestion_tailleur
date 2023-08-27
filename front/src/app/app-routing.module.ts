import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';
import { ArticleventeComponent } from './articlevente/articlevente.component';

const routes: Routes = [
     {  path : 'categorie' , component : CategorieComponent},
     {   path : 'article', component : ArticleComponent},
     {  path : 'articleVente' , component : ArticleventeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
