import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuisine } from '../Models/cuisine.model';

@Injectable({
  providedIn: 'root'
})
export class CuisinesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllCuisines(): Observable<Cuisine[]>{
    return this.http.get<Cuisine[]>(this.baseApiUrl + '/api/Cuisine');
  }

  addCuisine(addCuisineRequest: Cuisine): Observable<Cuisine> {
    addCuisineRequest.cuisineId = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Cuisine>(this.baseApiUrl + '/api/Cuisine', addCuisineRequest);
  }

  getCuisine(id: string): Observable<Cuisine> {
    return this.http.get<Cuisine>(this.baseApiUrl + '/api/Cuisine/' + id);
  }

  updateCuisine(id: string, updateCuisineRequest: Cuisine): Observable<Cuisine> {
    return this.http.put<Cuisine>(this.baseApiUrl + '/api/Cuisine/' + id, updateCuisineRequest);
  }

  deleteCuisine(id: string): Observable<Cuisine> {
    return this.http.delete<Cuisine>(this.baseApiUrl + '/api/Cuisine/' + id);
  }
}
