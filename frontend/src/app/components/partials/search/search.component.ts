import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  item=""
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParams.subscribe((params) => {
      if (params['item']) {
        this.item = params['item'];
      }
    });
  }
  

  ngOnInit(): void {
  }

  search(term: string): void {
    if (term) {
      this.router.navigate(["search/", term]);
    }
  }
  
}
