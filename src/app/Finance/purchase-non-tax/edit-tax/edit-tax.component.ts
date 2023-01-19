import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-tax',
  templateUrl: './edit-tax.component.html',
  styleUrls: ['./edit-tax.component.css'],
})
export class EditTaxComponent implements OnInit {
  editTax: FormBuilder | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _purchaseService: PurchasesService,
    private _snackbar:MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.editTax = this.fb.group({
      saleDate: ['',[Validators.required]],
      invoiceDate: ['',[Validators.required]],
      paymentTerms: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      discount: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],

    });
  }

  ngOnInit(): void {
    console.log("This data",this.data)
    this.editTax.controls.saleDate.setValue(this.data.userData.saleDate);
    this.editTax.controls.paymentTerms.setValue(
      this.data.userData.paymentTerms
    );
    this.editTax.controls.discount.setValue(this.data.userData.discount);
    this.editTax.controls.invoiceDate.setValue(this.data.userData.invoiceDate);
  }

  onEditTax() {
    let editObj = {
      saleDate: this.transformDate(this.editTax.controls.saleDate.value),
      invoiceDate: this.transformDate(this.editTax.controls.invoiceDate.value),
      paymentTerms: this.editTax.controls.paymentTerms.value,
      discount: this.editTax.controls.discount.value,
    };

    this._purchaseService
      .editTax(editObj,this.data.userData.id)
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
