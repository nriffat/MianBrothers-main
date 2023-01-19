import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { ProductService } from 'src/app/Finance/product.service';

@Component({
  selector: 'app-account-ledger',
  templateUrl: './account-ledger.component.html',
  styleUrls: ['./account-ledger.component.css'],
})
export class AccountLedgerComponent implements OnInit {
  allAccounts: any;
  account_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  disablePrint: boolean = false;
  indexForAccount : any;
  disableSearch : boolean = false;
  disableSearchFrom : boolean = false;
  disableSearchTo : boolean = false;
  displayedColumns: string[] = [
    'date',
    'description',
    'debit',
    'credit',
    'balance',
    'status',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  frome: any;
  $toDate : any;
  constructor(
    private _accountService: AccountsService,
    private _productService: ProductService,
    private dataPipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this._accountService.getAllUserAccounts().subscribe((res: any) => {
      this.allAccounts = res.payload;
      console.log('this.allAccounts:', this.allAccounts);
    });
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
    this.indexForAccount = this.allAccounts[this.account_index].id
    this.disableSearch = true;
  }

  onEdit(i: any) {}

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
      pdf.save('account-ledger.pdf');
      window.location.reload();
    });
  }
  getDate(date:any){
    this.frome = this.transformDate(date);
    console.log("this.frome",this.frome)
    this.disableSearchFrom = true;
  }
  getDate2(date:any){
    this.$toDate = this.transformDate(date);
    console.log("this.to",this.$toDate)
    this.disableSearchTo = true;
  }

  search(){
    console.log("ID",this.indexForAccount)
    this._productService
      .getAccountLedger(this.indexForAccount,this.frome,this.$toDate)
      .then((res: any) => {
        this.dataSource = new MatTableDataSource(res.payload);
        console.log('DATA2', this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.disablePrint = true;
      });
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
