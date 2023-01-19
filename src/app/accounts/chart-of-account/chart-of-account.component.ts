import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css'],
})
export class ChartOfAccountComponent implements OnInit {
  public mainAccounts: any;
  public subAccounts: any;
  public listAccounts: any;
  public isMainAccountLoaded: boolean = false;
  public isSubAccountLoaded: boolean = false;
  public isListAccountLoaded: boolean = false;
  public mainAccount_index: number = 0;
  public subAccount_index: number = 0;
  public listAccount_index: number = 0;
  obj:any;
  constructor(
    private _accountService: AccountsService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this._accountService.getMainAccount().subscribe((data: any) => {
      this.mainAccounts = data.payload;
      console.log('mainaccounts', this.mainAccounts);
    });

    // this._accountService.getSubAccount().subscribe((data:any)=>{
    //   this.subAccounts = data;
    // })
  }

  loadMainData(index: any) {
    this.isListAccountLoaded = false;

    this.mainAccount_index = index;
    console.log('mainAccount_index', this.mainAccount_index);
    this.isMainAccountLoaded = true;

    this.obj = document.getElementById("dropList") ;
    this.obj.value = '';

     this.obj = document.getElementById("subList") ;
    this.obj.value = '';

    this._accountService
      .getSubBySearchId(this.mainAccounts[this.mainAccount_index].id)
      .subscribe((data: any) => {
        this.subAccounts = data.payload;
        console.log('sub account', this.subAccounts);
      });
      this.isSubAccountLoaded = false;
      this.isListAccountLoaded = false;


  }

  loadSubData(index: any) {
    this.subAccount_index = index;
    this.isSubAccountLoaded = true;

    this.obj = document.getElementById("dropList") ;
    this.obj.value = '';

    this._accountService
      .getListBySearchId(this.subAccounts[this.subAccount_index].id)
      .subscribe((data: any) => {
        this.listAccounts = data.payload;
        console.log('listAccounts', this.listAccounts);
      });
      this.isListAccountLoaded = false;
  }

  loadListData(index: any) {
    this.listAccount_index = index;
    this.isListAccountLoaded = true;
  }
}
