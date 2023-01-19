import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MaxValidator,
  MinValidator,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css'],
})
export class EmployeeRegisterComponent implements OnInit {
  departmentValue: any;
  requiredForm: FormGroup | any;
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dataPipe : DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.requiredForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      date:['',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      position: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      salary: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10000000),
        ],
      ],
      cnic: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{5}-[0-9]{7}-[0-9]$'),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  ngOnInit(): void {}

  changeValue(event: any) {
    this.departmentValue = event;
    console.log('event', event);
  }

  addEmployee(
    fullname: any,
    position: any,
    salary: any,
    date: any,
    cnic: any,
    dateOfBirth: any,
    address: any
  ) {
    let obj = {
      fullName: this.requiredForm.controls['name'].value,
      position: this.requiredForm.controls['position'].value,
      department: this.departmentValue,
      salary: this.requiredForm.controls['salary'].value,
      joiningDate: this.transformDate(date),
      cnic: this.requiredForm.controls['cnic'].value,
      dob: this.transformDate(dateOfBirth),
      addressInformation: this.requiredForm.controls['address'].value,
    };
    console.log('add ', obj);

    this.employeeService.addEmployee(obj).then((data: any) => {
      console.log('employeed added');
      window.location.reload();
    },(err:any)=>{
      console.log("error",err)
    });
  }

  transformDate(date : any){
   return this.dataPipe.transform(date,'yyyy-MM-dd');
  }
}
