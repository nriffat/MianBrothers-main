import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { BankPaymentService } from '../bank-payment.service';

@Component({
  selector: 'app-add-cash-petty',
  templateUrl: './add-cash-petty.component.html',
  styleUrls: ['./add-cash-petty.component.css'],
})
export class AddCashPettyComponent implements OnInit {
  allAccounts: any;
  allPurchaseSales: any;
  public account_index: number = 0;
  public purchaseSales_index: number = 0;
  public paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  addCashPettyForm: FormBuilder | any;
  accountOfOtherType : any;
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
      invoiceDate:['',[Validators.required]],

      balance: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000000),
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
    this._accountService.getUserCashAccounts().subscribe((res:any)=>{
      this.allAccounts = res.payload;
      console.log("this.allAccounts:",this.allAccounts)
    })
    this._accountService.getAccountOfOtherType().subscribe((res:any)=>{
      this.accountOfOtherType = res.payload;
      console.log("this.accountOfOtherType:",this.accountOfOtherType)
    })
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
  }

  loadPaidTo(index: number) {
    this.paidTo_index = index;
    this.isPaidToLoaded = true;
  }

  addCashPetty(date:any){

    let cashPetty:any ={
      types : 'Purchases',
      paymentType : 'Cash',
      isPetty : 1,
      serialNumber : this.addCashPettyForm.controls['serialNumber'].value,
      paymentDate : this.transformDate(date),
      accountId : this.allAccounts[this.account_index]?.id,
      accountCode : this.allAccounts[this.account_index].accountCode,
      accountInfo : this.allAccounts[this.account_index].accountInfo,
      paidToId : this.accountOfOtherType[this.paidTo_index]?.id,
      paidToCode : this.accountOfOtherType[this.paidTo_index]?.accountCode,
      paidToInfo :this.accountOfOtherType[this.paidTo_index].accountInfo,
      paymentDescription : this.addCashPettyForm.controls['description'].value,
      totalAmountDebited : this.addCashPettyForm.controls['balance'].value,
    }
    this._bankService.addCashPettyPayment(cashPetty).then((data:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
  }

  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }
}
