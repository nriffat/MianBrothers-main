import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  public listAccounts : any
  public account_index : number = 0;
  public isSubAccountLoaded: boolean = false
  listAccountForm: FormGroup | any;

  constructor(private _accountService: AccountsService,public fb:FormBuilder,private _snackbar:MatSnackBar) {
    this.myForm();
   }
  myForm(){
    this.listAccountForm = this.fb.group({
      listAccountCode : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      listAccountType : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      listAccountInfo : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    });
  }
  ngOnInit(): void {
    this._accountService.getSubAccount().subscribe((data:any)=>{
      this.listAccounts = data.payload;
    })
  }
  addNewListAccount(listAccountCode:any,listAccountType:any,listAccountInfo:any){
    let listAccountObject = {
      accountCode : listAccountCode,
      accountType: listAccountType,
      accountInfo : listAccountInfo,
      subAccountId : this.listAccounts[this.account_index].id
    }
    console.log("sub account object",listAccountObject)

    this._accountService.addListAccount(listAccountObject).then((data:any)=>{
      console.log("data added successfully",data);

      window.location.reload();
    })
  }

  loadSubAccount(index:any) {
    this.account_index = index;
    this.isSubAccountLoaded = true;
  }

}
