import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../authModule/login/services/user-authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: UserAuthenticationService) {}

  ngOnInit() {}
  logOut() {
    this.authService.logout();
  }
}
