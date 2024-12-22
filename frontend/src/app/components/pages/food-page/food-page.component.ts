import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food: Food | null = null; // Initialize as null
  loading = true; // Loading state

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.foodService.getFoodById(params.id).subscribe({
          next: (serverFood) => {
            this.food = serverFood;
            this.loading = false; // Data is loaded
          },
          error: (err) => {
            console.error('Error fetching food:', err);
            this.loading = false;
          }
        });
      } else {
        this.loading = false;
      }
    });
    console.log('ngOnInit completed');
  }
  
  
}
