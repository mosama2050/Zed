import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // faUser = faUser;
  isLoggedIn: boolean;
  username: string;

  constructor () { }


  ngOnInit(): void {
    // this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    // this.authService.username.subscribe((data: string) => this.username = data);
  }

  goToUserProfile() {
    // this.router.navigateByUrl('/user-profile/' + this.username);
  }


  logout() {
    // this.authService.logout();
    // this.isLoggedIn = false;
    // this.router.navigateByUrl('');
  }
}
