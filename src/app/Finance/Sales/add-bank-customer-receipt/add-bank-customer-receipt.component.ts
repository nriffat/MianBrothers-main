import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { BankPaymentService } from '../../bank-payment.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-add-bank-customer-receipt',
  templateUrl: './add-bank-customer-receipt.component.html',
  styleUrls: ['./add-bank-customer-receipt.component.css'],
})
export class AddBankCustomerReceiptComponent implements OnInit {
  allAccounts: any;
  saleOrders: any;
  account_index: number = 0;
  paidTo_index: number = 0;
  purchaseSales_index: number = 0;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  isAllAccountLoaded: boolean = false;
  addBankCustomerReceiptForm: FormBuilder | any;
  allPurchaseSales :any;
  vendorAccounts:any;
  customerAccounts : any;
  customerAccount_index : number = 0;
  isCustomerAccountCodeLoaded : boolean = false;
  constructor(
    private _accountService: AccountsService,
    private _salesService: SalesService,
    private _bankService : BankPaymentService,
    private fb: FormBuilder,
    public dataPipe : DatePipe,
    private _employeeService : EmployeeService,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addBankCustomerReceiptForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      invoiceDate:['',[Validators.required]],
      chequeDate:['',[Validators.required]],
      chequeNo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      paymentDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      whtRate: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],

      gstRate: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],

      advanceAdjusted: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      disc: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      totalCredited: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
    });
  }
  ngOnInit(): void {
    this._accountService.getUserBankAccounts().subscribe((res: any) => {
      this.allAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });
    // this._employeeService.getAllListOfVendorAccounts().subscribe((res: any) => {
    //   this.vendorAccounts = res.payload;
    //   console.log('this.allAccounts:', this.allAccounts);
    // });
    this._accountService.getUserCustomerAccounts().subscribe((res: any) => {
      this.customerAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });

    this._salesService.getAllSalesSales().subscribe((data: any) => {
      this.saleOrders = data.payload;
      console.log('this.allAccounts:', this.saleOrders);

    });

    this._bankService.getSearchSales().subscribe((res: any) => {
      this.allPurchaseSales = res.payload;
      console.log('this.allPurchaseSales:', this.allPurchaseSales);
    });
  }

  loadCustomerAccount(index: number) {
    this.customerAccount_index = index;
    this.isCustomerAccountCodeLoaded = true;
  }
  loadAllAccounts(index: any) {
    this.account_index = index;
    this.isAllAccountLoaded = true;
  }

  loadPaidTo(index: number) {
    this.paidTo_index = index;
    this.isPaidToLoaded = true;
  }

  loadPurchaseSales(index: number) {
    this.purchaseSales_index = index;
    this.isPurchaseSalesLoaded = true;
  }

  addBankCustomer(chequeDate:any,invoiceDate:any){
    let bankPaymentObject = {
      types : 'Sales',
      paymentType : 'Bank',
      serialNumber : this.addBankCustomerReceiptForm.controls['serialNumber'].value,
      paymentDate : this.transformDate(invoiceDate),
      accountId : this.allAccounts[this.account_index].id,
      accountCode: this.allAccounts[this.account_index].accountCode,
      accountInfo: this.allAccounts[this.account_index].accountInfo,
      chequeNumber : this.addBankCustomerReceiptForm.controls['chequeNo'].value,
      chequeDate :this.transformDate(chequeDate),
      paidToId :this.customerAccounts[this.customerAccount_index]?.id,
      paidToCode: this.customerAccounts[this.customerAccount_index].accountCode,
      paidToInfo: this.customerAccounts[this.customerAccount_index].accountInfo,
      paymentDescription : this.addBankCustomerReceiptForm.controls['paymentDescription'].value,
      saleId : this.allPurchaseSales[this.purchaseSales_index].id,
      WHTRate : this.addBankCustomerReceiptForm.controls['whtRate'].value,
      GSTRate : this.addBankCustomerReceiptForm.controls['gstRate'].value,
      advancedAdjustment : this.addBankCustomerReceiptForm.controls['advanceAdjusted'].value,
      discountReceived : this.addBankCustomerReceiptForm.controls['disc'].value,
      totalAmountDebited : this.addBankCustomerReceiptForm.controls['totalCredited'].value,
      invoice: this.allPurchaseSales[this.purchaseSales_index]?.invoice,
      invoiceDate: this.allPurchaseSales[this.purchaseSales_index]?.invoiceDate,
    }

    this._bankService.addBankPayment(bankPaymentObject).then((data:any)=>{
      console.log("Bank Payment Added succesfully",data);
      window.location.reload();
    },
    (err: any) => {
    })
  }

  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }
}
