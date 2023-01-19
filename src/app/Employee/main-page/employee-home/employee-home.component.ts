import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css'],
})
export class EmployeeHomeComponent implements OnInit {
    userItems = [
    {
      "displayName" : "Dashboard",
      "routeName" : "/employee-home/finance-dashboard"

    },{
      "displayName" : "Charts Of Accounts",
      "routeName" : "/employee-home/chart-of-account",
    },{
      "displayName" : "Purchases",
      "routeName" : "/employee-home/purchases",
    },{
      "displayName" : "Sales",
      "routeName" : "/employee-home/sales",
    },
  ]
  chartAccountBoolean: boolean = false;
  dashboardBoolean: boolean = false;
  purchasesBoolean: boolean = false;

  // userItems = [
  //   {
  //     displayName: 'Dashboard',
  //     routeName: 'dashboard',
  //   },
  //   {
  //     displayName: 'Employee Registeration',
  //     routeName: 'employee-register',
  //   },
  //   {
  //     displayName: 'All Employees',
  //     routeName: 'all-employees',
  //   },
  //   {
  //     displayName: 'Inventory Balance',
  //     routeName: 'inventory-balance',
  //   },
  //   {
  //     displayName: 'Gate Pass',
  //     routeName: 'gate-pass',
  //   },
  //   {
  //     displayName: 'Dashboard',
  //     routeName: 'finance-dashboard',
  //   },
  //   {
  //     displayName: 'Purchases',
  //     routeName: 'purchases',
  //   },
  //   {
  //     displayName: 'Purchase Order',
  //     routeName: 'purchase-order',
  //   },
  //   {
  //     displayName: 'Add Purchase Order',
  //     routeName: 'add-purchase-order',
  //   },
  //   {
  //     displayName: 'Purchase Sales',
  //     routeName: 'purchase-sales-tax',
  //   },
  //   {
  //     displayName: 'Purchase Non Sales',
  //     routeName: 'purchase-non-sales',
  //   },
  //   {
  //     displayName: 'Charts Of Accounts',
  //     routeName: 'chart-of-account',
  //   },
  //   {
  //     displayName: 'Purchase Return',
  //     routeName: 'purchase-return',
  //   },
  //   {
  //     displayName: 'Bank Payment',
  //     routeName: 'bank-payment',
  //   },
  //   {
  //     displayName: 'Bank Petty',
  //     routeName: 'bank-petty',
  //   },
  //   {
  //     displayName: 'Cash Payment',
  //     routeName: 'cash-payment',
  //   },
  //   {
  //     displayName: 'Cash Petty',
  //     routeName: 'cash-petty',
  //   },
  //   {
  //     displayName: 'Sales',
  //     routeName: 'sales',
  //   },
  //   {
  //     displayName: 'Sales Order',
  //     routeName: 'sales-order',
  //   },
  //   {
  //     displayName: 'Delivery Challan',
  //     routeName: 'delivery-challan',
  //   },
  //   {
  //     displayName: 'sales Tax Invoices',
  //     routeName: 'sales-tax-invoices',
  //   },
  //   {
  //     displayName: 'Sales Non Tax Invoices',
  //     routeName: 'sales-non-tax-invoices',
  //   },
  //   {
  //     displayName: 'Sale Returns',
  //     routeName: 'sale-returns',
  //   },
  //   {
  //     displayName: 'Bank Customer',
  //     routeName: 'bank-customer-receipt',
  //   },
  //   {
  //     displayName: 'Bank Receipt',
  //     routeName: 'bank-receipt-petty',
  //   },
  //   {
  //     displayName: 'Cash Receipt Customer',
  //     routeName: 'cash-receipt-customer',
  //   },
  //   {
  //     displayName: 'Cash Receipt Petty',
  //     routeName: 'cash-receipt-petty-customer',
  //   },
  //   {
  //     displayName: 'Bill Of Material',
  //     routeName: 'bill-of-material',
  //   },
  // ];
  sub!: Subscription;

  constructor(public route_ : Router) {}

  ngOnInit(): void {}

  loadUserInformationComponent(componentName: string) {
    // console.log(componentName);
    // if (componentName == 'dashboard') {
    //   this.dashboardBoolean = true;
    // } else {
    //   this.dashboardBoolean = false;
    // }

    // if (componentName == 'chart-of-account') {
    //   this.chartAccountBoolean = true;
    // } else {
    //   this.chartAccountBoolean = false;
    // }

    // if (componentName == 'purchases') {
    //   this.purchasesBoolean = true;
    // } else {
    //   this.purchasesBoolean = false;
    // }
    this.route_.navigate([
      `${componentName.toLowerCase()}`,
    ]);
  }
}
