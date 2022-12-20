import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  editRestaurantForm!: FormGroup;
  
  restaurantDetails: Restaurant = {
    restaurantId:'',
    name:'',
    address:'',
    cityid:'',
    cuisineid:'',
    rating: 0,
    reviews: 0
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private restaurantService: RestaurantsService, private cuisineService: CuisinesService, private cityService: CitiesService, private router: Router, private toast: NgToastService) { }

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

    this.editRestaurantForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      cuisine: ['', Validators.required],
      rating: ['', Validators.required],
      reviews: ['', Validators.required]
    })
  }

  updateRestaurant() {
    if(this.editRestaurantForm.valid)
    {
      this.restaurantService.updateRestaurant(this.restaurantDetails.restaurantId, this.restaurantDetails)
      .subscribe({
        next: (response) => {
          this.toast.success({detail:"Updated", summary: this.restaurantDetails.name + "'s details updated successfully !", duration: 5000});
          this.router.navigate(['restaurants']);
        },
        error: (err) => {
          this.toast.error({detail:"Error", summary: err?.error.message, duration: 5000});
        }
      })
    }
    else{
      this.validateAllFormFields(this.editRestaurantForm);
      this.toast.error({detail:"Error", summary: "Enter all the details !", duration: 5000});
    }
  }

  deleteRestaurant(id: string) {
    this.restaurantService.deleteRestaurant(id)
    .subscribe({
      next: (response) => {
        this.toast.success({detail:"Deleted", summary: this.restaurantDetails.name + "'s details deleted successfully !", duration: 5000});
        this.router.navigate(['restaurants']);
      }
    });
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
