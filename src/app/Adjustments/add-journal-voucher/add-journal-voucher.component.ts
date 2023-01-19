import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { BankPaymentService } from 'src/app/Finance/bank-payment.service';

@Component({
  selector: 'app-add-journal-voucher',
  templateUrl: './add-journal-voucher.component.html',
  styleUrls: ['./add-journal-voucher.component.css']
})
export class AddJournalVoucherComponent implements OnInit {

  allAccounts: any;
  allPurchaseSales: any;
  public account_index: number = 0;
  public purchaseSales_index: number = 0;
  public paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  addCashPettyForm: FormBuilder | any;
  accountTypeValue : any;
  otherAccountData : any;
  constructor(
    private _bankService: BankPaymentService,
    private _accountService: AccountsService,
    private fb: FormBuilder,
    private dataPipe : DatePipe,
    private _snackbar : MatSnackBar

  ) {
    this.myForm();
  }
  myForm() {
    this.addCashPettyForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      balance: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000000),
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
      paymentDate: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }
  ngOnInit(): void {
    this._accountService.getAllUserAccounts().subscribe((res: any) => {
      this.allAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });
    this._accountService.getAccountOfOtherType().subscribe((res: any) => {
      this.otherAccountData = res.payload;
      console.log('this.otherAccountData:', this.otherAccountData);
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

  changeValue(event: any) {
    this.accountTypeValue = event;
    console.log('event', event);
  }


  addCashPetty(date:any){

    let cashPetty:any ={
      types : this.accountTypeValue,
      adjustmentType : 'Voucher',
      serialNumber : this.addCashPettyForm.controls['serialNumber'].value,
      paymentDate : this.transformDate(date),
      accountCode : this.allAccounts[this.account_index].accountCode,
      accountInfo : this.allAccounts[this.account_index].accountInfo,
      accountId : this.allAccounts[this.account_index]?.id,
      paidToId : this.otherAccountData[this.paidTo_index]?.id,
      paidToCode : this.otherAccountData[this.paidTo_index]?.accountCode,
      paidToInfo :this.otherAccountData[this.paidTo_index].accountInfo,
      paymentDescription : this.addCashPettyForm.controls['description'].value,
      grossAmount : this.addCashPettyForm.controls['balance'].value,
    }
    this._bankService.addJournalVoucherPayment(cashPetty).then((data:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
  }

  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }
}
