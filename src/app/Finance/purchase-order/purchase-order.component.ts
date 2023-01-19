import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchasesService } from '../purchases.service';
import { EditPurchaseOrderComponent } from './edit-purchase-order/edit-purchase-order.component';
import jspdf, { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  public purchaseOrder: any;
  public vendorsCode: any;
  public purchaseTableData: any;
  public product_index: number = 0;
  public purchase_index: number = 0;
  public isProductCodeLoaded: boolean = false;
  public isPurchaseLoaded: boolean = false;
  allDataById: any;
  vendorByIdData: any;
  pdfOptions: any;
  disablePrint: boolean = false;
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
  doc = new jsPDF();

  constructor(
    private _purchaseService: PurchasesService,
    public dialog: MatDialog,
    private _snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this._purchaseService.getPurchaseOrders().subscribe((response: any) => {
      console.log('get purchase orders', response);
      this.purchaseOrder = response.payload;
    });

    this._purchaseService.getAllVendorCodes().subscribe((response: any) => {
      console.log('get all vendors', response);
      this.vendorsCode = response.payload;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadPurchase(index: number) {
    this.purchase_index = index;
    this.isPurchaseLoaded = true;
    this._purchaseService
      .getVendorById(this.purchaseOrder[this.purchase_index].vendorId)
      .subscribe((res: any) => {
        this.vendorByIdData = res.payload;
        this.isProductCodeLoaded = true;
        console.log('VENDOR', res.payload);
      });
    this._purchaseService.getProductHistory(this.purchaseOrder[this.purchase_index].id).subscribe((response: any) => {
        console.log('Purchase table response', response);
        this.purchaseTableData = response.payload;
        this.dataSource = new MatTableDataSource(this.purchaseTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    // let obj = new Array(this.purchaseTableData[this.purchase_index]);
    // this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }

  loadProduct(index: number) {
    this.product_index = index;
    this.isProductCodeLoaded = true;
  }

  onEdit(index: any) {
    this._purchaseService
      .getPurchaseOrdersById(this.purchaseTableData[index].orderId)
      .subscribe((res: any) => {
        this.allDataById = res.payload[0];
        this.dialog.open(EditPurchaseOrderComponent, {
          data: {
            userData: this.allDataById,
            data : this.purchaseTableData[index]
          },
        });
      });
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService.deletePurchseOrder(this.purchaseTableData[index].orderId).then((res:any)=>{
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
      pdf.save('purchase-order.pdf');
      window.location.reload();
    });
  }
}
