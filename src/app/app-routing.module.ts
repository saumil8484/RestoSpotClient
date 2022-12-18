import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './add-city/add-city.component';
import { AddCuisineComponent } from './add-cuisine/add-cuisine.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';

const routes: Routes = [
  {
    path:'restaurants', component : RestaurantSearchComponent
  },
  {
    path:'restaurants/add', component : AddRestaurantComponent
  },
  {
    path:'restaurants/edit/:id', component : EditRestaurantComponent
  },
  {
    path:'cuisines/add', component : AddCuisineComponent
  },
  {
    path:'cities/add', component : AddCityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
