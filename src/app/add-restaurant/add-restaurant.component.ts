import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  addRestaurantForm!: FormGroup;
  
  addRestaurantRequest: Restaurant = {
    restaurantId:'',
    name:'',
    address:'',
    cityid:'',
    cuisineid:'',
    rating: 0,
    reviews: 0
  };

  constructor(private fb: FormBuilder, private restaurantService: RestaurantsService, private cuisineService: CuisinesService, private cityService: CitiesService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
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

    this.addRestaurantForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      cuisine: ['', Validators.required],
      rating: ['', Validators.required],
      reviews: ['', Validators.required]
    })
  }

  addRestaurant() {
    if(this.addRestaurantForm.valid)
    {
      this.restaurantService.addRestaurant(this.addRestaurantRequest)
      .subscribe({
        next: (restaurant) => {
          this.toast.success({detail:"Added", summary: this.addRestaurantRequest.name + "'s details added successfully !", duration: 5000});
          this.router.navigate(['restaurants']);
        },
        error: (err) => {
          this.toast.error({detail:"Error", summary: err?.error.message, duration: 5000});
        }
      })
    }
    else{
      this.validateAllFormFields(this.addRestaurantForm);
      this.toast.error({detail:"Error", summary: "Enter all the details !", duration: 5000});
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })   
  }

}
