import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './add-city/add-city.component';
import { AddCuisineComponent } from './add-cuisine/add-cuisine.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path:'', redirectTo:'login', pathMatch:'full'
  },
  {
    path:'welcome', component : WelcomeComponent, canActivate: [AuthGuard]
  },
  {
    path:'login', component : LoginComponent
  },
  {
    path:'signup', component : SignupComponent
  },
  {
    path:'restaurants', component : RestaurantSearchComponent, canActivate: [AuthGuard]
  },
  {
    path:'restaurants/add', component : AddRestaurantComponent, canActivate: [AuthGuard]
  },
  {
    path:'restaurants/edit/:id', component : EditRestaurantComponent, canActivate: [AuthGuard]
  },
  {
    path:'cuisines/add', component : AddCuisineComponent, canActivate: [AuthGuard]
  },
  {
    path:'cities/add', component : AddCityComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
