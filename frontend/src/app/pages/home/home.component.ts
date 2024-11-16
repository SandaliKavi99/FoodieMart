import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods:Food[]=[];
  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute, private router:Router){ 
    let foodObservable:Observable<Food[]>

    activatedRoute.params.subscribe((params)=>{
      if(params.item)
        foodObservable = this.foodService.searchFoods(params.item) ;
        // if(foodObservable){
        //   this.router.navigate(['/notFound', '']);

        // }
          
      else
        foodObservable = foodService.getAll();

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
        console.log(foodObservable);

        }
      )
  }

  ngOnInit(): void {
  }

}
