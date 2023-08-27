import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor( private httpClient : HttpClientModule){ }

  getAllCategories(page : number)
  {
      // return this.httpClient.
  }

}
