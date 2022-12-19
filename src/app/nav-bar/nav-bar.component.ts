import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  Logout(){
    this.auth.signOut();
  }
}
