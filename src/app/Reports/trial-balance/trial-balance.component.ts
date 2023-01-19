import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { ProductService } from 'src/app/Finance/product.service';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.css'],
})
export class TrialBalanceComponent implements OnInit {
  disablePrint: boolean = false;
  displayedColumns: string[] = [
    'accountCode',
    'accountName',
    'debit',
    'credit',
    'delete',
    'edit',
  ];
  displayedColumns2: string[] = [
    'accountCode',
    'accountName',
    'openingBalance',
    'status',
    'debit',
    'credit',
    'closingBalance',
    'netStatus',

  ];
  twoColumnsData: any;
  SixColumnsData: any;
  dataSource: MatTableDataSource<any> | any;
  dataSource2: MatTableDataSource<any> | any;
  disableSearch: boolean = false;
  disableSearchFrom: boolean = false;
  disableSearchTo: boolean = false;
  frome: any;
  $toDate: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatPaginator) paginator2: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatSort) sort2: MatSort | any;
  columnTwoCheck: boolean = false;
  columnSixCheck: boolean = false;
  allAccounts: any;
  account_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  indexForAccount: any;
  twoColumnCheck: boolean = false;
  sixColumnCheck: boolean = false;
  constructor(
    private _productService: ProductService,
    private _accountService: AccountsService,
    private dataPipe: DatePipe
  ) {}

  ngOnInit(): void {
    this._accountService.getAllUserAccounts().subscribe((res: any) => {
      this.allAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
    this.indexForAccount = this.allAccounts[this.account_index].id;
    this.disableSearch = true;
  }

  onTwoColumn() {
    this.twoColumnCheck = true;
    // this._productService.get2ColumnTrialBalance().subscribe((res:any)=>{
    //   this.twoColumnsData = res.payload;
    //   this.dataSource = new MatTableDataSource(res.payload);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    //   console.log("TWO",this.twoColumnsData);
    // })
  }
  onSixColumn() {
    this.sixColumnCheck = true;
    // this._productService.get6ColumnTrialBalance().subscribe((res:any)=>{
    //   this.SixColumnsData = res.payload;
    //   this.dataSource2 = new MatTableDataSource(res.payload);
    //   this.dataSource2.sort = this.sort2;
    //   this.dataSource2.paginator = this.paginator2;

    //   console.log("Six",this.twoColumnsData);
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  getDate(date: any) {
    this.frome = this.transformDate(date);
    console.log('this.frome', this.frome);
    this.disableSearchFrom = true;
  }
  getDate2(date: any) {
    this.$toDate = this.transformDate(date);
    console.log('this.to', this.$toDate);
    this.disableSearchTo = true;
  }

  search() {
    if (this.twoColumnCheck == true) {
      console.log('ID2', this.indexForAccount);
      this._productService
        .getTwoColumn(this.indexForAccount, this.frome, this.$toDate)
        .then((res: any) => {
          this.dataSource = new MatTableDataSource(res.payload);
          console.log('DATA2', this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.disablePrint = true;
        });
    } else if (this.sixColumnCheck == true) {
      console.log('ID6', this.indexForAccount);
      this._productService
        .getSixColumn(this.indexForAccount, this.frome, this.$toDate)
        .then((res: any) => {
          this.dataSource2 = new MatTableDataSource(res.payload);
          this.dataSource2.sort = this.sort2;
          this.dataSource2.paginator = this.paginator2;
          this.disablePrint = true;
          console.log('DATA6', this.dataSource);
        });
    }
  }

  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
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
      pdf.save('trial-balance.pdf');
      window.location.reload();
    });
  }
}
