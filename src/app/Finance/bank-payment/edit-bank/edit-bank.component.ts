import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.component.html',
  styleUrls: ['./edit-bank.component.css']
})
export class EditBankComponent implements OnInit {

  editBankForm: FormBuilder | any;

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
    this.editBankForm = this.fb.group({
      chequeNumber : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      paymentDate : ['',[Validators.required]],
      paymentTerms : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      WHTRate : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      chequeDate : ['',[Validators.required]],
      GSTRate : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      advancedAdjustment : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      discountReceived : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      totalAmountDebited : ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
    })
  }

  ngOnInit(): void {
    console.log('DATA', this.data);
    this.editBankForm.controls.chequeNumber.setValue(this.data.userData.chequeNumber);
    this.editBankForm.controls.paymentDate.setValue(this.data.userData.paymentDate);
    this.editBankForm.controls.paymentTerms.setValue(this.data.userData.paymentTerms);
    this.editBankForm.controls.WHTRate.setValue(this.data.userData.WHTRate);
    this.editBankForm.controls.chequeDate.setValue(this.data.userData.chequeDate);
    this.editBankForm.controls.GSTRate.setValue(this.data.userData.GSTRate);
    this.editBankForm.controls.advancedAdjustment.setValue(this.data.userData.advancedAdjustment);
    this.editBankForm.controls.discountReceived.setValue(this.data.userData.discountReceived);
    this.editBankForm.controls.totalAmountDebited.setValue(this.data.userData.totalAmountDebited);
  }

  editBank(){
    let editObj = {
    chequeNumber: this.editBankForm.controls.chequeNumber.value,
    paymentDate: this.transformDate(this.editBankForm.controls.paymentDate.value),
    paymentTerms: this.editBankForm.controls.paymentTerms.value,
    WHTRate: this.editBankForm.controls.WHTRate.value,
    chequeDate: this.transformDate(this.editBankForm.controls.chequeDate.value),
    GSTRate: this.editBankForm.controls.GSTRate.value,
    advancedAdjustment: this.editBankForm.controls.advancedAdjustment.value,
    discountReceived: this.editBankForm.controls.discountReceived.value,
    totalAmountDebited: this.editBankForm.controls.totalAmountDebited.value,
    }
    this._purchaseService.editBankForm(editObj,this.data.userData.id).then((data:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
  }
  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }

}
