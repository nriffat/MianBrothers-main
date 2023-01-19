import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormBuilder | any;
  constructor(
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder,

  ) {
    this.myForm();
   }

   myForm(){
    this.loginForm = this.fb.group({
      userName : [
        '',
        [
          Validators.required,
        ],
      ],
      password : [
        '',
        [
          Validators.required,
        ],
      ],
    })
   }
  ngOnInit(): void {
  }
  login(name:string,password:string) {
    this.authService.login(name,password)
  }


  routeToSystemChocie(){
    this.router.navigate(['/system-choice']);
  }
}
