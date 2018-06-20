import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './auth/home/home.component';
import { AuthService } from './auth/auth.service';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { CreateComponent } from './auth/create/create.component';
import { ListComponent } from './auth/list/list.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { AuthinterceptorService } from './authinterceptor.service';
import { ViewPipe } from './auth/view.pipe';
import { CommentsComponent } from './auth/comments/comments.component';
import { LikeComponent } from './auth/like/like.component';
import { EditPostComponent } from './auth/edit-post/edit-post.component';
import { EditPostPipe } from './auth/edit-post.pipe';
// import { FlashMessagesModule } from 'angular2-flash-messages';
// import { createComponent } from '@angular/compiler/src/core';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NavigationComponent,
    CreateComponent,
    ListComponent,
    ViewPipe,
    CommentsComponent,
    LikeComponent,
    EditPostComponent,
    EditPostPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // FlashMessagesModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent, canActivate:[AuthGuard] },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegistrationComponent },
      { path: "listPosts", component: ListComponent, canActivate:[AuthGuard] },
      { path: "createPost", component: CreateComponent, canActivate:[AuthGuard] },
      { path: "comments", component: CommentsComponent, canActivate:[AuthGuard] },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home" }
    ])
  ],
  providers: [AuthService, CookieService, AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthinterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
