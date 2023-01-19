import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-bank-petty',
  templateUrl: './edit-bank-petty.component.html',
  styleUrls: ['./edit-bank-petty.component.css']
})
export class EditBankPettyComponent implements OnInit {

  editBankPettyForm: FormBuilder | any;

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
    this.editBankPettyForm = this.fb.group({
      paymentDate: ['',[Validators.required]],
      chequeNumber: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      chequeDate: ['',[Validators.required,]],
      totalAmountDebited: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
    });
  }

  ngOnInit(): void {
    this.editBankPettyForm.controls.paymentDate.setValue(this.data.userData.paymentDate);
    this.editBankPettyForm.controls.chequeNumber.setValue(this.data.userData.chequeNumber);
    this.editBankPettyForm.controls.chequeDate.setValue(this.data.userData.chequeDate);
    this.editBankPettyForm.controls.totalAmountDebited.setValue(this.data.userData.totalAmountDebited);
  }

  onEditBankPetty(){
    let editObj = {
      paymentDate: this.transformDate(this.editBankPettyForm.controls.paymentDate.value),
      chequeNumber: this.editBankPettyForm.controls.chequeNumber.value,
      chequeDate: this.transformDate(this.editBankPettyForm.controls.chequeDate.value),
      totalAmountDebited: this.editBankPettyForm.controls.totalAmountDebited.value,
    }
    this._purchaseService.editBankPettyForm(editObj,this.data.userData.id).then((data:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
  }
  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }

}
