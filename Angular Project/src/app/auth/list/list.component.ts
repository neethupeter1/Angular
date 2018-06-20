import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[ListService]
})
export class ListComponent implements OnInit, OnDestroy {
  pageTitle : string = 'List - Posts'; 
  posts: any = [];
  toggleEdit: Boolean = false;
 
  
  
  constructor(private _authService: AuthService, private _activateRoute : ActivatedRoute, private _router : Router, private _listService: ListService) { }

  ngOnInit() {
    
    this._authService.getPosts().subscribe((data:any) => {
      this.posts = data;
      console.log('Posts: ',this.posts); 
    }); 
  }



  
  ngOnDestroy() {

  }

  title: any = '';
  editPost(post) {
    console.log(post);
    this.title = post.title;
    console.log(this.title);
    this.toggleEdit  = !this.toggleEdit; 
  }

  



  index: any = '';
  deletePost(postId) {
    console.log("PostID: ", postId);  
    this._authService.deletePost(postId._id).subscribe((data:any)=> {
      console.log(data);
      if(data) {
        this.index = this.posts.findIndex(x=>x == postId);
        this.posts.splice(this.index,1);
        console.log('Successful attempt to delete comment!!!');   
      } else {
        alert('Failed attempt');
      }
    });



  }
}

