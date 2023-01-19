import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-edit-all-user',
  templateUrl: './edit-all-user.component.html',
  styleUrls: ['./edit-all-user.component.css'],
})
export class EditAllUserComponent implements OnInit {
  editUser: FormBuilder | any;
  constructor(
    private _purchaseService: PurchasesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.editUser = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      pass: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    console.log('This data', this.data);
    this.editUser.controls.username.setValue(this.data.userData.username);
  }
  onEditUser() {
    let editObj = {
      username: this.editUser.controls.username.value,
      pass: this.editUser.controls.pass.value,
    };

    this._purchaseService
      .editAllUser(editObj, this.data.userData.id)
      .then((res: any) => {
        console.log('RES', res);
        window.location.reload();
      },(err: any) => {
      });
  }
}
