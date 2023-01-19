import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { PurchasesService } from '../../purchases.service';
export interface form {
  id: string;
  formGroup: FormGroup;
  metaData: any;
}
@Component({
  selector: 'app-add-sales-order',
  templateUrl: './add-sales-order.component.html',
  styleUrls: ['./add-sales-order.component.css'],
})
export class AddSalesOrderComponent implements OnInit {
  allCustomers: any;
  public isCustomerCodeLoaded: boolean = false;
  public customer_index: number = 0;
  public item_index: number = 0;
  public itemCodes: any;
  public isItemCodeLoaded: boolean = false;
  addSalesOrderForm: FormBuilder | any;
  tempArr: any = [];
  fg: FormGroup | any;
  productName: any;
  productType: any;
  item_id: any;
  json: any = {
    itemCode: {
      label: 'Item Code',
      type: 'select',
    },
    rate: {
      label: 'Rate',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    furtherTaxRate: {
      label: 'Further Tax Rate',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    valueExcl: {
      label: 'Value Excl.',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
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
    salesTaxRate: {
      label: 'Sales Tax Rate',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    valueIncl: {
      label: 'Value Incl.',
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
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
  };

  forms: form[] = [];
  disableForm: boolean = false;

  @Output() output: EventEmitter<FormGroup> = new EventEmitter();
  constructor(
    private _accountService: AccountsService,
    private _purchaseService: PurchasesService,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addSalesOrderForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      customerReferenceNumber: [
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
      purchaseDate: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      buyDate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this._accountService.getCustomerCode().subscribe((customers: any) => {
      this.allCustomers = customers.payload;
    });

    this._purchaseService.getAllProductsCode().subscribe((data: any) => {
      console.log('get all item codes', data);
      this.itemCodes = data.payload;
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

  deleteForm(index:any){
    console.log('Index is',index)
    this.forms.splice(index,1);
    console.log(this.forms,"forms")
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

  //** *Add Purchase Order */
  addSalesOrder(date: any, deliveryDate: any, buyDate: any) {
    let temp = [];
    console.log('tempArr', this.tempArr);

    console.log('Helloe');
    for (let i = 0; i < this.forms.length; i++) {
      console.log(this.forms[i].formGroup.value);
      console.log(this.forms[i].formGroup.getRawValue());
      temp.push({
        rate: this.forms[i].formGroup.value.rate,
        furtherTaxRate: this.forms[i].formGroup.value.furtherTaxRate,
        quantity: this.forms[i].formGroup.value.quantity,
        salesTaxRate: this.forms[i].formGroup.value.salesTaxRate,
        unit: this.forms[i].formGroup.value.unit,
        productItemCode: this.tempArr[i],
        productName: this.productName,
        productType: this.productType,
        productId: this.item_id,
      });
    }

    this.addSalesOrderForm = {
      types: 'Sales',
      serialNumber: this.addSalesOrderForm.controls['serialNumber'].value,
      purchaseDate: this.transformDate(date),
      paymentTerms: this.addSalesOrderForm.controls['termsOfPayment'].value,
      deliveryDate: this.transformDate(deliveryDate),
      buyingDate: this.transformDate(buyDate),
      customerId: this.allCustomers[this.customer_index].id,
      customerOrderReference:
        this.addSalesOrderForm.controls['customerReferenceNumber'].value,
      customerCode: this.allCustomers[this.customer_index].customerCode,
      product: temp,
    };
    console.log(this.addSalesOrderForm);
    this._purchaseService.AddPurchaseSalesOrder(this.addSalesOrderForm).then(
      (data: any) => {
        console.log('purchase order added successfully', data);
        window.location.reload();
      },
      (err: any) => {
      }
    );
  }

  loadCustomers(index: any) {
    this.customer_index = index;
    this.isCustomerCodeLoaded = true;
    this.disableForm = true;
  }

  loadItem(index: number, value: any) {
    this.tempArr[index] = value;
    this.item_index = index;
    this.isItemCodeLoaded = true;
    this.item_id = this.itemCodes[index].id;
    this.productName = this.itemCodes[index].productName;
    this.productType = this.itemCodes[index].productType;
  }

  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
