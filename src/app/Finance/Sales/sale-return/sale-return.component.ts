import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { EditReturnComponent } from '../../purchase-return/edit-return/edit-return.component';
import { PurchasesService } from '../../purchases.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sale-return',
  templateUrl: './sale-return.component.html',
  styleUrls: ['./sale-return.component.css'],
})
export class SaleReturnComponent implements OnInit {
  public salesReturnTableData: any;
  sales_index: number = 0;
  isSaleLoaded: boolean = false;
  isSaleCodeLoaded: boolean = false;
  salesDataById: any;
  salesReturnData: any;
  disablePrint: boolean = false;
  displayedColumns: string[] = [
    'debitNotes',
    'quantity',
    'unit',
    'productItemCode',
    'delete',
    'edit',
  ];
  allDataById: any;
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(
    private _salesService: SalesService,
    public dialog: MatDialog,
    public purchaseService: PurchasesService,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this._salesService.getSalesReturnTable().subscribe((response: any) => {
      console.log('Sales Return Tax Table', response);
      this.salesReturnData = response.payload;
    });
  }
  loadSales(index: number) {
    this.sales_index = index;
    this.isSaleLoaded = true;

    this.purchaseService
      .getSalesById(this.salesReturnData[this.sales_index].saleId)
      .subscribe((res: any) => {
        console.log("RERERE",res)
        this._salesService
          .getCustomersById(res.payload[0].customerId)
          .subscribe((res: any) => {
            console.log('res', res);
            this.salesDataById = res.payload;
            console.log('this.salesData', this.salesDataById[0]);
            this.isSaleCodeLoaded = true;
          });
      });
    this.purchaseService
      .getReturnsByOrderId(this.salesReturnData[this.sales_index].id)
      .subscribe((response: any) => {
        console.log('Sales Return Tax Table', response);
        this.salesReturnTableData = response.payload;
        this.dataSource = new MatTableDataSource(this.salesReturnTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }

  editSaleReturn(index: any) {
    this._salesService
      .getSalesReturnById(this.salesReturnTableData[index].returnId)
      .subscribe((res: any) => {
        console.log('RES', res);
        this.allDataById = res.payload[0];
        this.dialog.open(EditReturnComponent, {
          data: {
            userData: this.allDataById,
            data: this.salesReturnTableData[index],
          },
        });
      });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this.purchaseService
      .deletePurchseReturn(this.salesReturnTableData[index].returnId)
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
      pdf.save('sales-return.pdf');
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
