import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuVisible = false;
  user!:User;

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }


  
  constructor(private userService: UserService, private router:Router) {
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    })
   }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['/login']);
    this.userService.logout();

  }

  get isAuth(){
    return this.user.token;
  }

}
