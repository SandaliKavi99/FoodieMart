import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods } from '../../data';
import { HttpClient } from '@angular/common/http';
import { FOOD_BY_ID, FOOD_BY_SEARCH_URL, FOOD_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(FOOD_URL);
  }

  searchFoods(item:string): Observable<Food[]>{
    return this.http.get<Food[]>(FOOD_BY_SEARCH_URL + item);
  }

  getFoodById(foodId:string): Observable<Food>{
    //console.log(this.http.get<Food>(FOOD_BY_ID + foodId))
    return this.http.get<Food>(FOOD_BY_ID + foodId);
  }
}
