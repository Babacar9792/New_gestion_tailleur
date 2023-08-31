import { Injectable } from '@angular/core';
import { ParentService } from './parent.service';
import { Categorie } from '../interfaces/categorie';
import { DataResponse } from '../interfaces/data-response';

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends ParentService<DataResponse<Categorie[]>> {

  // constructor() { }
}
