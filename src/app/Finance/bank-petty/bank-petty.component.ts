import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { BankPaymentService } from '../bank-payment.service';
import { PurchasesService } from '../purchases.service';
import { EditBankPettyComponent } from './edit-bank-petty/edit-bank-petty.component';

@Component({
  selector: 'app-bank-petty',
  templateUrl: './bank-petty.component.html',
  styleUrls: ['./bank-petty.component.css'],
})
export class BankPettyComponent implements OnInit {
  allAccounts: any;
  allPurchaseSales: any;
  public account_index: number = 0;
  public purchaseSales_index: number = 0;
  public paidTo_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  isPurchaseSalesLoaded: boolean = false;
  isPaidToLoaded: boolean = false;
  public bankPettyPaymentTable: any;

  displayedColumns: string[] = [
    'accountCode',
    'paidToInfo',
    'amountPaid',
    'delete',
    'edit',
  ];
  dataSource: MatTableDataSource<any> | any;
  disablePrint : boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(
    private _bankService: BankPaymentService,
    private _accountService: AccountsService,
    private _purchaseService : PurchasesService,
    public dialog : MatDialog,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this._accountService.getAllListOfAccounts().subscribe((res: any) => {
      this.allAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts.payload);
    });

    this._bankService.getBankPettyTable().subscribe((res: any) => {
      console.log('petty table', res);
      this.bankPettyPaymentTable = res.payload;
      this.dataSource = new MatTableDataSource(this.bankPettyPaymentTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
    let obj = new Array(this.bankPettyPaymentTable[this.account_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }


  onEdit(index: any) {
    this.dialog.open(EditBankPettyComponent, {
      data: {
        userData: this.bankPettyPaymentTable[index],
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
    this._purchaseService.deleteBankPayment(this.bankPettyPaymentTable[index].id).then((res:any)=>{
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
      pdf.save('bank-petty.pdf');
    });
  }
}
