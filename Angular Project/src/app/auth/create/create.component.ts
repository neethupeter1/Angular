import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  postKey : any = {};

  constructor(private _authService : AuthService) { }

  ngOnInit() {
  }

  
  post() {
    this._authService.getpost(this.postKey);
    
  }

} 
