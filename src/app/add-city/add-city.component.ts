import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  cityForm!: FormGroup;
  
  addCityRequest : City = {
    cityId: '',
    city: ''
  }
  
  constructor(private fb: FormBuilder, private cityService: CitiesService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {

    this.cityForm = this.fb.group({
      city: ['', Validators.required]
    })


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
    if(this.cityForm.valid)
    {
      this.cityService.addCity(this.addCityRequest)
      .subscribe({
        next: (City) => {
          this.toast.success({detail:"Added", summary: this.addCityRequest.city + " city added successfully !", duration: 5000});
          this.router.navigate(['restaurants']);
        },
        error: (err) => {
          this.toast.error({detail:"Error", summary: err?.error.message, duration: 5000});
        }
      })
    }
    else{
      this.validateAllFormFields(this.cityForm);
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
