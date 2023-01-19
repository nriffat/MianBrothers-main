import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PurchasesService } from 'src/app/Finance/purchases.service';
import { SalesService } from 'src/app/Finance/Sales/sales.service';

@Component({
  selector: 'app-outward-gate',
  templateUrl: './outward-gate.component.html',
  styleUrls: ['./outward-gate.component.css'],
})
export class OutwardGateComponent implements OnInit {
  productSales: any;
  purchase_index: number = 0;
  purchaseTableData: any;
  isPurchaseLoaded: boolean = false;
  vendorByIdData: any;
  deliverChallan: any;
  isProductCodeLoaded: boolean = false;
  isDeliveryCodeLoaded: boolean = false;
  disablePrint: boolean = false;
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  sales_index: number = 0;
  isSaleLoaded: boolean = false;
  totalAmount : any;
  displayedColumns: string[] = [
    'itemCode',
    'quantity',
    'unit',
    'rate',
  ];
  constructor(
    private salesService: SalesService,
    private _purchaseService: PurchasesService
  ) {}

  ngOnInit(): void {
    this.salesService.getAllSales().subscribe((response: any) => {
      console.log('get all purchase sales', response);
      this.productSales = response.payload;
    });
  }

  loadSales(index: number) {
    this.sales_index = index;
    this.isSaleLoaded = true;
    console.log('PURCHASE', this.productSales[this.sales_index]);
    this.salesService
      .getCustomersById(this.productSales[this.sales_index].customerId)
      .subscribe((res: any) => {
        this.vendorByIdData = res.payload;
        this.isProductCodeLoaded = true;
      });
    this._purchaseService
      .getProductHistory(this.productSales[this.sales_index].id)
      .subscribe((response: any) => {
        console.log('response', response);
        this.dataSource = response.payload;
        this.dataSource.paginator = Object.keys(response.payload).length;
        console.log('paginator', this.dataSource.paginator);
        this.dataSource.sort = this.sort;
        // this.disablePrint = true;
      });
      this.salesService
      .getDeliveryChallanByOrderId(this.productSales[this.sales_index].id)
      .subscribe((data: any) => {
        this.deliverChallan = data.payload[0];
        this.totalAmount = this.deliverChallan.totalAmount
        console.log('this.salesOrders', this.deliverChallan);
        this.isDeliveryCodeLoaded = true;
      });
    this.disablePrint = true;
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
}
