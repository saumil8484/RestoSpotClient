import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private cityService: CitiesService, private router: Router) { }

  ngOnInit(): void {
    this.cityService.getAllCities()
    .subscribe({
      next: (citiesInformation) => {
        console.log(citiesInformation);
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
        this.router.navigate(['restaurants']);
      }
    });
  }

}
