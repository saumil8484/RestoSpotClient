import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { AddCuisineComponent } from './add-cuisine/add-cuisine.component';
import { AddCityComponent } from './add-city/add-city.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './Interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantSearchComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    AddCuisineComponent,
    AddCityComponent,
    LoginComponent,
    WelcomeComponent,
    SignupComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgToastModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
