import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Header from '../utils/headers';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient, public header: Header,private _snackbar :MatSnackBar) { }

  getAllListOfAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search')
  }
  getAllUserAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_user_all_accounts')
  }
  getUserBankAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_user_bank_accounts')
  }
  getUserCashAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_user_cash_accounts')
  }
  getUserCustomerAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_customer_accounts')
  }
  getAccountOfOtherType(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_other_type_accounts')
  }

  getMainAccount(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/accounts/search')
  }

  getSubAccount(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/sub_accounts/search')
  }

  getSubBySearchId(index:any){
    return this.http.get<any>('http://43.205.120.176:3000/finance/sub_accounts/search_by_account/' + index)
  }

  getListBySearchId(index:any){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_by_sub_account/' + index)
  }

  getCustomerCode(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/customers/search')
  }

  getJournalVoucher(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/adjustments/search_vouchers')
  }
  getcustomerAdjustments(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/adjustments/search_customers')
  }
  addCustomer(obj:any){
    console.log("token",this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://43.205.120.176:3000/finance/customers/add',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
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
  getAllUsers(){
    console.log("token",this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>('http://43.205.120.176:3000/users/search',
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
        .then((data: any) => {
          // Debugger
          console.log(data)
          // Hurrah Baby
          resolve(data)
        })

        .catch((err) => {
          // Rejection Baby
          reject(err)
        })
    })
  }
  getRollsByUserId(id:any){
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`http://43.205.120.176:3000/roles/search/${id}`,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
        .then((data: any) => {
          // Debugger
          console.log(data)
          // Hurrah Baby
          resolve(data)
        })

        .catch((err) => {
          // Rejection Baby
          reject(err)
        })
    })
  }

  addMainAccount(obj:any){
    console.log("token",this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://43.205.120.176:3000/finance/accounts/add',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
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

  addSubAccount(obj:any){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://43.205.120.176:3000/finance/sub_accounts/add',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
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

  addListAccount(obj:any){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>('http://43.205.120.176:3000/finance/list_of_accounts/add',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
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
