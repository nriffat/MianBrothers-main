import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-customer-adjustment-credit',
  templateUrl: './customer-adjustment-credit.component.html',
  styleUrls: ['./customer-adjustment-credit.component.css']
})
export class CustomerAdjustmentCreditComponent implements OnInit {

  dataSource: MatTableDataSource<any> | any;
  disablePrint : boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns: string[] = [
    'invoiceNo',
    'invoiceDate',
    'grossAmount',
    'whtRate',
    'whtAmount',
    'gstRate',
    'gstAmount',
    'advanceAdjusted',
    'discountReceived',
    'totalCredited',
    'delete',
    'edit',
  ];

  constructor(private _purchaseService : PurchasesService,private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onEdit(index:any){

  }
  onDelete(index: any) {
    this._purchaseService.deleteAdjustments(index).then((res:any)=>{
      window.location.reload();
    },
    (err: any) => {
    })
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
      pdf.save('journal-voucher.pdf');
    });
  }

}
