import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY= 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor( private http:HttpClient,  private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   login(userLogin: IUserLogin): Observable<User> {
    // Check if userLogin is empty or missing required fields
    if (!userLogin || !userLogin.email || !userLogin.password) {
      this.toastrService.error('Email and Password cannot be empty', 'Login Failed');
      return throwError(() => new Error('Email and Password cannot be empty'));
    }
  
    return this.http.post<User>(USER_LOGIN_URL, userLogin)
      .pipe(tap({
        next: (userDetails) => {
          this.setUserToLocalStorage(userDetails);
          this.userSubject.next(userDetails);
          this.toastrService.success(
            `Welcome to FoodieMart ${userDetails.name}!`, 'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      }));
  }
  

   logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('jwtToken');
    window.location.reload();
   }

   private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
   }

   private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
   }
}

