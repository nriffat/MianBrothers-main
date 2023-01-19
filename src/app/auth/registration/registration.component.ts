import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  signUpForm: FormBuilder | any;
  disableCheck: boolean = false;
  value: any;
  cnicId: any;
  registerationForm = new FormGroup({
    selectId: new FormControl(),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerationForm.controls.selectId.valueChanges.subscribe(
      (id: any) => {
        this.cnicId = this.value.find((element: any) => element.id === id);
        console.log('element', this.cnicId);
        console.log(this.cnicId.id);
        this.disableCheck = true;
      }
    );

    this.authService.getEmployeesByCnic().subscribe((data: any) => {
      this.value = data.payload;
      console.log(...this.value);
    });
  }

  onSubmit(username: any, password: any) {
    this.authService.register(this.cnicId.id, username, password).then(
      (res: any) => {
        console.log('signup', res);
        // this.router.navigate(['/employee-home']);
      },
      (err: any) => {
      }
    );
  }
}
