import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-edit-journal',
  templateUrl: './edit-journal.component.html',
  styleUrls: ['./edit-journal.component.css']
})
export class EditJournalComponent implements OnInit {
  editJournal: FormBuilder | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _purchaseService: PurchasesService,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.editJournal = this.fb.group({
      paymentDate: ['',[Validators.required]],
      grossAmount : ['',[Validators.required,Validators.min(1),Validators.max(100000)]]
    });
  }
  ngOnInit(): void {
    console.log("This data",this.data)
    this.editJournal.controls.paymentDate.setValue(this.data.userData.paymentDate);
    this.editJournal.controls.grossAmount.setValue(
      this.data.userData.grossAmount
    );
  }

  onEditJournal() {
    let editObj = {
      paymentDate: this.transformDate(this.editJournal.controls.paymentDate.value),
      grossAmount: this.editJournal.controls.grossAmount.value,
    };

    this._purchaseService
      .editJournalVoucher(editObj,this.data.userData.id)
      .then((res: any) => {
        console.log("rrrrrrrrrrrrrrrrrr",res)
      window.location.reload();
    },
    (err: any) => {
    })
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }

}
