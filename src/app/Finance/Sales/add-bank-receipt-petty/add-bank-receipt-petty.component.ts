import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { BankPaymentService } from '../../bank-payment.service';

@Component({
  selector: 'app-add-bank-receipt-petty',
  templateUrl: './add-bank-receipt-petty.component.html',
  styleUrls: ['./add-bank-receipt-petty.component.css'],
})
export class AddBankReceiptPettyComponent implements OnInit {
  allAccounts: any;
  account_index: number = 0;
  paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  accountOfOtherType: any;
  addBankPettyReceiptForm: FormBuilder | any;
  constructor(
    private _accountService: AccountsService,
    private fb: FormBuilder,
    private _bankService: BankPaymentService,
    public dataPipe: DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addBankPettyReceiptForm = this.fb.group({
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
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
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
    this._accountService.getAccountOfOtherType().subscribe((res: any) => {
      this.accountOfOtherType = res.payload;
      console.log('this.accountOfOtherType:', this.accountOfOtherType);
    });
  }
  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
  }

  loadPaidTo(index: number) {
    this.paidTo_index = index;
    this.isPaidToLoaded = true;
  }

  addBankReceipt(chequeDate: any, date: any) {
    let bankPettyObject: any = {
      types: 'Sales',
      paymentType: 'Bank',
      isPetty: 1,
      serialNumber: this.addBankPettyReceiptForm.controls['serialNumber'].value,
      paymentDate: this.transformDate(date),
      accountId: this.allAccounts[this.account_index]?.id,
      accountCode: this.allAccounts[this.account_index].accountCode,
      accountInfo: this.allAccounts[this.account_index].accountInfo,
      paidToId: this.accountOfOtherType[this.paidTo_index]?.id,
      paidToCode: this.accountOfOtherType[this.paidTo_index].accountCode,
      paidToInfo: this.accountOfOtherType[this.paidTo_index].accountInfo,
      paymentDescription:
        this.addBankPettyReceiptForm.controls['description'].value,
      chequeNumber: this.addBankPettyReceiptForm.controls['chequeNo'].value,
      chequeDate: this.transformDate(chequeDate),
      totalAmountDebited:
        this.addBankPettyReceiptForm.controls['totalCredited'].value,
    };

    this._bankService.addBankPettyPayment(bankPettyObject).then(
      (data: any) => {
        console.log('Bank petty added successfully', data);
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
