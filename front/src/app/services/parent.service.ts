import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DataResponse } from '../interfaces/data-response';
import { Categorie } from '../interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export abstract class ParentService<A> {

  constructor(protected http : HttpClient) { }

  getAll(uri : string) : Observable<A>
  {
    return this.http.get<A>(environment.api.url+uri).pipe(

      tap(response => {
        console.log(response);
        
      })
    );
  }

  addElement <T> (objet : any, uri :string) : Observable<DataResponse<T>>
  {
    return this.http.post<DataResponse<T>>(environment.api.url+uri, objet).pipe(
      tap (response => {
        console.log(response);
        
      })
    )
  }

  delete(uri :string, objet : any)
  {
    return this.http.delete(environment.api.url+uri, objet).pipe(
      tap (reponse => { console.log(reponse);
      })
    )
  }

  update(uri : string, object : any)
  {
    return this.http.post(environment.api.url+uri, object).pipe(
      tap(response => {
        console.log(response);
        
      })
    );
  }
}
