import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-cash',
  templateUrl: './edit-cash.component.html',
  styleUrls: ['./edit-cash.component.css']
})
export class EditCashComponent implements OnInit {

  editCashForm: FormBuilder | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe : DatePipe,
    private _purchaseService : PurchasesService,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm(){
    this.editCashForm = this.fb.group({
      paymentDate : ['',[Validators.required,]],
      WHTRate : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      GSTRate : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      advancedAdjustment : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      discountReceived : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      totalAmountDebited : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
    })
  }

  ngOnInit(): void {
    console.log('DATA', this.data);
    this.editCashForm.controls.paymentDate.setValue(this.data.userData.paymentDate);
    this.editCashForm.controls.WHTRate.setValue(this.data.userData.WHTRate);
    this.editCashForm.controls.GSTRate.setValue(this.data.userData.GSTRate);
    this.editCashForm.controls.advancedAdjustment.setValue(this.data.userData.advancedAdjustment);
    this.editCashForm.controls.discountReceived.setValue(this.data.userData.discountReceived);
    this.editCashForm.controls.totalAmountDebited.setValue(this.data.userData.totalAmountDebited);
  }

  editCash(){
    let editObj = {
    paymentDate: this.transformDate(this.editCashForm.controls.paymentDate.value),
    WHTRate: this.editCashForm.controls.WHTRate.value,
    GSTRate: this.editCashForm.controls.GSTRate.value,
    advancedAdjustment: this.editCashForm.controls.advancedAdjustment.value,
    discountReceived: this.editCashForm.controls.discountReceived.value,
    totalAmountDebited: this.editCashForm.controls.totalAmountDebited.value,
    }
    this._purchaseService.editCashForm(editObj,this.data.userData.id).then((data:any)=>{
      (data.message)
      window.location.reload();
    },
    (err: any) => {
    })
  }
  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }
}
