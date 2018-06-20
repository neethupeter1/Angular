import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  toggleMenuItems : any = '';

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authService.authCheck$.subscribe((data) => {
      this.toggleMenuItems = data;
    });
    this.toggleMenuItems = this._authService.checkUsrStatus();
  
  }

  logout() {
    window.location.reload();
    this._authService.clearCookie();
    // this._router.navigate(['/login']);
    // this._authService.logout(); // Logout user
    // this._flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    
  }

}
