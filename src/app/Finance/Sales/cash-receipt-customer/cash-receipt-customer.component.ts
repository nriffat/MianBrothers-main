import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { BankPaymentService } from '../../bank-payment.service';
import { EditCashComponent } from '../../cash-payment/edit-cash/edit-cash.component';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-cash-receipt-customer',
  templateUrl: './cash-receipt-customer.component.html',
  styleUrls: ['./cash-receipt-customer.component.css'],
})
export class CashReceiptCustomerComponent implements OnInit {
  account_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  public cashReceiptPaymentTable: any;
  disablePrint: boolean = false;
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
    private _purchaseService: PurchasesService,
    private _snackbar :MatSnackBar
  ) {}

  ngOnInit(): void {
    this._bankService.getCashPaymentTableSales().subscribe((response: any) => {
      console.log('Cash Table', response);
      this.cashReceiptPaymentTable = response.payload;
      this.dataSource = new MatTableDataSource(this.cashReceiptPaymentTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadCashAccount(index: any) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
    let obj = new Array(this.cashReceiptPaymentTable[this.account_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }
  onEdit(index: any) {
    this.dialog.open(EditCashComponent, {
      data: {
        userData: this.cashReceiptPaymentTable[index],
      },
    });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService
      .deleteBankPayment(this.cashReceiptPaymentTable[index].id)
      .then(
        (res: any) => {
          window.location.reload();
        },
        (err: any) => {
        }
      );
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
