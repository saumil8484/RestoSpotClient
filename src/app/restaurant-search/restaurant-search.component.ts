import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../Models/city.model';
import { Cuisine } from '../Models/cuisine.model';
import { RestaurantInformation } from '../Models/restaurant.model';
import { CitiesService } from '../Services/cities.service';
import { CuisinesService } from '../Services/cuisines.service';
import { RestaurantsService } from '../Services/restaurants.service';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit {

  restaurantsInformation: RestaurantInformation[] = [];
  cuisinesInformation: Cuisine [] = [];
  citiesInformation: City [] = [];
  SelectedCuisine: any = 0;
  SelectedCity: any = 0;

  ChangeCuisine(ChangedCuisine: any){
    this.SelectedCuisine = ChangedCuisine.target.value;
  }

  ChangeCity(ChangedCity: any){
    this.SelectedCity = ChangedCity.target.value
  }
  
  constructor(private restaurantsService : RestaurantsService, private cuisineService: CuisinesService, private cityService: CitiesService, private router: Router) { }

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurants()
    .subscribe({
      next: (restaurantsInformation) => {
        this.restaurantsInformation = restaurantsInformation;
      },
      error: (response) => {
        console.log(response);
      }
    });

    this.cuisineService.getAllCuisines()
    .subscribe({
      next: (cuisinesInformation) => {
        this.cuisinesInformation = cuisinesInformation
      },
      error: (response) => {
        console.log(response);
      }
    });

    this.cityService.getAllCities()
    .subscribe({
      next: (citiesInformation) => {
        this.citiesInformation = citiesInformation
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  ClearSearch() {
    this.ngOnInit();
    this.SelectedCuisine = 0;
    this.SelectedCity = 0;
  }

}
