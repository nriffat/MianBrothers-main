import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { EmployeeService } from 'src/app/Employee/employee.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  public allAccounts: any;
  public isAccountLoaded: boolean = false;
  public account_index: number = 0;
  addCustomerForm: FormBuilder | any;
  constructor(
    private _employeesService: EmployeeService,
    private _accountService: AccountsService,
    private fb: FormBuilder,
    private _snackbar:MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addCustomerForm = this.fb.group({
      customerCode: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      customerName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      orderLimit: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10000000),
        ],
      ],
      balance: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10000000),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      contactPerson: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{7}$')],
      ],
      stNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      ntn: ['', [Validators.required, Validators.pattern('^[0-9]{7}-[0-9]$')]],
      cnic: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{7}-[0-9]$')],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      region: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      accountManager: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      creditLimit: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10000000),
        ],
      ],
      creditTerms: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this._employeesService
      .getAllListOfCustomersAccounts()
      .subscribe((response: any) => {
        console.log('get all list of account', response);
        this.allAccounts = response.payload;
      });
  }
  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountLoaded = true;
  }

  saveCustomer() {
    let saveCustomerObj = {
      customerName: this.addCustomerForm.controls['customerName'].value,
      customerCode: this.addCustomerForm.controls['customerCode'].value,
      orderLimit: this.addCustomerForm.controls['orderLimit'].value,
      creditLimit: this.addCustomerForm.controls['creditLimit'].value,
      creditTerms: this.addCustomerForm.controls['creditTerms'].value,
      contactPerson: this.addCustomerForm.controls['contactPerson'].value,
      mobileNumber: this.addCustomerForm.controls['mobile'].value,
      email: this.addCustomerForm.controls['email'].value,
      customerAddress: this.addCustomerForm.controls['address'].value,
      region: this.addCustomerForm.controls['region'].value,
      accountManager: this.addCustomerForm.controls['accountManager'].value,
      stRegistrationNumber: this.addCustomerForm.controls['stNumber'].value,
      cnic: this.addCustomerForm.controls['cnic'].value,
      ntn: this.addCustomerForm.controls['ntn'].value,
      balance: this.addCustomerForm.controls['balance'].value,
      accountId: this.allAccounts[this.account_index].id,
      accountCode: this.allAccounts[this.account_index].accountCode,
      accountInfo: this.allAccounts[this.account_index].accountInfo,
    };
    // console.log('customer added successfully', saveCustomerObj);

    this._accountService.addCustomer(saveCustomerObj).then((data: any) => {
      window.location.reload();
    },
    (err: any) => {
    })
  }
}
