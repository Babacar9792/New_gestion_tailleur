import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class ParentService {

  constructor(protected http : HttpClient) { }

  getAll(uri : string) : Observable<any>
  {
    return this.http.get(environment.api.url+uri).pipe(

      tap(response => {
        console.log(response);
        
      })
    );
  }
}
