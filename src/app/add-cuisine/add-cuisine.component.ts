import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cuisineService: CuisinesService, private router: Router) { }

  ngOnInit(): void {
    this.cuisineService.getAllCuisines()
    .subscribe({
      next: (cuisinesInformation) => {
        console.log(cuisinesInformation);
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
        this.router.navigate(['restaurants']);
      }
    });
  }
}
