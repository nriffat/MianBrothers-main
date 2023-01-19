import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { PurchasesService } from 'src/app/Finance/purchases.service';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-adjustment',
  templateUrl: './customer-adjustment.component.html',
  styleUrls: ['./customer-adjustment.component.css'],
})
export class CustomerAdjustmentComponent implements OnInit {
  allCustomerAdjustments: any;
  dataSource: MatTableDataSource<any> | any;
  disablePrint: boolean = false;
  customer_index: number = 0;
  isCustomerLoaded: boolean = false;
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
    'totalDebited',
    'delete',
    'edit',
  ];

  constructor(
    private accountService: AccountsService,
    public dialog: MatDialog,
    private _purchaseService: PurchasesService,
    private _snackbar :MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.getcustomerAdjustments().subscribe((res: any) => {
      this.allCustomerAdjustments = res.payload;
      this.dataSource = new MatTableDataSource(this.allCustomerAdjustments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('all journal', this.allCustomerAdjustments);
    });
  }
  loadCustomerAdjustment(index: any) {
    this.customer_index = index;
    this.isCustomerLoaded = true;
    let obj = new Array(this.allCustomerAdjustments[this.customer_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }

  onEdit(index: any) {
    console.log('INDEX', index);
    this.dialog.open(EditCustomerComponent, {
      data: {
        userData: this.allCustomerAdjustments[index],
      },
    });
  }

  onDelete(index: any) {
    this._purchaseService
      .deleteAdjustments(this.allCustomerAdjustments[index].id)
      .then(
        (res: any) => {
          window.location.reload();
        },
        (err: any) => {
        }
      );
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
    let pdf = new jsPDF('p', 'mm', 'a4');

    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png;base64'); // 'image/jpeg' for lower quality output.
      // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      document.body.appendChild(canvas);
      const imgProps = pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('customer-adjustments.pdf');
    });
  }
}
