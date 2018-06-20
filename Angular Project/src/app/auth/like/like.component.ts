import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit, OnChanges {

  toggleLikes : Boolean = false;
  likesToList: any = [];
  postId: any;
  likedata:any;

  @Input() postClicked :any={};

  constructor(private _authService: AuthService, private _http : HttpClient, private _cookieService : CookieService) { }

  ngOnInit() {
    this.username = this._authService.checkUsrName();
    
  }
  
  ngOnChanges(){
    
  } 

  likePostdata:any={}
  username: any = [];
  likes(post) {
    this.postId= post._id;
    console.log("child component data ", this.postClicked);
    this.likePostdata={
      post_id:this.postClicked._id,
      user_id:this._authService.checkUsrId(),
      username: this.username
    }
    this.toggleLikes  = !this.toggleLikes;
    console.log(this.likePostdata);
    this._authService.likes(this.likePostdata);
    
    this._authService.listLikes(this.postId).subscribe((data)=>{
      console.log(data);
      this.likedata=data;
      console.log(this.likedata);
    });
  }
}
