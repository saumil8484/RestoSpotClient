import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { City } from '../Models/city.model';
import { CitiesService } from '../Services/cities.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  citiesInformation: City [] = [];
  
  addCityRequest : City = {
    cityId: '',
    city: ''
  }
  
  constructor(private cityService: CitiesService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.cityService.getAllCities()
    .subscribe({
      next: (citiesInformation) => {
        this.citiesInformation = citiesInformation
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  addCity() {
    this.cityService.addCity(this.addCityRequest)
    .subscribe({
      next: (City) => {
        this.toast.success({detail:"Added", summary: this.addCityRequest.city + " city added successfully !", duration: 5000});
        this.router.navigate(['restaurants']);
      }
    });
  }

}
