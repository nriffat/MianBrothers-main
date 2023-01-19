import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-cash-petty',
  templateUrl: './edit-cash-petty.component.html',
  styleUrls: ['./edit-cash-petty.component.css'],
})
export class EditCashPettyComponent implements OnInit {
  editCashPettyForm: FormBuilder | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _purchaseService: PurchasesService,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.editCashPettyForm = this.fb.group({
      paymentDate: ['',[Validators.required]],
      totalAmountDebited: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
    });
  }

  ngOnInit(): void {
    this.editCashPettyForm.controls.paymentDate.setValue(
      this.data.userData.paymentDate
    );

    this.editCashPettyForm.controls.totalAmountDebited.setValue(
      this.data.userData.totalAmountDebited
    );
  }

  onEditCashPetty() {
    let editObj = {
      paymentDate: this.transformDate(
        this.editCashPettyForm.controls.paymentDate.value
      ),

      totalAmountDebited: this.editCashPettyForm.controls.totalAmountDebited.value,
    };

    this._purchaseService.editCashPettyForm(editObj,this.data.userData.id).then((data:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
