import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Header from '../utils/headers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, public header: Header,private router:Router,private _snackBar:MatSnackBar) { }

  login(username:string,pass:string){
    return this.http.post<any>('http://43.205.120.176:3000/users/login',{ username, pass }).subscribe(
      (res:any)=>{
      console.log("res",res)
      this._snackBar.open(res.message,' ',{duration: 5 * 1000});

      localStorage.setItem('user',res.payload);
      this.router.navigate(['/system-choice']);
    },
    (err:any)=>{
      this._snackBar.open(err.error.error,' ',{duration: 5 * 1000})
    })
  }

  logout(){
    localStorage.clear()
  }
  register(id:string,username:string,pass:string){
    console.log("token",this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http.patch<any>('http://43.205.120.176:3000/users/signup' + '/' + id,{ username, pass },
        // Header X_AUTH_TOKEN
        this.header.getRequestOptions())
        .toPromise()
        .then((data: any) => {
          // Debugger
          console.log(data)
          // Hurrah
          resolve(data)
          this._snackBar.open(data.message,' ',{duration: 5 * 1000})
        })

        .catch((err) => {
          // Rejection
      this._snackBar.open(err.error.error,' ',{duration: 5 * 1000})

          reject(err)
        })
    })
  }

  getEmployeesByCnic(){
    return this.http.get<any>('http://43.205.120.176:3000/employees/search_cnic');
  }

}
