import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { BankPaymentService } from '../bank-payment.service';
import { PurchasesService } from '../purchases.service';
export interface form {
  id: string;
  formGroup: FormGroup;
  metaData: any;
}
@Component({
  selector: 'app-add-purchase-return',
  templateUrl: './add-purchase-return.component.html',
  styleUrls: ['./add-purchase-return.component.css'],
})
export class AddPurchaseReturnComponent implements OnInit {
  addPurchaseReturnsForm: FormBuilder | any;
  public getPurchaseOrders: any;
  public itemCodes: any;
  public vendorCodes: any;
  public allAccounts: any;
  public isProductCodeLoaded: boolean = false;
  public isItemCodeLoaded: boolean = false;
  public isAccountLoaded: boolean = false;
  public isPurchaseLoaded: boolean = false;
  public isPurchaseSalesLoaded: boolean = false;
  public product_index: number = 0;
  public item_index: number = 0;
  public account_index: number = 0;
  public purchase_index: number = 0;
  public purchaseSales_index: number = 0;

  allPurchaseSalesData: any;
  tempArr: any = [];
  fg: FormGroup | any;

  json: any = {
    itemCode: {
      label: 'Item Code',
      type: 'select',
    },
    quantity: {
      label: 'Quantity',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    unit: {
      label: 'Unit',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
  };
  public item_id: any;
  public productName: any;
  public productType: any;
  itemCodesById: any;
  forms: form[] = [];
  @Output() output: EventEmitter<FormGroup> = new EventEmitter();

  constructor(
    private _purchaseService: PurchasesService,
    private _employeesService: EmployeeService,
    private fb: FormBuilder,
    private bankService: BankPaymentService,
    private dataPipe: DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.addPurchaseReturnsForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      orderDate:['',[Validators.required]],
      vendorInvoiceNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      debitNotes: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      termsOfPayment: [
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
    this._purchaseService.getPurchaseOrders().subscribe((response: any) => {
      console.log('get purchase orders', response);
      this.getPurchaseOrders = response.payload;
    });

    this._employeesService
      .getAllVendorAccounts()
      .subscribe((response: any) => {
        console.log('get all list of account', response);
        this.allAccounts = response.payload;
      });

    this._purchaseService.getAllProductsCode().subscribe((data: any) => {
      console.log('get all item codes', data);
      this.itemCodes = data.payload;
    });

    this._purchaseService.getAllVendorCodes().subscribe((data: any) => {
      console.log('get all vendor codes', data);
      this.vendorCodes = data.payload;
    });

    this.bankService.getPurchaseSales().subscribe((data: any) => {
      console.log('data get purchase sales', data);
      this.allPurchaseSalesData = data.payload;
    });
  }

  createForm() {
    if (this.json == null) return;
    let dataObject = this.json;
    let objectProps = Object.keys(dataObject).map((prop) => {
      return Object.assign({}, { key: prop }, dataObject[prop]);
    });
    console.log('objectProps', objectProps);
    const formGroup: any = {};
    for (let prop of Object.keys(dataObject)) {
      formGroup[prop] = new FormControl(
        dataObject[prop].value || '',
        this.mapValidators(dataObject[prop].validation)
      );
    }
    console.log('formGroup', formGroup);

    this.fg = new FormGroup(formGroup);
    const form: form = {
      id: new Date().getUTCMilliseconds().toString(),
      formGroup: this.fg,
      metaData: objectProps,
    };
    console.log('FORM', form);
    this.fg.valueChanges.subscribe((values: any) => {
      this.output.emit(values);
    });
    console.log('this.forms', this.fg);
    this.forms.push(form);
    console.log('thissasdaaaaaaaaaaa', this.forms);
    return form;
  }

  private mapValidators(validators: any) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'minLength') {
          formValidators.push(Validators.minLength(validators[validation]));
        } else if (validation === 'maxLength') {
          formValidators.push(Validators.maxLength(validators[validation]));
        }
      }
    }

    return formValidators;
  }

  // public hasValidator(controlName: string, validator: string): boolean {
  //   let control: AbstractControl = this.addPurchaseForm.controls[controlName];
  //   switch (validator) {
  //     case 'required':
  //       control.setValue('');  // as is appropriate for the control
  //     case 'pattern':
  //       control.setValue('3'); // given you have knowledge of what the pattern is - say its '\d\d\d'
  //   }
  //   if (control.validator != null && control.validator(control) != null) {
  //     let hasValidator: boolean = !!control.validator(control).hasOwnProperty(validator);
  //     return hasValidator;
  //   }
  //   return false;
  // }

  update($event: any) {
    this.json = JSON.parse($event.target.value);
  }

  onSubmit(form: any) {
    console.log('on submit form', form);
  }

  addPurchaseReturn(returnDate:any) {
    let temp = [];
    console.log('tempArr', this.tempArr);

    console.log('Helloe');
    for (let i = 0; i < this.forms.length; i++) {
      console.log(this.forms[i].formGroup.value);
      console.log(this.forms[i].formGroup.getRawValue());
      temp.push({
        quantity: this.forms[i].formGroup.value.quantity,
        unit: this.forms[i].formGroup.value.unit,
        productName: this.productName,
        productItemCode: this.tempArr[i],
        productId: this.item_id,
      });
    }

    let purchaseSalesObj = {
      serialNumber: this.addPurchaseReturnsForm.controls['serialNumber'].value,
      types: 'Purchases',
      debitNotes: this.addPurchaseReturnsForm.controls['debitNotes'].value,
      returnDate: this.transformDate(
        returnDate
      ),
      orderDate: this.transformDate(
        this.allPurchaseSalesData[this.purchaseSales_index].orderDate
      ),
      paymentTerms:
        this.addPurchaseReturnsForm.controls['termsOfPayment'].value,
      orderSerialNumber:
        this.allPurchaseSalesData[this.purchaseSales_index].orderSerialNumber,
      orderId: this.allPurchaseSalesData[this.purchaseSales_index].orderId,
      invoice: this.allPurchaseSalesData[this.purchaseSales_index].invoice,
      invoiceDate: this.transformDate(
        this.allPurchaseSalesData[this.purchaseSales_index].invoiceDate
      ),
      saleId: this.allPurchaseSalesData[this.purchaseSales_index].id,
      accountCode: this.allAccounts[this.account_index].accountCode,
      accountType: this.allAccounts[this.account_index].accountType,
      accountId: this.allAccounts[this.account_index].id,
      returns: temp,
      // orderDate :
    };
    console.log("this.pruc",purchaseSalesObj);
    this._purchaseService
      .AddPurchaseReturn(purchaseSalesObj)
      .then((res: any) => {
      window.location.reload();
    },
    (err: any) => {
    })
  }

  // loadPurchase(index: number) {
  //   this.purchase_index = index;
  //   this.isPurchaseLoaded = true;

  // }

  loadProduct(index: number) {
    this.product_index = index;
    this.isProductCodeLoaded = true;
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountLoaded = true;
  }
  loadPurchaseSales(index: number) {
    this.purchaseSales_index = index;
    this.isPurchaseSalesLoaded = true;
    this._purchaseService
      .getAllOrdersByItemCodes(this.allPurchaseSalesData[this.purchaseSales_index].orderId)
      .subscribe((res: any) => {
        this.itemCodesById = res.payload;
        console.log('itemCodes', this.itemCodesById);
      });
  }

  loadItem(index: number, value: any) {
    this.tempArr[index] = value;
    this.item_index = index;
    this.isItemCodeLoaded = true;

    this.tempArr[index] = value;
    console.log('tempArr', this.itemCodesById[index]);
    this.item_id = this.itemCodesById[index].productId;
    this.productName = this.itemCodesById[index].productName;
    this.productType = this.itemCodesById[index].productType;
  }

  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
