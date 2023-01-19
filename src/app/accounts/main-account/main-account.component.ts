import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-main-account',
  templateUrl: './main-account.component.html',
  styleUrls: ['./main-account.component.css']
})
export class MainAccountComponent implements OnInit {
  mainAccountForm : FormGroup | any;
  constructor(public _accountService: AccountsService,
    private fb: FormBuilder,
    private _snackbar : MatSnackBar
    ) {
    this.myForm();
  }

  myForm(){
    this.mainAccountForm = this.fb.group({
      accountCode : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      accountType : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    })
  }
  ngOnInit(): void {
  }

  addNewMainAccount(accountCode:any,accountType:any) {
    let mainAccountObject = {
      accountCode : accountCode,
      accountType : accountType
    }

    this._accountService.addMainAccount(mainAccountObject).then((result)=>{
      console.log("result",result);
      window.location.reload();
    })
  }
}
