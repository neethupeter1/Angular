import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ViewService {

  constructor(public _http: HttpClient, private _authService : AuthService) { }

  getDetails(_id: number) {
    console.log('hello');
    return this._http.get('http://localhost:3000/listPosts' + '/' + _id);
  }

}
