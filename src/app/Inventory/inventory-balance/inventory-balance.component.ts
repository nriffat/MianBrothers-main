import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-inventory-balance',
  templateUrl: './inventory-balance.component.html',
  styleUrls: ['./inventory-balance.component.css']
})
export class InventoryBalanceComponent implements OnInit {

  displayedColumns: string[] = [
    'itemCode',
    'productName',
    'quantity',
    'productType',
  ];
  dataSource: MatTableDataSource<any> | any;
  allInventoryBalance: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(public route_:Router,private _purchaseService : PurchasesService) {
  }

  ngOnInit(): void {
    this._purchaseService.getInventoryBalance().subscribe((res:any)=>{
      this.allInventoryBalance = res.payload;
      console.log("inventory balance",this.allInventoryBalance);
      this.dataSource = new MatTableDataSource(this.allInventoryBalance);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
