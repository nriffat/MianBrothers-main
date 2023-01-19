import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editEmployeeForm: FormBuilder | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _employeeService: EmployeeService,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.editEmployeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      position: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      department: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      salary: [
        '',
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
      joiningDate: ['', [Validators.required]],
      leavingDate: ['',[Validators.required]],
      cnic: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{7}-[0-9]$')],
      ],
      dob: ['', [Validators.required]],
      addressInformation: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  ngOnInit(): void {
    console.log('DATA', this.data);
    this.editEmployeeForm.controls.fullName.setValue(
      this.data.userData.fullName
    );
    this.editEmployeeForm.controls.position.setValue(
      this.data.userData.position
    );
    this.editEmployeeForm.controls.department.setValue(
      this.data.userData.department
    );
    this.editEmployeeForm.controls.salary.setValue(this.data.userData.salary);
    this.editEmployeeForm.controls.joiningDate.setValue(
      this.data.userData.joiningDate
    );
    this.editEmployeeForm.controls.leavingDate.setValue(
      this.data.userData.leavingDate
    );
    this.editEmployeeForm.controls.cnic.setValue(this.data.userData.cnic);
    this.editEmployeeForm.controls.dob.setValue(this.data.userData.dob);
    this.editEmployeeForm.controls.addressInformation.setValue(
      this.data.userData.addressInformation
    );
  }

  editEmployee() {
    let editObj = {
      fullName: this.editEmployeeForm.controls.fullName.value,
      position: this.editEmployeeForm.controls.position.value,
      department: this.editEmployeeForm.controls.department.value,
      salary: this.editEmployeeForm.controls.salary.value,
      joiningDate: this.transformDate(
        this.editEmployeeForm.controls.joiningDate.value
      ),
      cnic: this.editEmployeeForm.controls.cnic.value,
      dob: this.transformDate(this.editEmployeeForm.controls.dob.value),
      addressInformation:
        this.editEmployeeForm.controls.addressInformation.value,
      leavingDate: this.transformDate(
        this.editEmployeeForm.controls.leavingDate.value
      ),
    };
    this._employeeService
      .editEmployee(editObj, this.data.userData.id)
      .then((data: any) => {
        console.log('Data edited succesfully', data);
        window.location.reload();
      },
      (err: any) => {
      });
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
