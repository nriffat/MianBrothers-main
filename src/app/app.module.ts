import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './Employee/main-page/employee-dashboard/employee-dashboard.component';
import { EmployeeHomeComponent } from './Employee/main-page/employee-home/employee-home.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';
import { EmployeeDeleteComponent } from './Employee/employee-delete/employee-delete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InventoryBalanceComponent } from './Inventory/inventory-balance/inventory-balance.component';
import { GatePassComponent } from './Inventory/gate-pass/gate-pass.component';
import { InwardGateComponent } from './Inventory/gate-pass/inward-gate/inward-gate.component';
import { OutwardGateComponent } from './Inventory/gate-pass/outward-gate/outward-gate.component';
import { AddInwardComponent } from './Inventory/gate-pass/inward-gate/add-inward/add-inward.component';
import { AddOutwardComponent } from './Inventory/gate-pass/outward-gate/add-outward/add-outward.component';
import { DashboardComponent } from './Employee/main-page/dashboard/dashboard.component';
import { PurchasesComponent } from './Finance/purchases/purchases.component';
import { PurchaseOrderComponent } from './Finance/purchase-order/purchase-order.component';
import { AddPurchaseComponent } from './Finance/add-purchase/add-purchase.component';
import { AddVendorComponent } from './Finance/add-vendor/add-vendor.component';
import { PurchaseSalesTaxComponent } from './Finance/purchases/purchase-sales-tax/purchase-sales-tax.component';
import { AddPurchaseSalesComponent } from './Finance/add-purchase-sales/add-purchase-sales.component';
import { AddNonPurchaseSalesComponent } from './Finance/add-non-purchase-sales/add-non-purchase-sales.component';
import { PurchaseNonTaxComponent } from './Finance/purchase-non-tax/purchase-non-tax.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewItemComponent } from './Finance/add-new-item/add-new-item.component';
import { ChooseAccountComponent } from './accounts/choose-account/choose-account.component';
import { MainAccountComponent } from './accounts/main-account/main-account.component';
import { SubAccountComponent } from './accounts/sub-account/sub-account.component';
import { ListAccountComponent } from './accounts/list-account/list-account.component';
import { ChartOfAccountComponent } from './accounts/chart-of-account/chart-of-account.component';
import { PurchaseReturnComponent } from './Finance/purchase-return/purchase-return.component';
import { AddPurchaseReturnComponent } from './Finance/add-purchase-return/add-purchase-return.component';
import { BankPaymentComponent } from './Finance/bank-payment/bank-payment.component';
import { AddBankPaymentComponent } from './Finance/add-bank-payment/add-bank-payment.component';
import { BankPettyComponent } from './Finance/bank-petty/bank-petty.component';
import { AddBankPettyComponent } from './Finance/add-bank-petty/add-bank-petty.component';
import { CashPaymentComponent } from './Finance/cash-payment/cash-payment.component';
import { AddCashPaymentComponent } from './Finance/add-cash-payment/add-cash-payment.component';
import { CashPettyComponent } from './Finance/cash-petty/cash-petty.component';
import { AddCashPettyComponent } from './Finance/add-cash-petty/add-cash-petty.component';
import { SalesComponent } from './Finance/Sales/sales/sales.component';
import { SalesOrderComponent } from './Finance/Sales/sales-order/sales-order.component';
import { AddSalesOrderComponent } from './Finance/Sales/add-sales-order/add-sales-order.component';
import { AddCustomerComponent } from './Finance/Sales/add-customer/add-customer.component';
import { DeliveryChallanComponent } from './Finance/Sales/delivery-challan/delivery-challan.component';
import { AddDeliveryChallanComponent } from './Finance/Sales/add-delivery-challan/add-delivery-challan.component';
import { SalesTaxInvoicesComponent } from './Finance/Sales/sales-tax-invoices/sales-tax-invoices.component';
import { AddSalesTaxInvoicesComponent } from './Finance/Sales/add-sales-tax-invoices/add-sales-tax-invoices.component';
import { AddSalesNonTaxInvoicesComponent } from './Finance/Sales/add-sales-non-tax-invoices/add-sales-non-tax-invoices.component';
import { SalesNonTaxInvoicesComponent } from './Finance/Sales/sales-non-tax-invoices/sales-non-tax-invoices.component';
import { SaleReturnComponent } from './Finance/Sales/sale-return/sale-return.component';
import { AddSaleReturnsComponent } from './Finance/Sales/add-sale-returns/add-sale-returns.component';
import { BankCustomerReceiptComponent } from './Finance/Sales/bank-customer-receipt/bank-customer-receipt.component';
import { AddBankCustomerReceiptComponent } from './Finance/Sales/add-bank-customer-receipt/add-bank-customer-receipt.component';
import { BankReceiptPettyComponent } from './Finance/Sales/bank-receipt-petty/bank-receipt-petty.component';
import { AddBankReceiptPettyComponent } from './Finance/Sales/add-bank-receipt-petty/add-bank-receipt-petty.component';
import { CashReceiptCustomerComponent } from './Finance/Sales/cash-receipt-customer/cash-receipt-customer.component';
import { AddCashReceiptCustomerComponent } from './Finance/Sales/add-cash-receipt-customer/add-cash-receipt-customer.component';
import { CashReceiptPettyCustomerComponent } from './Finance/Sales/cash-receipt-petty-customer/cash-receipt-petty-customer.component';
import { AddCashReceiptPettyCustomerComponent } from './Finance/Sales/add-cash-receipt-petty-customer/add-cash-receipt-petty-customer.component';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import {
  ActionButtonsComponent,
  TableComponent,
} from './shared/material/table/table.component';
import { AllEmployeesComponent } from './Employee/all-employees/all-employees.component';
import { EditUserComponent } from './Employee/all-employees/edit-user/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPurchaseOrderComponent } from './Finance/purchase-order/edit-purchase-order/edit-purchase-order.component';
import { EditTaxComponent } from './Finance/purchase-non-tax/edit-tax/edit-tax.component';
import { EditReturnComponent } from './Finance/purchase-return/edit-return/edit-return.component';
import { EditBankComponent } from './Finance/bank-payment/edit-bank/edit-bank.component';
import { EditBankPettyComponent } from './Finance/bank-petty/edit-bank-petty/edit-bank-petty.component';
import { EditCashComponent } from './Finance/cash-payment/edit-cash/edit-cash.component';
import { EditCashPettyComponent } from './Finance/cash-petty/edit-cash-petty/edit-cash-petty.component';
import { EditDeliveryComponent } from './Finance/Sales/delivery-challan/edit-delivery/edit-delivery.component';
import { SystemChoiceComponent } from './auth/system-choice/system-choice.component';
import { MainPageComponent } from './Employee/main-page/main-page.component';
import { BillOfMaterialComponent } from './Finance/bill-of-material/bill-of-material.component';
import { AddNewBillComponent } from './Finance/add-new-bill/add-new-bill.component';
import { MainEmployeeDashboardComponent } from './Employee/main-employee-dashboard/main-employee-dashboard.component';
import { InventoryDashboardComponent } from './Inventory/inventory-dashboard/inventory-dashboard.component';
import { AsjustmentsMainComponent } from './Adjustments/asjustments-main/asjustments-main.component';
import { JournalVoucherComponent } from './Adjustments/journal-voucher/journal-voucher.component';
import { CustomerAdjustmentComponent } from './Adjustments/customer-adjustment/customer-adjustment.component';
import { ReportsMainComponent } from './Reports/reports-main/reports-main.component';
import { AccountLedgerComponent } from './Reports/account-ledger/account-ledger.component';
import { TrialBalanceComponent } from './Reports/trial-balance/trial-balance.component';
import { PurchaseReportComponent } from './Reports/purchase-report/purchase-report.component';
import { SaleReportComponent } from './Reports/sale-report/sale-report.component';
import { SystemUsersComponent } from './auth/system-users/system-users.component';
import { AddCustomerDebitComponent } from './Adjustments/add-customer-debit/add-customer-debit.component';
import { AddCustomerCreditComponent } from './Adjustments/add-customer-credit/add-customer-credit.component';
import { CustomerAdjustmentCreditComponent } from './Adjustments/customer-adjustment-credit/customer-adjustment-credit.component';
import { AddJournalVoucherComponent } from './Adjustments/add-journal-voucher/add-journal-voucher.component';
import { EditJournalComponent } from './Adjustments/edit-journal/edit-journal.component';
import { EditCustomerComponent } from './Adjustments/edit-customer/edit-customer.component';
import { AllUsersComponent } from './auth/all-users/all-users.component';
import { EditAllUserComponent } from './auth/edit-all-user/edit-all-user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DefineRolesComponent } from './auth/define-roles/define-roles.component';
import { EditSaleOrderComponent } from './Finance/Sales/sales-order/edit-sale-order/edit-sale-order.component';
import { EditBillComponent } from './Finance/bill-of-material/edit-bill/edit-bill.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    EmployeeHomeComponent,
    EmployeeRegisterComponent,
    EmployeeDeleteComponent,
    InventoryBalanceComponent,
    GatePassComponent,
    InwardGateComponent,
    OutwardGateComponent,
    AddInwardComponent,
    AddOutwardComponent,
    DashboardComponent,
    PurchasesComponent,
    PurchaseOrderComponent,
    AddPurchaseComponent,
    AddVendorComponent,
    PurchaseSalesTaxComponent,
    AddPurchaseSalesComponent,
    AddNonPurchaseSalesComponent,
    PurchaseNonTaxComponent,
    LoginComponent,
    RegistrationComponent,
    AddNewItemComponent,
    ChooseAccountComponent,
    MainAccountComponent,
    SubAccountComponent,
    ListAccountComponent,
    ChartOfAccountComponent,
    PurchaseReturnComponent,
    AddPurchaseReturnComponent,
    BankPaymentComponent,
    AddBankPaymentComponent,
    BankPettyComponent,
    AddBankPettyComponent,
    CashPaymentComponent,
    AddCashPaymentComponent,
    CashPettyComponent,
    AddCashPettyComponent,
    SalesComponent,
    SalesOrderComponent,
    AddSalesOrderComponent,
    AddCustomerComponent,
    DeliveryChallanComponent,
    AddDeliveryChallanComponent,
    SalesTaxInvoicesComponent,
    AddSalesTaxInvoicesComponent,
    AddSalesNonTaxInvoicesComponent,
    SalesNonTaxInvoicesComponent,
    SaleReturnComponent,
    AddSaleReturnsComponent,
    BankCustomerReceiptComponent,
    AddBankCustomerReceiptComponent,
    BankReceiptPettyComponent,
    AddBankReceiptPettyComponent,
    CashReceiptCustomerComponent,
    AddCashReceiptCustomerComponent,
    CashReceiptPettyCustomerComponent,
    AddCashReceiptPettyCustomerComponent,
    TableComponent,
    ActionButtonsComponent,
    AllEmployeesComponent,
    EditUserComponent,
    EditPurchaseOrderComponent,
    EditTaxComponent,
    EditReturnComponent,
    EditBankComponent,
    EditBankPettyComponent,
    EditCashComponent,
    EditCashPettyComponent,
    EditDeliveryComponent,
    SystemChoiceComponent,
    MainPageComponent,
    BillOfMaterialComponent,
    AddNewBillComponent,
    MainEmployeeDashboardComponent,
    InventoryDashboardComponent,
    AsjustmentsMainComponent,
    JournalVoucherComponent,
    CustomerAdjustmentComponent,
    ReportsMainComponent,
    AccountLedgerComponent,
    TrialBalanceComponent,
    PurchaseReportComponent,
    SaleReportComponent,
    SystemUsersComponent,
    AddCustomerDebitComponent,
    AddCustomerCreditComponent,
    CustomerAdjustmentCreditComponent,
    AddJournalVoucherComponent,
    EditJournalComponent,
    EditCustomerComponent,
    AllUsersComponent,
    EditAllUserComponent,
    DefineRolesComponent,
    EditSaleOrderComponent,
    EditBillComponent,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, EmployeeHomeComponent,],
  bootstrap: [AppComponent],
})
export class AppModule {}
