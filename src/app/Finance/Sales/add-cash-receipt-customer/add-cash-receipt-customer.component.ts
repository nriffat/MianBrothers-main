import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { BankPaymentService } from '../../bank-payment.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-add-cash-receipt-customer',
  templateUrl: './add-cash-receipt-customer.component.html',
  styleUrls: ['./add-cash-receipt-customer.component.css'],
})
export class AddCashReceiptCustomerComponent implements OnInit {
  allAccounts: any;
  allPurchaseSales: any;
  public account_index: number = 0;
  public purchaseSales_index: number = 0;
  public paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  addCashCustomerReceiptForm: FormBuilder | any;
  saleOrders: any;
  customerAccounts: any;
  customerAccount_index: number = 0;
  isCustomerAccountCodeLoaded: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _bankService: BankPaymentService,
    public dataPipe: DatePipe,
    private _accountService: AccountsService,
    private _salesService: SalesService,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addCashCustomerReceiptForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      // chequeNo: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(3),
      //     Validators.maxLength(30),
      //   ],
      // ],
      invoiceDate: ['', [Validators.required]],
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
    this._accountService.getUserCashAccounts().subscribe((res: any) => {
      this.allAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });
    this._accountService.getUserCustomerAccounts().subscribe((res: any) => {
      this.customerAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });

    this._bankService.getSearchSales().subscribe((res: any) => {
      this.allPurchaseSales = res.payload;
      console.log('this.allPurchaseSales:', this.allPurchaseSales);
    });

    this._salesService.getAllSalesSales().subscribe((data: any) => {
      this.saleOrders = data.payload;
      console.log('this.allAccounts:', this.saleOrders);
    });
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
  }
  loadCustomerAccount(index: number) {
    this.customerAccount_index = index;
    this.isCustomerAccountCodeLoaded = true;
  }

  loadPurchaseSales(index: number) {
    this.purchaseSales_index = index;
    this.isPurchaseSalesLoaded = true;
  }

  loadPaidTo(index: number) {
    this.paidTo_index = index;
    this.isPaidToLoaded = true;
  }
  // addCashPayment(chequeDate:any,invoiceDate:any){
  //   let cashPaymentObject = {
  //     types : this.allPurchaseSales[this.purchaseSales_index].types,
  //     paymentType : 'Bank',
  //     serialNumber : this.addCashCustomerReceiptForm.controls['serialNumber'].value,
  //     paymentDate : invoiceDate,
  //     accountId : this.allAccounts[this.account_index].id,
  //     chequeNumber : this.addCashCustomerReceiptForm.controls['chequeNo'].value,
  //     chequeDate :chequeDate,
  //     paidToId :this.allAccounts[this.account_index]?.accountInfo,
  //     paymentDescription : 'ABCDEF',
  //     saleId : this.allPurchaseSales[this.paidTo_index].vendorId,
  //     WHTRate : this.addCashCustomerReceiptForm.controls['whtRate'].value,
  //     WHTAmount : this.addCashCustomerReceiptForm.controls['whtAmount'].value,
  //     GSTRate : this.addCashCustomerReceiptForm.controls['gstRate'].value,
  //     GSTAmount : this.addCashCustomerReceiptForm.controls['gstAmount'].value,
  //     advancedAdjustment : this.addCashCustomerReceiptForm.controls['advanceAdjusted'].value,
  //     discountReceived : this.addCashCustomerReceiptForm.controls['disc'].value,
  //     totalAmountDebited : this.addCashCustomerReceiptForm.controls['totalDebited'].value,
  //     amountPaid : this.addCashCustomerReceiptForm.controls['chequePaid'].value,
  //   }
  // }

  addCashPayment(paymentDate: any) {
    let cashPaymentObject = {
      types: 'Sales',
      paymentType: 'Cash',
      serialNumber:
        this.addCashCustomerReceiptForm.controls['serialNumber'].value,
      paymentDate: this.transformDate(paymentDate),
      accountId: this.allAccounts[this.account_index].id,
      accountCode: this.allAccounts[this.account_index].accountCode,
      accountInfo: this.allAccounts[this.account_index].accountInfo,
      // chequeNumber: this.addCashCustomerReceiptForm.controls['chequeNo'].value,
      // chequeDate: this.transformDate(chequeDate),
      paidToId: this.customerAccounts[this.customerAccount_index]?.id,
      paidToCode: this.customerAccounts[this.customerAccount_index].accountCode,
      paidToInfo: this.customerAccounts[this.customerAccount_index].accountInfo,
      paymentDescription:
        this.addCashCustomerReceiptForm.controls['paymentDescription'].value,
      saleId: this.allPurchaseSales[this.purchaseSales_index].id,
      WHTRate: this.addCashCustomerReceiptForm.controls['whtRate'].value,
      GSTRate: this.addCashCustomerReceiptForm.controls['gstRate'].value,
      advancedAdjustment:
        this.addCashCustomerReceiptForm.controls['advanceAdjusted'].value,
      discountReceived: this.addCashCustomerReceiptForm.controls['disc'].value,
      totalAmountDebited:
        this.addCashCustomerReceiptForm.controls['totalCredited'].value,
      invoice: this.allPurchaseSales[this.purchaseSales_index]?.invoice,
      invoiceDate: this.allPurchaseSales[this.purchaseSales_index]?.invoiceDate,
    };

    this._bankService.addCashPayment(cashPaymentObject).then((data: any) => {
      window.location.reload();
    },
    (err: any) => {
    })
  }

  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
