import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../Models/city.model';
import { Cuisine } from '../Models/cuisine.model';
import { Restaurant } from '../Models/restaurant.model';
import { CitiesService } from '../Services/cities.service';
import { CuisinesService } from '../Services/cuisines.service';
import { RestaurantsService } from '../Services/restaurants.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  cuisinesInformation: Cuisine [] = [];
  citiesInformation: City [] = [];
  
  addRestaurantRequest: Restaurant = {
    restaurantId:'',
    name:'',
    address:'',
    cityid:'',
    cuisineid:'',
    rating: 0,
    reviews: 0
  };

  constructor(private restaurantService: RestaurantsService, private cuisineService: CuisinesService, private cityService: CitiesService, private router: Router) { }

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
    });

    this.cityService.getAllCities()
    .subscribe({
      next: (citiesInformation) => {
        console.log(citiesInformation);
        this.citiesInformation = citiesInformation
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  addRestaurant() {
    this.restaurantService.addRestaurant(this.addRestaurantRequest)
    .subscribe({
      next: (restaurant) => {
        this.router.navigate(['restaurants']);
      }
    });
  }

}
