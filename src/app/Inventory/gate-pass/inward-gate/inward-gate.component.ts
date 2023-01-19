import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-inward-gate',
  templateUrl: './inward-gate.component.html',
  styleUrls: ['./inward-gate.component.css']
})
export class InwardGateComponent implements OnInit {
  productSales : any;
  purchaseTableData : any;
  dataSource: MatTableDataSource<any> | any;
  isPurchaseLoaded : boolean = false;
  purchase_index : any;
  vendorByIdData : any;
  isProductCodeLoaded : any;
  disablePrint : boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns: string[] = [
    'itemCode',
    'quantity',
    'unit',
    'rate',
  ];
  constructor(private _purchaseService : PurchasesService) { }

  ngOnInit(): void {
    this._purchaseService.getPurchaseOrders().subscribe((response: any) => {
      console.log('get all purchase sales', response);
      this.productSales = response.payload;
    });

  }
  loadPurchase(index: number) {
    this.purchase_index = index;
    this.isPurchaseLoaded = true;
    this._purchaseService
      .getVendorById(this.productSales[this.purchase_index].vendorId)
      .subscribe((res: any) => {
        this.vendorByIdData = res.payload;
        this.isProductCodeLoaded = true;
        console.log('VENDOR', res.payload);
      });
    this._purchaseService.getProductHistory(this.productSales[this.purchase_index].id).subscribe((response: any) => {
        console.log('response',response)
        this.dataSource = response.payload;
        this.dataSource.paginator = Object.keys(response.payload).length;
        console.log("paginator",this.dataSource.paginator)
        this.dataSource.sort = this.sort;
        this.disablePrint = true;
      })
    console.log('HEHEH', this.dataSource);
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
      pdf.save('inward-gate.pdf');
      window.location.reload();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
