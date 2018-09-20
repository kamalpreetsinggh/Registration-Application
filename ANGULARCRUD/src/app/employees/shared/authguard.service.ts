import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()



export class AuthguardService implements CanActivate {
    constructor(private router: Router) { } canActivate() {
    if (localStorage.getItem('key')) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}