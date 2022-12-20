import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Cuisine } from '../Models/cuisine.model';
import { CuisinesService } from '../Services/cuisines.service';

@Component({
  selector: 'app-add-cuisine',
  templateUrl: './add-cuisine.component.html',
  styleUrls: ['./add-cuisine.component.css']
})
export class AddCuisineComponent implements OnInit {

  cuisinesInformation: Cuisine [] = [];
  cuisineForm!: FormGroup;
  
  addCuisineRequest : Cuisine = {
    cuisineId: '',
    cuisine: ''
  }

  constructor(private fb: FormBuilder, private cuisineService: CuisinesService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {

    this.cuisineForm = this.fb.group({
      cuisine: ['', Validators.required]
    })

    this.cuisineService.getAllCuisines()
    .subscribe({
      next: (cuisinesInformation) => {
        this.cuisinesInformation = cuisinesInformation
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  addCuisine() {
    if(this.cuisineForm.valid)
    {
      this.cuisineService.addCuisine(this.addCuisineRequest)
      .subscribe({
        next: (Cuisine) => {
          this.toast.success({detail:"Added", summary: this.addCuisineRequest.cuisine + " cuisine added successfully !", duration: 5000});
          this.router.navigate(['restaurants']);
        },
        error: (err) => {
          this.toast.error({detail:"Error", summary: err?.error.message, duration: 5000});
        }
      })
    }
    else{
      this.validateAllFormFields(this.cuisineForm);
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
