import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../../routerGuards/loginGuard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-old-user',
  templateUrl: './old-user.component.html',
  styleUrls: ['./old-user.component.scss']
})
export class OldUserComponent implements OnInit {
  private authGuard: any;

  constructor(authGuard: AuthGuard, private router: Router) {
    this.authGuard = authGuard;
  }

  ngOnInit() {
  }

  login() {
    this.authGuard.login();
    this.router.navigate(['']);
  }

  logout() {
    this.authGuard.logout();
  }
}
