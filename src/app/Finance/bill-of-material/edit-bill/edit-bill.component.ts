import { DatePipe } from '@angular/common';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.css']
})
export class EditBillComponent implements OnInit {

  editOrder: FormBuilder | any;
  editOrderUsage: FormBuilder | any;
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
    this.editOrderUsage = this.fb.group({
      unit: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      quantityUsed: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      rate: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
    });

    this.editOrder = this.fb.group({
      labourCost: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      factoryOverhead: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      unit: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      rate: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      quantity: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
    });
  }

  ngOnInit(): void {
    console.log('DATA', this.data);

    // Edit  Order

    this.editOrderUsage.controls.unit.setValue(
      this.data.data.unit
    );
    this.editOrderUsage.controls.quantityUsed.setValue(
      this.data.data.quantityUsed
    );
    this.editOrderUsage.controls.rate.setValue(
      this.data.data.rate
    );

    //Edit Order Usage
    this.editOrder.controls.unit.setValue(this.data.userData.unit);
    this.editOrder.controls.rate.setValue(this.data.userData.rate);
    this.editOrder.controls.quantity.setValue(this.data.userData.quantity);
    this.editOrder.controls.labourCost.setValue(
      this.data.userData.labourCost
    );
    this.editOrder.controls.factoryOverhead.setValue(
      this.data.userData.factoryOverhead
    );
  }

  editPurchaseOrders() {
    //product history
    let editOrderObj = {
      unit: this.editOrder.controls.unit.value,
      quantity: this.editOrder.controls.quantity.value,
      rate: this.editOrder.controls.rate.value,
      labourCost: this.editOrder.controls.labourCost.value,
      factoryOverhead: this.editOrder.controls.factoryOverhead.value,
    };

    this._purchaseService
      .editOrder(editOrderObj, this.data.userData.id)
      .then((data: any) => {
      window.location.reload();
    },
    (err: any) => {
    })

    //purchase order
    let editObj = {
      unit: this.editOrderUsage.controls.unit.value,
      quantityUsed:
        this.editOrderUsage.controls.quantityUsed.value,

      rate:
        this.editOrderUsage.controls.rate.value
    };
    this._purchaseService
      .editOrderUsage(editObj, this.data.data.id)
      .then((data: any) => {
        window.location.reload();
      },
      (err: any) => {
      })
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
