import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { PurchasesService } from '../purchases.service';
import { EditReturnComponent } from './edit-return/edit-return.component';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.css'],
})
export class PurchaseReturnComponent implements OnInit {
  public purchaseReturnTable: any;
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  allDataById : any;
  purchase_index : number = 0;
  isPurchaseLoaded : boolean = false;
  isProductCodeLoaded : boolean = false;
  vendorByIdData : any;
  disablePrint : boolean = false;
  allPurchaseReturns :any;
  displayedColumns: string[] = [
    'debitNotes',
    'quantity',
    'unit',
    'productItemCode',
    'delete',
    'edit',
  ];

  constructor(
    private _purchaseService: PurchasesService,
    public dialog: MatDialog,
    private _snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this._purchaseService.getPurchaseReturnTable().subscribe((res:any)=>{
      this.allPurchaseReturns = res.payload;
    })
  }
  loadPurchase(index: number) {
    this.purchase_index = index;
    this.isPurchaseLoaded = true;
    this._purchaseService.getPurchaseSalesById(this.allPurchaseReturns[this.purchase_index].saleId).subscribe((res:any)=>{
      this._purchaseService
        .getVendorById(res.payload[0].vendorId)
        .subscribe((res: any) => {
          this.vendorByIdData = res.payload;
          console.log('vendor ID',this.vendorByIdData)
          this.isProductCodeLoaded = true;
        });
    })
      this._purchaseService
      .getReturnsByOrderId(this.allPurchaseReturns[this.purchase_index].id)
      .subscribe((response: any) => {
        console.log('return table', response);
        this.purchaseReturnTable = response.payload;
        this.dataSource = new MatTableDataSource(this.purchaseReturnTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }
  editPurchaseReturn(index:any) {
    this._purchaseService.getPurchaseReturnById(this.purchaseReturnTable[index].id).subscribe((res:any)=>{
      console.log("RES",res)
     this.allDataById = res.payload[0]
     this.dialog.open(EditReturnComponent, {
       data: {
         userData: this.allDataById,
         data : this.purchaseReturnTable[index]
       },
     });
    })
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService.deletePurchseReturn(this.purchaseReturnTable[index].returnId).then((res:any)=>{
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
      pdf.save('purchase-return.pdf');
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
