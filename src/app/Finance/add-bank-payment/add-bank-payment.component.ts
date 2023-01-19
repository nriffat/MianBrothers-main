import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { BankPaymentService } from '../bank-payment.service';

@Component({
  selector: 'app-add-bank-payment',
  templateUrl: './add-bank-payment.component.html',
  styleUrls: ['./add-bank-payment.component.css'],
})
export class AddBankPaymentComponent implements OnInit {
  allAccounts: any;
  allPurchaseSales: any;
  public account_index: number = 0;
  public purchaseSales_index: number = 0;
  public paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  addBankPaymentForm: FormBuilder | any;
  vendorAccounts: any;
  constructor(
    private _bankService: BankPaymentService,
    private _accountService: AccountsService,
    private _employeeService: EmployeeService,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.addBankPaymentForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      invoiceDate: ['', [Validators.required]],
      chequeDate: ['', [Validators.required]],

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
      totalDebited: [
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
    this._employeeService.getAllVendorAccounts().subscribe((res: any) => {
      this.vendorAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });
    this._bankService.getPurchaseSales().subscribe((res: any) => {
      this.allPurchaseSales = res.payload;
      console.log('this.allPurchaseSales:', this.allPurchaseSales);
    });
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

  addBankPayment(chequeDate: any, invoiceDate: any) {
    let bankPaymentObject = {
      types: 'Purchases',
      paymentType: 'Bank',
      serialNumber: this.addBankPaymentForm.controls['serialNumber'].value,
      paymentDate: this.transformDate(invoiceDate),
      accountId: this.allAccounts[this.account_index].id,
      accountCode: this.allAccounts[this.account_index].accountCode,
      accountInfo: this.allAccounts[this.account_index].accountInfo,
      paidToCode: this.vendorAccounts[this.paidTo_index]?.accountCode,
      paidToInfo: this.vendorAccounts[this.paidTo_index].accountInfo,
      paidToId: this.vendorAccounts[this.paidTo_index]?.id,
      chequeNumber: this.addBankPaymentForm.controls['chequeNo'].value,
      chequeDate: this.transformDate(chequeDate),
      paymentDescription:
        this.addBankPaymentForm.controls['paymentDescription'].value,
      invoice: this.allPurchaseSales[this.purchaseSales_index]?.invoice,
      invoiceDate: this.allPurchaseSales[this.purchaseSales_index]?.invoiceDate,
      saleId: this.allPurchaseSales[this.purchaseSales_index].id,
      WHTRate: this.addBankPaymentForm.controls['whtRate'].value,
      GSTRate: this.addBankPaymentForm.controls['gstRate'].value,
      advancedAdjustment:
        this.addBankPaymentForm.controls['advanceAdjusted'].value,
      discountReceived: this.addBankPaymentForm.controls['disc'].value,
      totalAmountDebited:
        this.addBankPaymentForm.controls['totalDebited'].value,
    };

    this._bankService.addBankPayment(bankPaymentObject).then((data: any) => {
      window.location.reload();
    },
    (err: any) => {
    })
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
