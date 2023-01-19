import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
export interface form {
  id: string;
  formGroup: FormGroup;
  metaData: any;
}
@Component({
  selector: 'app-add-new-bill',
  templateUrl: './add-new-bill.component.html',
  styleUrls: ['./add-new-bill.component.css'],
})
export class AddNewBillComponent implements OnInit {
  addNewBillForm: FormBuilder | any;
  fg: FormGroup | any;
  allFinishedData: any;
  allRawData: any;
  forms: form[] = [];
  finished_index : number = 0;
  raw_index : number = 0;
  isFinishedCode : boolean = false;
  isRawCode : boolean = false;
  @Output() output: EventEmitter<FormGroup> = new EventEmitter();
  tempArr: any = [];
  public item_id: any;
  public productName: any;
  public productType: any;

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
      Validation: {
        required: true,
        minLength: 3,
        maxLength: 30,
      },
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

  };
  constructor(
    private _productService: ProductService,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    public route : Router,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm(){
    this.addNewBillForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      estimatedLabourCost: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10000000),
        ],
      ],
      estimatedFactoryOver: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10000000),
        ],
      ],
      unit: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
 
      quantity: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000000),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this._productService.getAllFinishedProducts().subscribe((res: any) => {
      this.allFinishedData = res.payload;
      console.log("this.allFinished",this.allFinishedData)
    });

    this._productService.getAllRawProducts().subscribe((res: any) => {
      this.allRawData = res.payload;
      console.log("this.allFinished",this.allRawData)
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


  
  deleteForm(index:any){
    console.log('Index is',index)
    this.forms.splice(index,1);
    console.log(this.forms,"forms")
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

  loadFinishedGoods(index:any){
    this.finished_index = index;
    this.isFinishedCode = true;
  }

  loadRawGoods(index:any, value: any){
    this.raw_index = index;
    this.isRawCode = true;
    this.tempArr[index] = value;
    this.item_id = this.allRawData[index].id
    this.productName = this.allRawData[index].productName;
    this.productType = this.allRawData[index].productType;

  }

  onSubmit(form: any) {
    console.log('on submit form', form);

  }

  addBillOfMaterial(){
    let temp = [];
    console.log('tempArr', this.tempArr);

    console.log('Helloe');
    for (let i = 0; i < this.forms.length; i++) {
      console.log(this.forms[i].formGroup.value);
      console.log(this.forms[i].formGroup.getRawValue());
      console.log(this.allRawData[i].itemCode,"HEHEHEHEH")
      temp.push({
            productName: this.allRawData[i].productName,
            productItemCode: this.allRawData[i].itemCode,
            productId: this.allRawData[i].id,
            unit: this.forms[i].formGroup.value.unit,
            quantity: this.forms[i].formGroup.value.quantity,
            rate: this.forms[i].formGroup.value.rate
      });
    }

    let billObject = {
      serialNumber: this.addNewBillForm.controls['serialNumber'].value,
      productName: this.allFinishedData[this.finished_index].productName,
      productItemCode: this.allFinishedData[this.finished_index].itemCode,
      productId: this.allFinishedData[this.finished_index].id,
      unit: this.addNewBillForm.controls['unit'].value,
      quantity: this.addNewBillForm.controls['quantity'].value,
      labourCost : this.addNewBillForm.controls['estimatedLabourCost'].value,
      factoryOverhead : this.addNewBillForm.controls['estimatedFactoryOver'].value,
      product: temp,
    };
    console.log(billObject);
    this._productService
      .addBillOfMaterial(billObject)
      .then((data: any) => {
        window.location.reload();
      },
      (err: any) => {
      })
  }

  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }

  routeToBill(){
    this.route.navigate(['inventory-dashboard/bill-of-material'])
  }
}
