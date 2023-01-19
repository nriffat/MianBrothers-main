import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { EditTaxComponent } from 'src/app/Finance/purchase-non-tax/edit-tax/edit-tax.component';
import { PurchasesService } from 'src/app/Finance/purchases.service';
import { EditJournalComponent } from '../edit-journal/edit-journal.component';

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.css'],
})
export class JournalVoucherComponent implements OnInit {
  dataSource: MatTableDataSource<any> | any;
  disablePrint: boolean = false;
  allJournalVoucher: any;
  isJournalLoaded: boolean = false;
  journal_index: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  displayedColumns: string[] = [
    'accountCode',
    'accountName',
    'types',
    'description',
    'debit',
    'delete',
    'edit',
  ];

  constructor(
    private router: Router,
    private accountService: AccountsService,
    public dialog: MatDialog,
    private _purchaseService: PurchasesService,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.getJournalVoucher().subscribe((res: any) => {
      this.allJournalVoucher = res.payload;
      this.dataSource = new MatTableDataSource(this.allJournalVoucher);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('all journal', this.allJournalVoucher);
    });
  }

  loadjournalVoucher(index: any) {
    this.journal_index = index;
    this.isJournalLoaded = true;
    let obj = new Array(this.allJournalVoucher[this.journal_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }

  onEdit(index: any) {
    this.dialog.open(EditJournalComponent, {
      data: {
        userData: this.allJournalVoucher[index],
      },
    });
  }
  onDelete(index: any) {
    this._purchaseService.deleteAdjustments(this.allJournalVoucher[index].id).then((res: any) => {
      window.location.reload();
    },
    (err: any) => {
    })
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
      pdf.save('journal-voucher.pdf');
    });
  }

  routeToAddVoucher() {
    this.router.navigate(['employee-home/add-journal-voucher']);
  }
}
