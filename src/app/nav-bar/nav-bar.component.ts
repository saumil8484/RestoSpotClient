import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { UserStoreService } from '../Services/user-store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public fullName : string = "";
  constructor(private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit(): void {

    this.userStore.getFullNameFromStore()
    .subscribe(val => {
      let fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    })
  }

  Logout(){
    this.auth.signOut();
  }
}
