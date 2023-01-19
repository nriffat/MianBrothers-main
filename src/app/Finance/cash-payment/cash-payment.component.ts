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
import { EditCashComponent } from './edit-cash/edit-cash.component';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.css'],
})
export class CashPaymentComponent implements OnInit {
  public cashPaymentTable: any;
  isCashLoaded : boolean = false;
  cash_index : number = 0;
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
    public dialog: MatDialog,
    public _purchaseService:PurchasesService,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this._bankService.getCashPaymentTable().subscribe((response: any) => {
      console.log('Cash Table', response);
      this.cashPaymentTable = response.payload;
      this.dataSource = new MatTableDataSource(this.cashPaymentTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  loadCashPayment(index:number){
    this.cash_index = index;
    this.isCashLoaded = true;
    let obj = new Array(this.cashPaymentTable[this.cash_index]);
    this.dataSource = obj;
    console.log('HEHEH', this.dataSource);
    this.disablePrint = true;
  }
  onEdit(index: any) {
    this.dialog.open(EditCashComponent, {
      data: {
        userData: this.cashPaymentTable[index],
      },
    });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService.deleteBankPayment(this.cashPaymentTable[index].id).then((res:any)=>{
        window.location.reload();
      },
      (err: any) => {
      })
    }
    else {
      alert('You pressed cancel');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
      pdf.save('cash-payment.pdf');
      window.location.reload();
    });
  }
}
