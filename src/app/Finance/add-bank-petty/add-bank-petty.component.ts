import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { BankPaymentService } from '../bank-payment.service';

@Component({
  selector: 'app-add-bank-petty',
  templateUrl: './add-bank-petty.component.html',
  styleUrls: ['./add-bank-petty.component.css'],
})
export class AddBankPettyComponent implements OnInit {
  allAccounts: any;
  allPurchaseSales: any;
  public account_index: number = 0;
  public purchaseSales_index: number = 0;
  public paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  addBankPettyForm: FormBuilder | any;
  accountOfOtherType:any;
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
    this.addBankPettyForm = this.fb.group({
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

      totalAmountDebited: [
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
    });
  }
  ngOnInit(): void {
    this._accountService.getUserBankAccounts().subscribe((res:any)=>{
      this.allAccounts = res.payload;
      console.log("this.allAccounts:",this.allAccounts)
    })
    this._accountService.getAccountOfOtherType().subscribe((res:any)=>{
      this.accountOfOtherType = res.payload;
      console.log("this.accountOfOtherType:",this.accountOfOtherType)
    })
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

  addBankPetty(chequeDate : any, date: any){
    let bankPettyObject:any ={
      types : 'Purchases',
      paymentType : 'Bank',
      isPetty : 1,
      serialNumber : this.addBankPettyForm.controls['serialNumber'].value,
      paymentDate : this.transformDate(date),
      accountId : this.allAccounts[this.account_index]?.id,
      accountCode : this.allAccounts[this.account_index].accountCode,
      accountInfo : this.allAccounts[this.account_index].accountInfo,
      paidToId : this.accountOfOtherType[this.paidTo_index]?.id,
      paidToCode : this.accountOfOtherType[this.paidTo_index]?.accountCode,
      paidToInfo :this.accountOfOtherType[this.paidTo_index].accountInfo,
      paymentDescription : this.addBankPettyForm.controls['description'].value,
      chequeNumber : this.addBankPettyForm.controls['chequeNo'].value,
      chequeDate : this.transformDate(chequeDate),
      totalAmountDebited : this.addBankPettyForm.controls['totalAmountDebited'].value,
    }

    this._bankService.addBankPettyPayment(bankPettyObject).then((data:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
  }

  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }
}
