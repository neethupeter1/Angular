import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  posts: any = {};
  toggleEdit: Boolean = false;

  @Input() editClicked :any={};

  constructor(private _http: HttpClient, private _authService: AuthService, private _activateRoute : ActivatedRoute, private _router : Router) { }
  

  ngOnInit() {
    
      console.log();
  }

  editPost(post) {
    console.log(this.editClicked);
    this.toggleEdit  = !this.toggleEdit; 
  }

  updatePost(editClicked) {
    console.log(this.editClicked);
    this._authService.updatePost(editClicked);
  }
}


