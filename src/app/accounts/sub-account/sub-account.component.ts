import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-sub-account',
  templateUrl: './sub-account.component.html',
  styleUrls: ['./sub-account.component.css'],
})
export class SubAccountComponent implements OnInit {
  public mainAccounts: any;
  public account_index: number = 0;
  public isMainAccountLoaded: boolean = false;
  subAccountForm: FormGroup | any;

  constructor(
    private _accountService: AccountsService,
    private fb: FormBuilder,
    private _snackbar:MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.subAccountForm = this.fb.group({
      subAccountCode: [
        '',
       [ Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),]
      ],
      subAccountType: [
        '',
       [ Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),]
      ],
    });
  }

  ngOnInit(): void {
    this._accountService.getMainAccount().subscribe((data: any) => {
      this.mainAccounts = data.payload;
    });
  }
  addNewSubAccount(subAccountCode: any, subAccountType: any) {
    let subAccountObject = {
      accountCode: subAccountCode,
      accountType: subAccountType,
      accountId: this.mainAccounts[this.account_index].id,
    };
    console.log('sub account object', subAccountObject);

    this._accountService.addSubAccount(subAccountObject).then((data: any) => {
      console.log('data added successfully', data);
      window.location.reload();
    },
    (err: any) => {
    });
  }

  loadMainAccount(index: any) {
    this.account_index = index;
    this.isMainAccountLoaded = true;
  }
}
