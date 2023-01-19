import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { PurchasesService } from '../../purchases.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-add-delivery-challan',
  templateUrl: './add-delivery-challan.component.html',
  styleUrls: ['./add-delivery-challan.component.css'],
})
export class AddDeliveryChallanComponent implements OnInit {
  allCustomers: any;
  public isCustomerCodeLoaded: boolean = false;
  public customer_index: number = 0;
  public sale_index: number = 0;
  public saleOrders: any;
  public isSaleCodeLoaded: boolean = false;
  addDeliveryChallanForm: FormBuilder | any;
  constructor(
    private _accountService: AccountsService,
    private _salesService: SalesService,
    private fb: FormBuilder,
    public dataPipe: DatePipe,
    private _purchaseService: PurchasesService,
    private _snackbar: MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addDeliveryChallanForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      orderDate: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
      driverName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      termsOfPayment: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      packingDetails: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
    });
  }
  ngOnInit(): void {
    // this._accountService.getCustomerCode().subscribe((customers:any) =>{
    //   this.allCustomers = customers.payload;
    // })

    this._salesService.getAllSales().subscribe((data: any) => {
      this.saleOrders = data.payload;
      console.log('all sale orders', this.saleOrders);
    });
  }

  loadCustomers(index: any) {
    this.customer_index = index;
    this.isCustomerCodeLoaded = true;
  }

  loadSales(index: any) {
    this.sale_index = index;
    this.isSaleCodeLoaded = true;
    this._salesService
      .getCustomersById(this.saleOrders[this.sale_index].customerId)
      .subscribe((res: any) => {
        this.allCustomers = res.payload;
        console.log('this.allCustomers', this.allCustomers);
      });
  }

  addDeliveryChallan(date: any, deliveryDate: any) {
    let deliveryChallan = {
      serialNumber: this.addDeliveryChallanForm.controls['serialNumber'].value,
      challanDate: this.transformDate(date),
      timeOfSupply: this.transformDate(deliveryDate),
      vehicleDescription:
        this.addDeliveryChallanForm.controls['packingDetails'].value,
      driverName: this.addDeliveryChallanForm.controls['driverName'].value,
      challanDescription:
        this.addDeliveryChallanForm.controls['description'].value,
      orderId: this.saleOrders[this.sale_index].id,
      orderDate: this.saleOrders[this.sale_index].orderDate,
      customerCode: this.saleOrders[this.sale_index].customerCode,
      customerId: this.saleOrders[this.sale_index].customerId,
      customerOrderReference:
        this.saleOrders[this.sale_index].customerOrderReference,
    };

    this._purchaseService.AddDeliveryChallan(deliveryChallan).then(
      (res: any) => {
        window.location.reload();
      },
      (err: any) => {
      }
    );
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
