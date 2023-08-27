import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export abstract class  ServiceMereService<T> {

  constructor(private http : HttpClient) { }
  protected abstract uri : string;
  all(page : number = 1) : Observable<T>
  {
    return this.http.get<T>(`${environment.api}${this.uri}`).pipe(
      // tap( (response) =>)      
    )
  }
}
