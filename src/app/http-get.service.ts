import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpGetService {

  constructor(
    private http: HttpClient
  ) { }

  getGlobal(): Observable<unknown> {
    return this.http.get('https://api.covid19api.com/summary');
  }

  getCountry(): Observable<unknown> {
    return this.http.get('https://api.covid19api.com/countries');
  }

  getUserById(id: string): Observable<unknown>{
    return this.http.get('https://reqres.in/api/users' + id);
  }
}
