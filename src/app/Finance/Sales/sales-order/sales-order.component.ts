import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { EditPurchaseOrderComponent } from '../../purchase-order/edit-purchase-order/edit-purchase-order.component';
import { PurchasesService } from '../../purchases.service';
import { SalesService } from '../sales.service';
import { EditSaleOrderComponent } from './edit-sale-order/edit-sale-order.component';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  public salesTableData: any;
  allDataById: any;
  vendorByIdData: any;
  sales_index: number = 0;
  isSaleLoaded: boolean = false;
  isProductCodeLoaded: boolean = false;
  disablePrint : boolean = false;
  allSales : any;
  displayedColumns: string[] = [
    'itemCode',
    'quantity',
    'unit',
    'Rate',
    'valueExclTax',
    'salesTaxRate',
    'salesTaxAmount',
    'furtherTaxRate',
    'furtherTaxAmount',
    'valueInclTax',
    'delete',
    'edit',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(
    private _salesService: SalesService,
    public dialog: MatDialog,
    public _purchaseService: PurchasesService,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this._salesService.getAllSales().subscribe((res:any)=>{
      this.allSales = res.payload;
    })
  }
  loadSales(index: number) {
    this.sales_index = index;
    this.isSaleLoaded = true;
    // console.log('PURCHASE', this.salesTableData[this.sales_index]);
    this._purchaseService.getProductHistory(this.allSales[this.sales_index].id).subscribe((response: any) => {
      console.log('Sales Table', response);
      this.salesTableData = response.payload;
      this.dataSource = new MatTableDataSource(this.salesTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this._salesService
      .getCustomersById(this.allSales[this.sales_index].customerId)
      .subscribe((res: any) => {
        this.vendorByIdData = res.payload;
        this.isProductCodeLoaded = true;
      });

    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }
  onEdit(index: any) {
    this._salesService
      .getSalesOrdersById(this.salesTableData[index].orderId)
      .subscribe((res: any) => {
        this.allDataById = res.payload[0];
        console.log('Sale Edit', this.allDataById);
        this.dialog.open(EditSaleOrderComponent, {
          data: {
            userData: this.allDataById,
            data : this.salesTableData[index]
          },
        });
      });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService.deletePurchseOrder(this.salesTableData[index].orderId).then((res:any)=>{
        console.log('deleted',res);
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
    let pdf = new jspdf('p', 'mm', 'a4');

    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png;base64'); // 'image/jpeg' for lower quality output.
      // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      document.body.appendChild(canvas);
      const imgProps = pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('sales-order.pdf');
      window.location.reload();
    });
  }
}
