import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ProductService } from 'src/app/Finance/product.service';

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {

  salesReport:any;
  disablePrint: boolean = false;
  displayedColumns: string[] = [
    'accountCode',
    'vendor',
    'invoiceNo',
    'invoiceDate',
    'invoiceAmount',
    '0-10Days',
    '11-20Days',
    '21-30Days',
    'Above30Days',
    'balance',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(private _productService : ProductService) { }

  ngOnInit(): void {
    this._productService.getSaleReportAging().then((res:any)=>{
      this.salesReport = res.payload;
      console.log('DATA', this.salesReport);
      this.dataSource = new MatTableDataSource(res.payload);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.disablePrint = true;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      pdf.save('sales-report.pdf');
      window.location.reload();
    });
  }
}
