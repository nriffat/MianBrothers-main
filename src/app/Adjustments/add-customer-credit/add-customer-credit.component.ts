import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { BankPaymentService } from 'src/app/Finance/bank-payment.service';

@Component({
  selector: 'app-add-customer-credit',
  templateUrl: './add-customer-credit.component.html',
  styleUrls: ['./add-customer-credit.component.css'],
})
export class AddCustomerCreditComponent implements OnInit {
  customerAccounts: any;
  allAccounts: any;
  allPurchaseSales: any;
  public account_index: number = 0;
  public purchaseSales_index: number = 0;
  public paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  addCashPaymentForm: FormBuilder | any;
  accountTypeValue: any;
  constructor(
    private _bankService: BankPaymentService,
    private _accountService: AccountsService,
    private fb: FormBuilder,
    public dataPipe: DatePipe,
    private _snackbar :MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addCashPaymentForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      paymentDate: ['', [Validators.required]],
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
    });
  }
  ngOnInit(): void {
    this._accountService.getAllUserAccounts().subscribe((res: any) => {
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
  }
  changeValue(event: any) {
    this.accountTypeValue = event;
    console.log('event', event);
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
  }

  loadPurchaseSales(index: number) {
    this.purchaseSales_index = index;
    this.isPurchaseSalesLoaded = true;
  }

  loadPaidTo(index: number) {
    this.paidTo_index = index;
    this.isPaidToLoaded = true;
  }

  addCashPayment(invoiceDate: any) {
    let cashPaymentObject = {
      types: this.accountTypeValue,
      adjustmentType: 'Customer',
      serialNumber: this.addCashPaymentForm.controls['serialNumber'].value,
      paymentDate: this.transformDate(invoiceDate),
      accountCode: this.allAccounts[this.account_index].accountCode,
      accountInfo: this.allAccounts[this.account_index].accountInfo,
      accountId: this.allAccounts[this.account_index].id,
      paidToCode: this.customerAccounts[this.paidTo_index]?.accountCode,
      paidToInfo: this.customerAccounts[this.paidTo_index].accountInfo,
      paidToId: this.customerAccounts[this.paidTo_index]?.id,
      paymentDescription:
        this.addCashPaymentForm.controls['paymentDescription'].value,
      invoice: this.allPurchaseSales[this.purchaseSales_index]?.invoice,
      invoiceDate: this.allPurchaseSales[this.purchaseSales_index]?.invoiceDate,
      saleId: this.allPurchaseSales[this.purchaseSales_index].id,
      WHTRate: this.addCashPaymentForm.controls['whtRate'].value,
      GSTRate: this.addCashPaymentForm.controls['gstRate'].value,
      advancedAdjustment:
        this.addCashPaymentForm.controls['advanceAdjusted'].value,
      discountReceived: this.addCashPaymentForm.controls['disc'].value,
      // totalAmountDebited : this.addCashPaymentForm.controls['totalDebited'].value,
      grossAmount: this.allPurchaseSales[this.purchaseSales_index].totalAmount,
    };

    this._bankService
      .addCustomerAccount(cashPaymentObject)
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
