import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ProductService } from '../product.service';
import { PurchasesService } from '../purchases.service';
import { EditBillComponent } from './edit-bill/edit-bill.component';

@Component({
  selector: 'app-bill-of-material',
  templateUrl: './bill-of-material.component.html',
  styleUrls: ['./bill-of-material.component.css'],
})
export class BillOfMaterialComponent implements OnInit {
  allOrdersData: any;
  isOrderDataLoaded: boolean = false;
  order_index: number = 0;
  dataSource: MatTableDataSource<any> | any;
  billOfMaterialTable: any;
  disablePrint: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns: string[] = [
    'itemCode',
    'quantity',
    'unit',
    'rate',
    'amount',
    'delete',
    'edit',
  ];
  constructor(
    public router: Router,
    private _productService: ProductService,
    public dialog: MatDialog,
    private _purchaseService: PurchasesService,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this._productService.getAllOrders().subscribe((res: any) => {
      this.allOrdersData = res.payload;
      console.log('allOrdersData', this.allOrdersData);
    });
  }

  loadOrder(index: any) {
    this.order_index = index;
    this.isOrderDataLoaded = true;
    console.log('ID', this.allOrdersData[this.order_index].id);
    this._productService
      .getUsageOrdersByOrdersId(this.allOrdersData[this.order_index].id)
      .subscribe((res: any) => {
        console.log('res', res);
        this.billOfMaterialTable = res.payload;
        // let obj = new Array(this.billOfMaterialTable);
        this.dataSource = this.billOfMaterialTable;
        this.disablePrint = true;
        console.log('HEHEH', this.dataSource);
      });
  }

  routeToAdd() {
    this.router.navigate(['/employee-home/add-new-item']);
  }
  routeToAddBill() {
    this.router.navigate(['/inventory-dashboard/add-new-bill']);
  }

  onEdit(index: any) {
    console.log('index', index);
    this._productService
      .getOrdersById(this.billOfMaterialTable[index].orderId)
      .subscribe((res: any) => {
        console.log('res', res);
        this.dialog.open(EditBillComponent, {
          data: {
            userData: res.payload[0],
            data: this.billOfMaterialTable[index],
          },
        });
      });
  }

  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseService
      .deleteBillOfMaterial(this.billOfMaterialTable[index].orderId)
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
    let pdf = new jsPDF('p', 'mm', 'a4');

    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png;base64'); // 'image/jpeg' for lower quality output.
      // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      document.body.appendChild(canvas);
      const imgProps = pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('bill-of-material.pdf');
      window.location.reload();
    });
  }
}
