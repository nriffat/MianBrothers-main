import { HttpHeaders } from '@angular/common/http'; import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' }) export default class Header {
  constructor() { }
  getRequestOptions() {
    let local= localStorage.getItem('user')
    console.log("local", local)
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': (`Bearer ${local}` )|| ""
      })
    };
  }
}
