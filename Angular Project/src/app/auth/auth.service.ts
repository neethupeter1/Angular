import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  authCheck$ = new Subject<any>();
  viewUserId:any={};
  constructor(private _router : Router, private _http : HttpClient, private _cookieService : CookieService ) { }

  
  register(details:any) {
      // console.log(details);
      this._http.post('http://localhost:3000/register', details).subscribe((data:any) => {
        console.log('resp data: ', data);
        if(data.sucess) {
          console.log('created');
          this._router.navigate(['/login']);
        } else {
          alert('User cannot be created!');
        } 
      });

  }

  // data: any = {};
 
  login(details:any) {
      this._http.post('http://localhost:3000/authenticate', details).subscribe((data:any) => {
        if(data.isLoggedIn) {
          console.log(data.userInfo);
          this._cookieService.set('token', data.token);
          this._cookieService.set('userInfo', data.userInfo);
          this._cookieService.set('name', data.name);
          this.authCheck$.next(data.isLoggedIn);
          this._router.navigate(['/home']); 
        } else {
          console.log('Err');
        } 
      });
    }   

    checkUsrId() { 
      return this._cookieService.get('userInfo');   
    }

  checkUsrStatus() { 
    return this._cookieService.get('token');   
  }

  checkUsrName() { 
    return this._cookieService.get('name');   
  }

  clearCookie() { 
    this._cookieService.deleteAll();
  }

  getpost(details) {
    console.log(details);
    details.user_id= this._cookieService.get('userInfo'); // to insert a new key value to an array
    details.username = this._cookieService.get('name');
    this._http.post('http://localhost:3000/createPost', details).subscribe((data:any) => {
      console.log('resp data: ', data);
      if(data.sucess) {
        this._router.navigate(['/listPosts']);
        alert('Post successfully created!!!');  
      } else {  
        alert('Post cannot be created!');
      } 
    });
  }
 
  getPosts() { 
    return this._http.get('http://localhost:3000/listPosts');
  }

 
  updatePost(editData) {
    console.log(editData);
    return this._http.post('http://localhost:3000/editPost', editData).subscribe((data:any) => {
      if(data) {
        console.log("Post edited");
        window.location.reload();
      } else {
        console.log("Unsuccessful");
      }
    })
  }
  
  
  deletePostId: any = {};
  deletePost(postId) {
    this.deletePostId = {post_id : postId};
    console.log(this.deletePostId);
    return this._http.post('http://localhost:3000/deletePosts', this.deletePostId);
  }
    

  
  createComments(details, postId) {
    details.user_id= this._cookieService.get('userInfo');
    details.post_id= postId;
    console.log(details);
    this._http.post('http://localhost:3000/addComment', details).subscribe((data:any) => {
      console.log(data);
      if(data.sucess) {
        alert('Comment successfully created!!!');
        window.location.reload();
      } else {
        alert('Comment cannot be created!');
      } 
    });
  }

  commentPostId: any = {};
  getComments(postId) {
    this.commentPostId = {post_id:postId};
    console.log(postId);
    return this._http.post('http://localhost:3000/listComments', this.commentPostId); 
  }

  

  deleteCommentId: any = {};
  deleteComment(commentId) {
    this.deleteCommentId = {comment_id : commentId};
    console.log(this.deleteCommentId);
    return this._http.post('http://localhost:3000/deleteComments', this.deleteCommentId);
  }

  likes(post) {
    console.log("auth service", post);
    return this._http.post('http://localhost:3000/likes', post).subscribe((data)=> {
      console.log(data);
      if(data) {
        console.log("Successful like attempt");
      } else {
        console.log("Fail");
      }
    });
  }

  
  listLikes(postId) {
    console.log(postId);
   return this._http.post('http://localhost:3000/listLikes', postId);
  }


  logout() {
    this._router.navigate(['/login']); 
    
  }

































  insertComment(commentdata) {
    return this._http.post('http://localhost:3000/insertComments', commentdata);
  }












  




  
  
  // insertComment(commentdata) {
  //   return this._http.post('https://localhost:3000/addComment', commentdata);
  // }

 
  

  }
  
    
  
  

