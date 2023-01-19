import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-return',
  templateUrl: './edit-return.component.html',
  styleUrls: ['./edit-return.component.css']
})
export class EditReturnComponent implements OnInit {

  editReturnForm: FormBuilder | any;
  editReturnInventoryForm: FormBuilder | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _purchaseService: PurchasesService,
    private _snackbar :MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.editReturnForm = this.fb.group({
      returnDate: ['',[Validators.required]],
      debitNotes: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    });
    this.editReturnInventoryForm = this.fb.group({
      quantity: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      unit: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
    });
  }
  ngOnInit(): void {
    console.log("DATA",this.data)
    this.editReturnForm.controls.returnDate.setValue(this.data.userData.returnDate);
    this.editReturnForm.controls.debitNotes.setValue(this.data.userData.debitNotes);

    this.editReturnInventoryForm.controls.quantity.setValue(this.data.data.quantity);
    this.editReturnInventoryForm.controls.unit.setValue(this.data.data.unit);
  }

  onEditReturn(){
    let editReturnObj = {
      returnDate : this.transformDate(this.editReturnForm.controls.returnDate.value),
      debitNotes : this.editReturnForm.controls.debitNotes.value
    }

    this._purchaseService.editReturn(editReturnObj,this.data.userData.id).then((res:any)=>{
        window.location.reload();
      },
      (err: any) => {
      })
    let editReturnInventoryForm = {
      quantity :this.editReturnInventoryForm.controls.quantity.value,
      unit :this.editReturnInventoryForm.controls.unit.value
    }
    this._purchaseService.editReturnInventory(editReturnInventoryForm,this.data.data.id).then((res:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })

  }

  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }
}
