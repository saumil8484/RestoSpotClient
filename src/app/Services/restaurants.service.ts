import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant, RestaurantInformation } from '../Models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  baseApiUrl: string = environment.baseApiUrl;
  
  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<RestaurantInformation[]> {
    return this.http.get<RestaurantInformation[]>(this.baseApiUrl + '/api/restaurants');
  }

  addRestaurant(addRestaurantRequest: Restaurant): Observable<Restaurant> {
    addRestaurantRequest.restaurantId = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Restaurant>(this.baseApiUrl + '/api/restaurants', addRestaurantRequest);
  }

  getRestaurant(id: string): Observable<RestaurantInformation> {
    return this.http.get<RestaurantInformation>(this.baseApiUrl + '/api/restaurants/' + id);
  }

  updateRestaurant(id: string, updateRestaurantRequest: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(this.baseApiUrl + '/api/restaurants/' + id, updateRestaurantRequest);
  }

  deleteRestaurant(id: string): Observable<Restaurant> {
    return this.http.delete<Restaurant>(this.baseApiUrl + '/api/restaurants/' + id);
  }
}
