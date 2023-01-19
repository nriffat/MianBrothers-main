import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { ProductService } from 'src/app/Finance/product.service';

@Component({
  selector: 'app-define-roles',
  templateUrl: './define-roles.component.html',
  styleUrls: ['./define-roles.component.css'],
})
export class DefineRolesComponent implements OnInit {
  list: any;
  temp: any;
  allUsers: any;
  account_index: number = 0;
  isAccountCodeLoaded: boolean = false;
  indexForAccount: any;
  disableCheck: boolean = false;
  constructor(
    private _accountService: AccountsService,
    private productService: ProductService,
    private _snackBar : MatSnackBar
  ) {}
  ngOnInit() {
    this.list = [
      {
        id: 0,
        title: 'employees',
        name: 'Employees',
        checked: false,
      },
      {
        id: 1,
        title: 'users',
        name: 'Users',
        checked: false,
      },
      {
        id: 2,
        title: 'products',
        name: 'Products',
        checked: false,
      },
      {
        id: 3,
        title: 'vendors',
        name: 'Vendors',
        checked: false,
      },
      {
        id: 4,
        title: 'customers',
        name: 'Customers',
        checked: false,
      },
      {
        id: 5,
        title: 'chartOfAccounts',
        name: 'Chart Of Accounts',
        checked: false,
      },
      {
        id: 6,
        title: 'psOrders',
        name: 'Orders',
        checked: false,
      },
      {
        id: 7,
        title: 'psSales',
        name: 'Sales',
        checked: false,
      },
      {
        id: 8,
        title: 'psReturns',
        name: 'Returns',
        checked: false,
      },
      {
        id: 9,
        title: 'psPayments',
        name: 'Payments',
        checked: false,
      },
      {
        id: 10,
        title: 'deliveryChallans',
        name: 'Delivery Challan',
        checked: false,
      },
      {
        id: 11,
        title: 'billOfMaterials',
        name: 'Bill Of Materials',
        checked: false,
      },
      {
        id: 12,
        title: 'inwardGatePasses',
        name: 'Inward Gate Pass',
        checked: false,
      },
      {
        id: 13,
        title: 'outwardGatePasses',
        name: 'Outward Gate Pass',
        checked: false,
      },
      {
        id: 14,
        title: 'accountLedgers',
        name: 'Account Ledger',
        checked: false,
      },
      {
        id: 15,
        title: 'trialBalances',
        name: 'Trial Balance',
        checked: false,
      },
      {
        id: 16,
        title: 'psReports',
        name: 'Reports',
        checked: false,
      },
      {
        id: 17,
        title: 'generalJournalVouchers',
        name: 'General Journal Vouchers',
        checked: false,
      },
      {
        id: 18,
        title: 'customerAdjustments',
        name: 'Customer Adjustments',
        checked: false,
      },
    ];
    this._accountService.getAllUsers().then((res: any) => {
      this.allUsers = res.payload;
      console.log('this.allAccounts:', this.allUsers);
    });
  }
  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountCodeLoaded = true;
    this.indexForAccount = this.allUsers[this.account_index].id;
    this.disableCheck = true;
    this._accountService
      .getRollsByUserId(this.indexForAccount)
      .then((res: any) => {
        console.log('res', res.payload[0].employees.data[0]);
        this.list = [
          {
            id: 0,
            title: 'employees',
            name: 'Employees',
            checked: res.payload[0].employees.data[0],
          },
          {
            id: 1,
            title: 'users',
            name: 'Users',
            checked: res.payload[0].users.data[0],
          },
          {
            id: 2,
            title: 'products',
            name: 'Products',
            checked: res.payload[0].products.data[0],
          },
          {
            id: 3,
            title: 'vendors',
            name: 'Vendors',
            checked: res.payload[0].vendors.data[0],
          },
          {
            id: 4,
            title: 'customers',
            name: 'Customers',
            checked: res.payload[0].customers.data[0],
          },
          {
            id: 5,
            title: 'chartOfAccounts',
            name: 'Chart Of Accounts',
            checked: res.payload[0].chartOfAccounts.data[0],
          },
          {
            id: 6,
            title: 'psOrders',
            name: 'Orders',
            checked: res.payload[0].psOrders.data[0],
          },
          {
            id: 7,
            title: 'psSales',
            name: 'Sales',
            checked: res.payload[0].psSales.data[0],
          },
          {
            id: 8,
            title: 'psReturns',
            name: 'Returns',
            checked: res.payload[0].psReturns.data[0],
          },
          {
            id: 9,
            title: 'psPayments',
            name: 'Payments',
            checked: res.payload[0].psPayments.data[0],
          },
          {
            id: 10,
            title: 'deliveryChallans',
            name: 'Delivery Challan',
            checked: res.payload[0].deliveryChallans.data[0],
          },
          {
            id: 11,
            title: 'billOfMaterials',
            name: 'Bill Of Materials',
            checked: res.payload[0].billOfMaterials.data[0],
          },
          {
            id: 12,
            title: 'inwardGatePasses',
            name: 'Inward Gate Pass',
            checked: res.payload[0].inwardGatePasses.data[0],
          },
          {
            id: 13,
            title: 'outwardGatePasses',
            name: 'Outward Gate Pass',
            checked: res.payload[0].outwardGatePasses.data[0],
          },
          {
            id: 14,
            title: 'accountLedgers',
            name: 'Account Ledger',
            checked: res.payload[0].accountLedgers.data[0],
          },
          {
            id: 15,
            title: 'trialBalances',
            name: 'Trial Balance',
            checked: res.payload[0].trialBalances.data[0],
          },
          {
            id: 16,
            title: 'psReports',
            name: 'Reports',
            checked: res.payload[0].psReports.data[0],
          },
          {
            id: 17,
            title: 'generalJournalVouchers',
            name: 'General Journal Vouchers',
            checked: res.payload[0].generalJournalVouchers.data[0],
          },
          {
            id: 18,
            title: 'customerAdjustments',
            name: 'Customer Adjustments',
            checked: res.payload[0].customerAdjustments.data[0],
          },
        ];
      });
  }
  get result() {
    return this.list.filter((item: any) => item.checked);
  }

  updateRoles() {
    console.log('ID', this.indexForAccount);
    this.temp = {
      employees: this.list[0].checked,
      users: this.list[1].checked,
      products: this.list[2].checked,
      vendors: this.list[3].checked,
      customers: this.list[4].checked,
      chartOfAccounts: this.list[5].checked,
      psOrders: this.list[6].checked,
      psSales: this.list[7].checked,
      psReturns: this.list[8].checked,
      psPayments: this.list[9].checked,
      deliveryChallans: this.list[10].checked,
      billOfMaterials: this.list[11].checked,
      inwardGatePasses: this.list[12].checked,
      outwardGatePasses: this.list[13].checked,
      accountLedgers: this.list[14].checked,
      trialBalances: this.list[15].checked,
      psReports: this.list[16].checked,
      generalJournalVouchers: this.list[17].checked,
      customerAdjustments: this.list[18].checked,
    };
    console.log('ChECK', this.temp);

    this.productService.updateRolls(this.indexForAccount, this.temp).then(
      (res: any) => {
        console.log('updated succesfully', res);
      },
      (err: any) => {
      }
    );
  }
}
