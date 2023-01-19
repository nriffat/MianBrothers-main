import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.css'],
})
export class EditPurchaseOrderComponent implements OnInit {
  editPurchaseOrder: FormBuilder | any;
  editProductHistory: FormBuilder | any;
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
    this.editPurchaseOrder = this.fb.group({
      purchaseDate: ['',[Validators.required]],
      paymentTerms: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      deliveryDate: ['',[Validators.required]],
    });

    this.editProductHistory = this.fb.group({
      furtherTaxRate: ['',[Validators.required]],
      salesTaxRate: ['',[Validators.required]],
      unit: ['',[Validators.required]],
      rate: ['',[Validators.required]],
      quantity: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log('DATA', this.data);

    // Edit Purchase Order
    this.editPurchaseOrder.controls.purchaseDate.setValue(
      this.data.userData.orderDate
    );
    this.editPurchaseOrder.controls.paymentTerms.setValue(
      this.data.userData.paymentTerms
    );
    this.editPurchaseOrder.controls.deliveryDate.setValue(
      this.data.userData.deliveryDate
    );

    //Edit Product History
    this.editProductHistory.controls.unit.setValue(this.data.data.unit);
    this.editProductHistory.controls.rate.setValue(this.data.data.rate);
    this.editProductHistory.controls.quantity.setValue(this.data.data.quantity);
    this.editProductHistory.controls.furtherTaxRate.setValue(
      this.data.data.furtherTaxRate
    );
    this.editProductHistory.controls.salesTaxRate.setValue(
      this.data.data.salesTaxRate
    );
  }

  editPurchaseOrders() {
    //product history
    let editProductHistoryObj = {
      unit: this.editProductHistory.controls.unit.value,
      quantity: this.editProductHistory.controls.quantity.value,
      rate: this.editProductHistory.controls.rate.value,
      furtherTaxRate: this.editProductHistory.controls.furtherTaxRate.value,
      salesTaxRate: this.editProductHistory.controls.salesTaxRate.value,
    };

    this._purchaseService
    .editProductHistory(editProductHistoryObj, this.data.data.id)
    .then((data: any) => {
        window.location.reload();
      },
      (err: any) => {
      })

    //purchase order
    let editObj = {
      purchaseDate: this.transformDate(
        this.editPurchaseOrder.controls.purchaseDate.value
      ),
      paymentTerms: this.editPurchaseOrder.controls.paymentTerms.value,
      deliveryDate: this.transformDate(
        this.editPurchaseOrder.controls.deliveryDate.value
      ),
    };
    this._purchaseService
      .editPurchaseOrder(editObj, this.data.userData.id)
      .then((data: any) => {
        console.log('Data edited succesfully', data);
        window.location.reload();
      },
      (err: any) => {
      });
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
