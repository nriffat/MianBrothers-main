import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BankPaymentService } from '../../bank-payment.service';
import { EditCashPettyComponent } from '../../cash-petty/edit-cash-petty/edit-cash-petty.component';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-cash-receipt-petty-customer',
  templateUrl: './cash-receipt-petty-customer.component.html',
  styleUrls: ['./cash-receipt-petty-customer.component.css'],
})
export class CashReceiptPettyCustomerComponent implements OnInit {
  account_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  public cashReceiptPettyPaymentTable: any;
  disablePrint: boolean = false;
  displayedColumns: string[] = [
    'accountCode',
    'accountInfo',
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
    private _purchaseService: PurchasesService,
    private _snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this._bankService.getCashPettyTableSales().subscribe((response: any) => {
      console.log('Cash Table', response);
      this.cashReceiptPettyPaymentTable = response.payload;
      this.dataSource = new MatTableDataSource(
        this.cashReceiptPettyPaymentTable
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  loadCashAccount(index: any) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
    let obj = new Array(this.cashReceiptPettyPaymentTable[this.account_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }
  onEdit(index: any) {
    this.dialog.open(EditCashPettyComponent, {
      data: {
        userData: this.cashReceiptPettyPaymentTable[index],
      },
    });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService
      .deleteBankPayment(this.cashReceiptPettyPaymentTable[index].id)
      .then((res: any) => {
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
    let pdf = new jsPDF('p', 'mm', 'a4');

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
