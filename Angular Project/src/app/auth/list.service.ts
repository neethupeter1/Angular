import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class ListService {
  
   
  constructor(public _http: HttpClient, private _authService : AuthService) { 
    
  }
  


}
