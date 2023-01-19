import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent implements OnInit {
  vendorForm: FormGroup | any;
  allAccounts: any;
  account_index: number = 0;
  isAccountLoaded: boolean = false;

  constructor(
    private _purchaseService: PurchasesService,
    private fb: FormBuilder,
    private _employeesService: EmployeeService,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.vendorForm = this.fb.group({
      vendorCode: [
        '',
        [Validators.required, Validators.min(3), Validators.max(30)],
      ],
      vendorName: [
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
      email: ['', [Validators.required]],
      vendorAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      vendorSt: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000000),
        ],
      ],
      // ntn: ['', [Validators.required, Validators.pattern('^[0-9]{7}-[0-9]$')]],
      ntn: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      cnic: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{7}-[0-9]$')],
      ],
      creditTerms: [
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
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this._employeesService
      .getAllListOfVendorAccounts()
      .subscribe((response: any) => {
        console.log('get all list of account', response);
        this.allAccounts = response.payload;
      });
  }
  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountLoaded = true;
  }
  addVendor(
  ) {
    let vendorObject = {
      vendorCode: this.vendorForm.controls['vendorCode'].value,
      vendorName: this.vendorForm.controls['vendorName'].value,
      accountName: this.allAccounts[this.account_index]?.accountType,
      accountNumber: this.allAccounts[this.account_index]?.accountInfo,
      contactPerson: this.vendorForm.controls['contactPerson'].value,
      mobileNumber: this.vendorForm.controls['mobile'].value,
      email: this.vendorForm.controls['email'].value,
      vendorAddress: this.vendorForm.controls['vendorAddress'].value,
      stRegistrationNumber: this.vendorForm.controls['vendorSt'].value,
      cnic: this.vendorForm.controls['cnic'].value,
      ntn: this.vendorForm.controls['ntn'].value,
      creditTerms: this.vendorForm.controls['creditTerms'].value,
      accountId : this.allAccounts[this.account_index]?.id,
      balance : this.vendorForm.controls['balance'].value,
    };

    this._purchaseService.addVendor(vendorObject).then((result: any) => {
      window.location.reload();
    },
    (err: any) => {
    })
  }
}
