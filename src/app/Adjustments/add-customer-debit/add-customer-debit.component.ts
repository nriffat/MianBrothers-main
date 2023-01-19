import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer-debit',
  templateUrl: './add-customer-debit.component.html',
  styleUrls: ['./add-customer-debit.component.css']
})
export class AddCustomerDebitComponent implements OnInit {
  addCustomerDebitForm : FormBuilder | any;
  constructor(
    private fb:FormBuilder
  ) {
    this.myForm();
  }
  myForm() {
    this.addCustomerDebitForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      accountNo: [
        '',

      ],
      chequeNo: [
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
      accountName: [
        '',

      ],
      whtRate: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      whtAmount: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      gstRate: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      grossAmount: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      gstAmount: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      advanceAdjusted: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      disc: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
      chequePaid: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],

    });
  }
  ngOnInit(): void {
  }

  addCustomerDebit(date:any){}
}
