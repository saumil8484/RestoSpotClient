import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Cuisine } from '../Models/cuisine.model';
import { CuisinesService } from '../Services/cuisines.service';

@Component({
  selector: 'app-add-cuisine',
  templateUrl: './add-cuisine.component.html',
  styleUrls: ['./add-cuisine.component.css']
})
export class AddCuisineComponent implements OnInit {

  cuisinesInformation: Cuisine [] = [];
  
  addCuisineRequest : Cuisine = {
    cuisineId: '',
    cuisine: ''
  }

  constructor(private cuisineService: CuisinesService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.cuisineService.getAllCuisines()
    .subscribe({
      next: (cuisinesInformation) => {
        this.cuisinesInformation = cuisinesInformation
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  addCuisine() {
    this.cuisineService.addCuisine(this.addCuisineRequest)
    .subscribe({
      next: (Cuisine) => {
        this.toast.success({detail:"Added", summary: this.addCuisineRequest.cuisine + " cuisine added successfully !", duration: 5000});
        this.router.navigate(['restaurants']);
      }
    });
  }
}
