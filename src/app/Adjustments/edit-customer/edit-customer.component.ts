import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  editCustomer: FormBuilder | any;

  constructor(
    private _purchaseService: PurchasesService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.editCustomer = this.fb.group({
      paymentDate: ['', [Validators.required]],
      whtRate: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],

      gstRate: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      discountReceived: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      advanceAdjusted: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
    });
  }
  ngOnInit(): void {
    console.log('This data', this.data);
    this.editCustomer.controls.paymentDate.setValue(
      this.data.userData.paymentDate
    );
    this.editCustomer.controls.discountReceived.setValue(
      this.data.userData.discountReceived
    );
    this.editCustomer.controls.gstRate.setValue(this.data.userData.gstRate);
    this.editCustomer.controls.whtRate.setValue(this.data.userData.whtRate);
    this.editCustomer.controls.advanceAdjusted.setValue(
      this.data.userData.advanceAdjusted
    );
  }
  onEditCustomer() {
    let editObj = {
      paymentDate: this.transformDate(
        this.editCustomer.controls.paymentDate.value
      ),
      WHTRate: this.editCustomer.controls.whtRate.value,
      GSTRate: this.editCustomer.controls.gstRate.value,
      discountReceived: this.editCustomer.controls.discountReceived.value,
      advancedAdjustment: this.editCustomer.controls.advanceAdjusted.value,
    };

    this._purchaseService
      .editCustomer(editObj, this.data.userData.id)
      .then((res: any) => {
        window.location.reload();
      },
      (err: any) => {
      })
  }

  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
