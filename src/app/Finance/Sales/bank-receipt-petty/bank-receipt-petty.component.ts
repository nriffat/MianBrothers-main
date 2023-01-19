import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { BankPaymentService } from '../../bank-payment.service';
import { EditBankComponent } from '../../bank-payment/edit-bank/edit-bank.component';
import { EditBankPettyComponent } from '../../bank-petty/edit-bank-petty/edit-bank-petty.component';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-bank-receipt-petty',
  templateUrl: './bank-receipt-petty.component.html',
  styleUrls: ['./bank-receipt-petty.component.css'],
})
export class BankReceiptPettyComponent implements OnInit {
  account_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  public bankReceiptPettyPaymentTable: any;
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
    private _snackbar :MatSnackBar
  ) {}

  ngOnInit(): void {
    this._bankService.getBankPettyTableSales().subscribe((response: any) => {
      console.log('Bank Payment Table', response);
      this.bankReceiptPettyPaymentTable = response.payload;
      this.dataSource = new MatTableDataSource(
        this.bankReceiptPettyPaymentTable
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  loadBankReceipt(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
    let obj = new Array(this.bankReceiptPettyPaymentTable[this.account_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }
  onEdit(index: any) {
    this.dialog.open(EditBankPettyComponent, {
      data: {
        userData: this.bankReceiptPettyPaymentTable[index],
      },
    });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService
      .deleteBankPayment(this.bankReceiptPettyPaymentTable[index].id)
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
