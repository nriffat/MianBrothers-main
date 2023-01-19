import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Header from '../utils/headers';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, public header: Header,private _snackBar: MatSnackBar) {}

  getAccountLedger(id: any,from:any,to:any) {
    // return this.http.get<any>(
    //   `http://43.205.120.176:3000/finance/account_ledger/search/${id}?dateStart=${from}&dateEnd=${to}`
    // );

    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`http://43.205.120.176:3000/finance/account_ledger/search/${id}?dateStart=${from}&dateEnd=${to}`,
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
  getTwoColumn(id: any,from:any,to:any) {
    // return this.http.get<any>(
    //   `http://43.205.120.176:3000/finance/account_ledger/search/${id}?dateStart=${from}&dateEnd=${to}`
    // );

    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`http://43.205.120.176:3000/finance/trial_balance/search/${id}?dateStart=${from}&dateEnd=${to}`,
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

  updateRolls(id: any,obj:any) {

    return new Promise<any>((resolve, reject) => {
      this.http.patch<any>(`http://43.205.120.176:3000/roles/update/${id}`,obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
        .then((data: any) => {
          // Debugger
          this._snackBar.open(data.message);

          console.log(data)
          // Hurrah Baby
          resolve(data)
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error);

          reject(err)
        })
    })
  }
  getSixColumn(id: any,from:any,to:any) {
    // return this.http.get<any>(
    //   `http://43.205.120.176:3000/finance/account_ledger/search/${id}?dateStart=${from}&dateEnd=${to}`
    // );

    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`http://43.205.120.176:3000/finance/trial_balance/search_6c/${id}?dateStart=${from}&dateEnd=${to}`,
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

  getPurchaseReportAging(){
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`http://43.205.120.176:3000/finance/reports/search_payable`,
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

  getAllOrders(){
    return this.http.get<any>(
      'http://43.205.120.176:3000/inventory/orders/search'
    )
  }

  getUsageOrdersByOrdersId(id:any){
    return this.http.get<any>(
      `http://43.205.120.176:3000/inventory/orders_usage/search_by_order/${id}`
    );
  }
  getOrdersById(id:any){
    return this.http.get<any>(
      `http://43.205.120.176:3000/inventory/orders/search/${id}`
    );
  }
  getAllFinishedProducts(){
    return this.http.get<any>(
      'http://43.205.120.176:3000/inventory/products/search_finished'
    )
  }
  getAllRawProducts(){
    return this.http.get<any>(
      'http://43.205.120.176:3000/inventory/products/search_raw'
    )
  }

  getSaleReportAging(){
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`http://43.205.120.176:3000/finance/reports/search_receivable`,
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
  addNewItem(obj: any) {
    // return this.http.post<any>('http://localhost:3000/inventory/products/add',obj)
    console.log('token', this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(
          'http://43.205.120.176:3000/inventory/products/add',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          // Debugger
          console.log(data);

          this._snackBar.open(data.message,' ',{duration: 5 * 1000});
          // Hurrah Baby
          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  addBillOfMaterial(obj: any) {
    // return this.http.post<any>('http://localhost:3000/inventory/products/add',obj)
    console.log('token', this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(
          'http://43.205.120.176:3000/inventory/orders/add',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          // Debugger
          console.log(data);
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          // Hurrah Baby
          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
}
