import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.css']
})
export class EditDeliveryComponent implements OnInit {

  editDeliveryChallanForm: FormBuilder | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _purchaseService: PurchasesService,
  ) {
    this.myForm();
  }

  myForm() {
    this.editDeliveryChallanForm = this.fb.group({
      challanDate: ['',[Validators.required]],
      timeOfSupply: ['',[Validators.required]],
      vehicleDescription: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      driverName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      challanDescription: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
    console.log("DATA",this.data)
    this.editDeliveryChallanForm.controls.challanDate.setValue(this.data.userData.challanDate);
    this.editDeliveryChallanForm.controls.timeOfSupply.setValue(this.data.userData.timeOfSupply);
    this.editDeliveryChallanForm.controls.vehicleDescription.setValue(this.data.userData.vehicleDescription);
    this.editDeliveryChallanForm.controls.driverName.setValue(this.data.userData.driverName);
    this.editDeliveryChallanForm.controls.challanDescription.setValue(this.data.userData.challanDescription);
  }

  onEditDeliveryChallan(){
    let editObj = {
      challanDate: this.transformDate(this.editDeliveryChallanForm.controls.challanDate.value),
      timeOfSupply: this.editDeliveryChallanForm.controls.timeOfSupply.value,
      vehicleDescription: this.editDeliveryChallanForm.controls.vehicleDescription.value,
      driverName: this.editDeliveryChallanForm.controls.driverName.value,
      challanDescription: this.editDeliveryChallanForm.controls.challanDescription.value,
    }
    this._purchaseService.editDeliveryChallan( editObj,this.data.userData.id).then((res:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
  }
  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }

}
