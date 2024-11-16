import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food:Food={
    id: '',
    name: '',
    price: 0,
    favourite: false,
    stars: 0,
    imageUrl: '',
    origins: [],
    cookTime: ''
  };
  constructor(private activatedRoute: ActivatedRoute, private foodService:FoodService) { 
   
  }

  ngOnInit(): void {

    let foodObservable:Observable<Food>

    
    this.activatedRoute.params.subscribe((params) => {
      if(params.id)
        foodObservable = this.foodService.getFoodById(params.id)

      foodObservable.subscribe((serverFoods) => {
        this.food = serverFoods;
      })
            
        }
      )
      
    
  
  console.log(this.food);
  }

}
