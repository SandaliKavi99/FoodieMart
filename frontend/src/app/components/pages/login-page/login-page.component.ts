import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmited: boolean = false;
  returnUrl= '';
  constructor(
    private formBuilder: FormBuilder,
     private userService: UserService,
     private router:Router, private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmited = true;
    if(this.loginForm.invalid) return;

   this.userService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(
    (response: any) => {
      // Assuming the token is returned in `response.token`
      const token = response.token;

      if (token) {
        // Store the token in localStorage
        localStorage.setItem('jwtToken', token);
        //console.log(localStorage.getItem("jwtToken"))

        // Navigate to the desired URL
        this.router.navigateByUrl(this.returnUrl);
      }
    },
    (error) => {
      console.error('Login failed:', error);
      // Handle error (e.g., display error message to user)
    }
  
  )
  }

}
