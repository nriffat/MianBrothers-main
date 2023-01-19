import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import Header from '../utils/headers';

@Injectable({
  providedIn: 'root'
})
export class BankPaymentService {

  constructor(private http: HttpClient, public header: Header,private _snackbar :MatSnackBar) { }

  getPurchaseSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_sales/search_purchases')
  }

  getSearchSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_sales/search_sales')
  }

  // Purchase
  getBankPaymentTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_bank_purchase')
  }
  getBankPettyTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_bank_petty_purchase')
  }

  //Purchase
  getCashPaymentTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_cash_purchase')
  }
  getCashPettyTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_cash_petty_purchase')
  }

  //Sales
  getBankPaymentTableSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_bank_sale')
  }
  getBankPettyTableSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_bank_petty_sale')
  }

  //Sales
  getCashPaymentTableSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_cash_sale')
  }
  getCashPettyTableSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/search_cash_petty_sale')
  }

  addBankPayment(obj:any){
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.post<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/add_bank',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackbar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackbar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    })
  }

  addCustomerAccount(obj:any){
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.post<any>('http://43.205.120.176:3000/finance/adjustments/add_customer',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackbar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackbar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    })
  }
  addCashPayment(obj:any){
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.post<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/add_cash',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackbar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackbar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    })
  }

  addBankPettyPayment(obj:any){
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.post<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/add_bank_petty',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackbar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackbar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    })
  }

  addJournalVoucherPayment(obj:any){
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.post<any>('http://43.205.120.176:3000/finance/adjustments/add_voucher',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackbar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackbar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    })
  }
  addCashPettyPayment(obj:any){
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.post<any>('http://43.205.120.176:3000/finance/purchase_sale_payments/add_cash_petty',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackbar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackbar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    })
  }

}
