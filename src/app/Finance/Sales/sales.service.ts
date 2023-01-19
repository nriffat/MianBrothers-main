import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Header from 'src/app/utils/headers';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, public header: Header) { }

  getSalesOrders(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_orders/search_purchases')
  }

  getDeliveryChallan(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/delivery_challans/search')
  }
  getDeliveryChallanByOrderId(id:any){
    return this.http.get<any>(`http://43.205.120.176:3000/finance/delivery_challans/search_by_order/${id}`)
  }
  getUngenerated(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_orders/search_non_generated_sales')
  }

  getAllSalesSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_sales/search_sales')
  }

  getAllSalesTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_orders/search_sales_table')
  }
  getAllSales(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_orders/search_sales')
  }

  getAllSalesTaxTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_sales/search_sales_tax')
  }
  getAllSalesNonTaxTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_sales/search_sales_nonTax')
  }

  getSalesReturnTable(){
    return this.http.get<any>('http://43.205.120.176:3000/finance/purchase_sale_returns/search_sales')
  }

  getSalesOrdersById(id:any){
    return this.http.get<any>(`http://43.205.120.176:3000/finance/purchase_sale_orders/search_sale/${id}`)
  }
  getSalesReturnById(id:any){
    return this.http.get<any>(`http://43.205.120.176:3000/finance/purchase_sale_returns/search_sale/${id}`)
  }

  getCustomersById(id:any){
    return this.http.get<any>(`http://43.205.120.176:3000/finance/customers/search/${id}`)
  }
}
