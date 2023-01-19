import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import Header from '../utils/headers';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient, public header: Header,private _snackbar : MatSnackBar) { }

  getAllEmployees() {
    return this.http.get<any>('http://43.205.120.176:3000/employees/search')
  }

  deleteEmployee(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.patch<any>('http://43.205.120.176:3000/employees/delete' + '/' + id, { undefined },
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
  deleteUser(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.patch<any>('http://43.205.120.176:3000/users/delete' + '/' + id, { undefined },
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

  addEmployee(obj:any){

    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.post<any>('http://43.205.120.176:3000/employees/add',obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          // Debugger
          console.log(data)
          this._snackbar.open(data.message,' ',{duration: 5 * 1000});

          // Hurrah Baby
          resolve(data.data)
        })
        .catch((err) => {
          // Rejection Baby
          this._snackbar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err)
        })
    })
  }


  editEmployee(obj:any,id:any){
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(this.http.patch<any>(`http://43.205.120.176:3000/employees/update/${id}`,obj,
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions()))
        .then((data: any) => {
          console.log("headers",this.header.getRequestOptions());
          // Debugger
          console.log(data)
          // Hurrah Baby
          resolve(data.data)
        })

        .catch((err) => {
          // Rejection Baby
          reject(err)
        })
    })
  }
  getAllListOfEmployees(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search')
  }
  getAllListOfCustomersAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_customer_type_accounts')
  }
  getAllListOfVendorAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_vendor_type_accounts')
  }
  getAllCustomerAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_customer_accounts')
  }
  getAllVendorAccounts(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/list_of_accounts/search_vendor_accounts')
  }

}
