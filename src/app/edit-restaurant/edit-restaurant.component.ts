import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../Models/city.model';
import { Cuisine } from '../Models/cuisine.model';
import { Restaurant } from '../Models/restaurant.model';
import { CitiesService } from '../Services/cities.service';
import { CuisinesService } from '../Services/cuisines.service';
import { RestaurantsService } from '../Services/restaurants.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  cuisinesInformation: Cuisine [] = [];
  citiesInformation: City [] = [];
  
  restaurantDetails: Restaurant = {
    restaurantId:'',
    name:'',
    address:'',
    cityid:'',
    cuisineid:'',
    rating: 0,
    reviews: 0
  };

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantsService, private cuisineService: CuisinesService, private cityService: CitiesService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id) {
          this.restaurantService.getRestaurant(id)
          .subscribe({
            next: (response) => {
              this.restaurantDetails = response;
            }
          });
        }
      }
    });

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

  updateRestaurant() {
    this.restaurantService.updateRestaurant(this.restaurantDetails.restaurantId, this.restaurantDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['restaurants']);
      }
    });
  }

  deleteRestaurant(id: string) {
    this.restaurantService.deleteRestaurant(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['restaurants']);
      }
    });
  }

}
