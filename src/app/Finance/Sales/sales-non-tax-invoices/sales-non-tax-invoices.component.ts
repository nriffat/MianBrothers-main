import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { EditTaxComponent } from '../../purchase-non-tax/edit-tax/edit-tax.component';
import { PurchasesService } from '../../purchases.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-sales-non-tax-invoices',
  templateUrl: './sales-non-tax-invoices.component.html',
  styleUrls: ['./sales-non-tax-invoices.component.css'],
})
export class SalesNonTaxInvoicesComponent implements OnInit {
  public salesNonTaxTableData: any;
  isProductCodeLoaded: any;
  purchase_index: number = 0;
  isPurchaseLoaded: boolean = false;
  disablePrint: boolean = false;
  vendorByIdData: any;
  displayedColumns: string[] = [
    'discount',
    'types',
    'totalAmount',
    'productItemCode',
    'paymentTerms',
    'orderSerialNumber',
    'orderDate',
    'deliveryChallan',
    'accountType',
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
    this._salesService.getAllSalesNonTaxTable().subscribe((response: any) => {
      console.log('Sales Tax Table', response);
      this.salesNonTaxTableData = response.payload;
      this.dataSource = new MatTableDataSource(this.salesNonTaxTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadPurchase(index: number) {
    this.purchase_index = index;
    this.isPurchaseLoaded = true;
    console.log('PURCHASE', this.salesNonTaxTableData[this.purchase_index]);
    this._salesService
      .getCustomersById(
        this.salesNonTaxTableData[this.purchase_index].customerId
      )
      .subscribe((res: any) => {
        this.vendorByIdData = res.payload;
        this.isProductCodeLoaded = true;
      });
    let obj = new Array(this.salesNonTaxTableData[this.purchase_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }

  onEdit(index: any) {
    this.dialog.open(EditTaxComponent, {
      data: {
        userData: this.salesNonTaxTableData[index],
      },
    });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService
      .deletePurchseSales(this.salesNonTaxTableData[index].id)
      .then((res: any) => {
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
      pdf.save('purchase-sales-tax.pdf');
      window.location.reload();
    });
  }
}
