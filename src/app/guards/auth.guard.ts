import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) {}
  
  canActivate() : boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }
    else
    {
      this.toast.error({detail:"Error", summary:"Please login first !", duration: 5000});
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
