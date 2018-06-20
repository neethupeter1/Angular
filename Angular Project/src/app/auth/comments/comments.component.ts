import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  cmtdetail : any = {};
  commentsToList : any = []; 
  toggleComments : Boolean = false;
 
  constructor(private _authService: AuthService, private _http : HttpClient, private _cookieService : CookieService ) { }

  ngOnInit() {
  }
   
  ngOnChanges(){
  
   
  } 

postId:any='';
postDetails:any={};
  comments(post) {
    console.log("Post details: ",post);
    this.postId=post._id;
    // console.log(this.postId);
    this.toggleComments  = !this.toggleComments; 
    this._authService.getComments(this.postId).subscribe((data:any)=> {
      // console.log("List comments: ", data); 
      if(data) {
        this.commentsToList = data;
      } else {
        this.commentsToList = [];
        alert('No comments');
      }
    });  
  }

  // commentdetails:any={};
  createComment(postId) {
    this._authService.createComments(this.cmtdetail, this.postId);
    console.log(this.postId);
    
  }

  index: any = '';
  deleteComment(commentId) {
    console.log("CommentID: ", commentId);  
    this._authService.deleteComment(commentId).subscribe((data:any)=> {
      console.log(data);
      if(data) {
        this.index = this.commentsToList.findIndex(x=>x == commentId);
        this.commentsToList.splice(this.index,1);
        console.log('Successful attempt to delete comment!!!');   
      } else {
        alert('Failed attempt');
      }
    });
  }

  

  
}





















