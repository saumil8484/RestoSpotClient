import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../Models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<City[]>{
    return this.http.get<City[]>(this.baseApiUrl + '/api/City');
  }

  addCity(addCityRequest: City): Observable<City> {
    addCityRequest.cityId = '00000000-0000-0000-0000-000000000000';
    return this.http.post<City>(this.baseApiUrl + '/api/City', addCityRequest);
  }

  getCity(id: string): Observable<City> {
    return this.http.get<City>(this.baseApiUrl + '/api/City/' + id);
  }

  updateCity(id: string, updateCityRequest: City): Observable<City> {
    return this.http.put<City>(this.baseApiUrl + '/api/City/' + id, updateCityRequest);
  }

  deleteCity(id: string): Observable<City> {
    return this.http.delete<City>(this.baseApiUrl + '/api/City/' + id);
  }
}
