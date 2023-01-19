import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { BankPaymentService } from '../bank-payment.service';
import { PurchasesService } from '../purchases.service';
import { EditBankComponent } from './edit-bank/edit-bank.component';

@Component({
  selector: 'app-bank-payment',
  templateUrl: './bank-payment.component.html',
  styleUrls: ['./bank-payment.component.css'],
})
export class BankPaymentComponent implements OnInit {
  public bankPaymentTable: any;
  bank_index : number = 0;
  isBankLoaded : boolean = false;
  disablePrint : boolean = false;
  displayedColumns: string[] = [
    'invoice',
    'totalAmountDebited',
    'GSTAmount',
    'GSTRate',
    'WHTAmount',
    'WHTRate',
    'advancedAdjustment',
    'discountReceived',
    'amountPaid',
    'delete',
    'edit',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(
    private _bankService: BankPaymentService,
    private _purchaseService: PurchasesService,
    public dialog: MatDialog,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this._bankService.getBankPaymentTable().subscribe((response: any) => {
      console.log('Bank Payment Table', response);
      this.bankPaymentTable = response.payload;
      this.dataSource = new MatTableDataSource(this.bankPaymentTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadBankPayment(index:number){
    this.bank_index = index;
    this.isBankLoaded = true;
    let obj = new Array(this.bankPaymentTable[this.bank_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }
  onEdit(index: any) {
    this.dialog.open(EditBankComponent, {
      data: {
        userData: this.bankPaymentTable[index],
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService.deleteBankPayment(this.bankPaymentTable[index].id).then((res:any)=>{
        window.location.reload();
      },
      (err: any) => {
      })
    }
    else {
      alert('You pressed cancel');
    }
  }
  printReceipt(id: any) {

    let data: any = document.getElementById(id) as HTMLElement;
    let pdf = new jspdf('p', 'mm', 'a4');

    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png;base64'); // 'image/jpeg' for lower quality output.
      // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      document.body.appendChild(canvas);
      const imgProps = pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('bank-payment.pdf');
      window.location.reload();
    });
  }
}
