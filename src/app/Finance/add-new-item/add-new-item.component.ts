import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css'],
})
export class AddNewItemComponent implements OnInit {
  itemType: any;
  itemForm: FormGroup | any;

  constructor(
    private _productService: ProductService,
    private fb: FormBuilder,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.itemForm = this.fb.group({
      itemName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      itemCode: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10000000)],
      ],
    });
  }
  ngOnInit(): void {}

  changeValue(event: any) {
    this.itemType = event;
  }

  addNewItem(itemName: any, itemCode: any) {
    let newItem = {
      itemCode: this.itemForm.controls['itemCode'].value,
      productName: this.itemForm.controls['itemName'].value,
      productType: this.itemType,
    };

    this._productService.addNewItem(newItem).then((response: any) => {
      console.log('response', response);
      window.location.reload();
    },
    (err: any) => {
    });
  }
}
