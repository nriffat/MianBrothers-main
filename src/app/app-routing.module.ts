import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartOfAccountComponent } from './accounts/chart-of-account/chart-of-account.component';
import { ChooseAccountComponent } from './accounts/choose-account/choose-account.component';
import { ListAccountComponent } from './accounts/list-account/list-account.component';
import { MainAccountComponent } from './accounts/main-account/main-account.component';
import { SubAccountComponent } from './accounts/sub-account/sub-account.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { SystemChoiceComponent } from './auth/system-choice/system-choice.component';
import { AllEmployeesComponent } from './Employee/all-employees/all-employees.component';
import { EmployeeHomeComponent } from './Employee/main-page/employee-home/employee-home.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';
import { MainPageComponent } from './Employee/main-page/main-page.component';
import { AddBankPaymentComponent } from './Finance/add-bank-payment/add-bank-payment.component';
import { AddBankPettyComponent } from './Finance/add-bank-petty/add-bank-petty.component';
import { AddCashPaymentComponent } from './Finance/add-cash-payment/add-cash-payment.component';
import { AddCashPettyComponent } from './Finance/add-cash-petty/add-cash-petty.component';
import { AddNewItemComponent } from './Finance/add-new-item/add-new-item.component';
import { AddNonPurchaseSalesComponent } from './Finance/add-non-purchase-sales/add-non-purchase-sales.component';
import { AddPurchaseReturnComponent } from './Finance/add-purchase-return/add-purchase-return.component';
import { AddPurchaseSalesComponent } from './Finance/add-purchase-sales/add-purchase-sales.component';
import { AddPurchaseComponent } from './Finance/add-purchase/add-purchase.component';
import { AddVendorComponent } from './Finance/add-vendor/add-vendor.component';
import { BankPaymentComponent } from './Finance/bank-payment/bank-payment.component';
import { BankPettyComponent } from './Finance/bank-petty/bank-petty.component';
import { CashPaymentComponent } from './Finance/cash-payment/cash-payment.component';
import { CashPettyComponent } from './Finance/cash-petty/cash-petty.component';
import { DashboardComponent } from './Employee/main-page/dashboard/dashboard.component';
import { PurchaseNonTaxComponent } from './Finance/purchase-non-tax/purchase-non-tax.component';
import { PurchaseOrderComponent } from './Finance/purchase-order/purchase-order.component';
import { PurchaseReturnComponent } from './Finance/purchase-return/purchase-return.component';
import { PurchaseSalesTaxComponent } from './Finance/purchases/purchase-sales-tax/purchase-sales-tax.component';
import { PurchasesComponent } from './Finance/purchases/purchases.component';
import { AddBankCustomerReceiptComponent } from './Finance/Sales/add-bank-customer-receipt/add-bank-customer-receipt.component';
import { AddBankReceiptPettyComponent } from './Finance/Sales/add-bank-receipt-petty/add-bank-receipt-petty.component';
import { AddCashReceiptCustomerComponent } from './Finance/Sales/add-cash-receipt-customer/add-cash-receipt-customer.component';
import { AddCashReceiptPettyCustomerComponent } from './Finance/Sales/add-cash-receipt-petty-customer/add-cash-receipt-petty-customer.component';
import { AddCustomerComponent } from './Finance/Sales/add-customer/add-customer.component';
import { AddDeliveryChallanComponent } from './Finance/Sales/add-delivery-challan/add-delivery-challan.component';
import { AddSaleReturnsComponent } from './Finance/Sales/add-sale-returns/add-sale-returns.component';
import { AddSalesNonTaxInvoicesComponent } from './Finance/Sales/add-sales-non-tax-invoices/add-sales-non-tax-invoices.component';
import { AddSalesOrderComponent } from './Finance/Sales/add-sales-order/add-sales-order.component';
import { AddSalesTaxInvoicesComponent } from './Finance/Sales/add-sales-tax-invoices/add-sales-tax-invoices.component';
import { BankCustomerReceiptComponent } from './Finance/Sales/bank-customer-receipt/bank-customer-receipt.component';
import { BankReceiptPettyComponent } from './Finance/Sales/bank-receipt-petty/bank-receipt-petty.component';
import { CashReceiptCustomerComponent } from './Finance/Sales/cash-receipt-customer/cash-receipt-customer.component';
import { CashReceiptPettyCustomerComponent } from './Finance/Sales/cash-receipt-petty-customer/cash-receipt-petty-customer.component';
import { DeliveryChallanComponent } from './Finance/Sales/delivery-challan/delivery-challan.component';
import { SaleReturnComponent } from './Finance/Sales/sale-return/sale-return.component';
import { SalesNonTaxInvoicesComponent } from './Finance/Sales/sales-non-tax-invoices/sales-non-tax-invoices.component';
import { SalesOrderComponent } from './Finance/Sales/sales-order/sales-order.component';
import { SalesTaxInvoicesComponent } from './Finance/Sales/sales-tax-invoices/sales-tax-invoices.component';
import { SalesComponent } from './Finance/Sales/sales/sales.component';
import { GatePassComponent } from './Inventory/gate-pass/gate-pass.component';
import { AddInwardComponent } from './Inventory/gate-pass/inward-gate/add-inward/add-inward.component';
import { InwardGateComponent } from './Inventory/gate-pass/inward-gate/inward-gate.component';
import { AddOutwardComponent } from './Inventory/gate-pass/outward-gate/add-outward/add-outward.component';
import { OutwardGateComponent } from './Inventory/gate-pass/outward-gate/outward-gate.component';
import { InventoryBalanceComponent } from './Inventory/inventory-balance/inventory-balance.component';
import { EmployeeDeleteComponent } from './Employee/employee-delete/employee-delete.component';
import { BillOfMaterialComponent } from './Finance/bill-of-material/bill-of-material.component';
import { AddNewBillComponent } from './Finance/add-new-bill/add-new-bill.component';
import { EmployeeDashboardComponent } from './Employee/main-page/employee-dashboard/employee-dashboard.component';
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
import { AddJournalVoucherComponent } from './Adjustments/add-journal-voucher/add-journal-voucher.component';
import { AllUsersComponent } from './auth/all-users/all-users.component';
import { DefineRolesComponent } from './auth/define-roles/define-roles.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main-page',
    component: MainPageComponent,
  },

  {
    path: 'inventory-dashboard',
    component: InventoryDashboardComponent,
    children: [
      { path: 'inventory-balance', component: InventoryBalanceComponent },
      { path: 'gate-pass', component: GatePassComponent },
      { path: 'inward', component: InwardGateComponent },
      { path: 'outward', component: OutwardGateComponent },
      { path: 'add-inward', component: AddInwardComponent },
      { path: 'add-outward', component: AddOutwardComponent },
      { path: 'bill-of-material', component: BillOfMaterialComponent },
      { path: 'add-new-bill', component: AddNewBillComponent },
    ],
  },
  {
    path: 'main-employee-dashboard',
    component: MainEmployeeDashboardComponent,
    children: [
      { path: 'employee-register', component: EmployeeRegisterComponent },
      { path: 'all-employees', component: AllEmployeesComponent },
    ],
  },
  {
    path: 'employee-home',
    component: EmployeeHomeComponent,
    children: [
      { path: 'finance-dashboard', component: DashboardComponent },
      { path: 'purchases', component: PurchasesComponent },
      { path: 'purchase-order', component: PurchaseOrderComponent },
      { path: 'purchase-sales-tax', component: PurchaseSalesTaxComponent },
      { path: 'purchase-non-sales', component: PurchaseNonTaxComponent },
      { path: 'bank-payment', component: BankPaymentComponent },
      { path: 'cash-payment', component: CashPaymentComponent },
      { path: 'purchase-return', component: PurchaseReturnComponent },
      {
        path: 'chart-of-account',
        component: ChartOfAccountComponent,
      },
      { path: 'sales', component: SalesComponent },
      { path: 'add-purchase-order', component: AddPurchaseComponent },
      { path: 'add-vendor', component: AddVendorComponent },
      { path: 'add-purchase-sales', component: AddPurchaseSalesComponent },
      { path: 'add-non-purchase', component: AddNonPurchaseSalesComponent },
      { path: 'add-new-item', component: AddNewItemComponent },
      { path: 'choose-account', component: ChooseAccountComponent },
      { path: 'main-account', component: MainAccountComponent },
      { path: 'sub-account', component: SubAccountComponent },
      { path: 'list-account', component: ListAccountComponent },
      { path: 'add-purchase-return', component: AddPurchaseReturnComponent },
      { path: 'add-bank-payment', component: AddBankPaymentComponent },
      { path: 'bank-petty', component: BankPettyComponent },
      { path: 'add-bank-petty', component: AddBankPettyComponent },
      { path: 'add-cash-payment', component: AddCashPaymentComponent },
      { path: 'cash-petty', component: CashPettyComponent },
      { path: 'add-cash-petty', component: AddCashPettyComponent },
      { path: 'sales-order', component: SalesOrderComponent },
      { path: 'add-sales-order', component: AddSalesOrderComponent },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: 'add-delivery-challan', component: AddDeliveryChallanComponent },
      { path: 'delivery-challan', component: DeliveryChallanComponent },
      { path: 'sales-tax-invoices', component: SalesTaxInvoicesComponent },
      {
        path: 'add-sales-tax-invoices',
        component: AddSalesTaxInvoicesComponent,
      },
      {
        path: 'sales-non-tax-invoices',
        component: SalesNonTaxInvoicesComponent,
      },
      {
        path: 'bank-customer-receipt',
        component: BankCustomerReceiptComponent,
      },
      {
        path: 'add-sales-non-tax-invoices',
        component: AddSalesNonTaxInvoicesComponent,
      },
      { path: 'sale-returns', component: SaleReturnComponent },
      { path: 'add-sale-returns', component: AddSaleReturnsComponent },
      {
        path: 'bank-customer-receipt',
        component: BankCustomerReceiptComponent,
      },
      {
        path: 'add-bank-customer-receipt',
        component: AddBankCustomerReceiptComponent,
      },
      { path: 'bank-receipt-petty', component: BankReceiptPettyComponent },
      {
        path: 'add-bank-receipt-petty',
        component: AddBankReceiptPettyComponent,
      },
      {
        path: 'cash-receipt-customer',
        component: CashReceiptCustomerComponent,
      },
      {
        path: 'add-cash-receipt-customer',
        component: AddCashReceiptCustomerComponent,
      },
      {
        path: 'cash-receipt-petty-customer',
        component: CashReceiptPettyCustomerComponent,
      },
      {
        path: 'add-cash-receipt-petty-customer',
        component: AddCashReceiptPettyCustomerComponent,
      },
      {
        path: 'adjustments',
        component: AsjustmentsMainComponent,
      },
      {
        path: 'journal-voucher',
        component: JournalVoucherComponent,
      },
      {
        path: 'customer-adjustment',
        component: CustomerAdjustmentComponent,
      },
      {
        path : 'add-customer-debit',
        component : AddCustomerDebitComponent
      },
      {
        path : 'add-customer-credit',
        component : AddCustomerCreditComponent
      },
      {
        path: 'add-journal-voucher',
        component : AddJournalVoucherComponent
      },
      { path: 'reports', component: ReportsMainComponent },
      { path: 'account-ledger', component: AccountLedgerComponent },
      { path: 'trial-balance', component: TrialBalanceComponent },
      { path: 'purchase-report', component: PurchaseReportComponent },
      { path: 'sale-report', component: SaleReportComponent },
    ],
  },
  { path: 'dashboard', component: EmployeeDashboardComponent },
  { path: 'finance-dashboard', component: DashboardComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'system-choice', component: SystemChoiceComponent },
  { path: 'system-users', component: SystemUsersComponent },
  { path: 'employee-delete', component: EmployeeDeleteComponent },
  { path: 'all-users',component: AllUsersComponent},
  {path : 'define',component:DefineRolesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
