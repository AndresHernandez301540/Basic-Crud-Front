import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient, private router:Router) { }

  createUser(user):Observable<any>{
    const headers=new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post<any>('http://localhost:3000/'+'users/register',JSON.stringify(user),{headers:headers}).pipe(
      tap(()=>{}
        )
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/' + 'users/all').pipe(
      map(this.extractData));
  }
    
  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
}
