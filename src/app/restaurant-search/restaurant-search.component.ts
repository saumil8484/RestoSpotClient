import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantInformation } from '../Models/restaurant.model';
import { RestaurantsService } from '../Services/restaurants.service';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit {

  restaurantsInformation: RestaurantInformation[] = [];
  SelectedCuisine: any = 0;
  SelectedCity: any = 0;

  ChangeCuisine(ChangedCuisine: any){
    this.SelectedCuisine = ChangedCuisine.target.value;
  }

  ChangeCity(ChangedCity: any){
    this.SelectedCity = ChangedCity.target.value
  }
  constructor(private restaurantsService : RestaurantsService, private router: Router) { }

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurants()
    .subscribe({
      next: (restaurantsInformation) => {
        console.log(restaurantsInformation);
        this.restaurantsInformation = restaurantsInformation;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  ClearSearch() {
    this.ngOnInit();
    this.SelectedCuisine = 0;
    this.SelectedCity = 0;
  }

}
