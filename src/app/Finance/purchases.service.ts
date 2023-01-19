import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import { firstValueFrom } from 'rxjs';
import Header from '../utils/headers';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(private http: HttpClient, public header: Header,private _snackBar :MatSnackBar) {}

  getAllProductsCode() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/inventory/products/search'
    );
  }

  getAllVendorCodes() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/vendors/search'
    );
  }

  getVendorById(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/vendors/search/${id}`
    );
  }
  getAllOrdersByItemCodes(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/purchase_sale_orders/search_codes/${id}`
    );
  }
  getPurchaseOrders() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/purchase_sale_orders/search_purchases'
    );
  }

  getPurchaseSales() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/purchase_sales/search'
    );
  }

  getAllPurchaseTable() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/purchase_sale_orders/search_purchases_table'
    );
  }

  getAllPurchaseSalesTaxTable() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/purchase_sale_sales/search_purchases_tax'
    );
  }
  getAllPurchaseSalesNonTaxTable() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/purchase_sale_sales/search_purchases_nonTax'
    );
  }

  getPurchaseReturnTable() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/purchase_sale_returns/search_purchases'
    );
  }
  getAlldeliveryChallan() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/finance/delivery_challans/search'
    );
  }
  getDeliveryChallanById(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/delivery_challans/search/${id}`
    );
  }
  getPurchaseSalesById(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/purchase_sale_sales/search_purchase/${id}`
    );
  }
  getSalesById(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/purchase_sale_sales/search_sale/${id}`
    );
  }
  getReturnsByOrderId(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/inventory/returns_inventory/search_by_return/${id}`
    );
  }
  getPurchaseReturnById(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/purchase_sale_returns/search_purchase/${id}`
    );
  }

  getInventoryBalance() {
    return this.http.get<any>(
      'http://43.205.120.176:3000/inventory/products/search'
    );
  }
  getProductHistory(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/inventory/products_history/search_by_order/${id}`
    );
  }
  AddPurchaseOrder(obj: any) {
    console.log('token', this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_orders/add',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
       .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  AddDeliveryChallan(obj: any) {
    console.log('token', this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(
          'http://43.205.120.176:3000/finance/delivery_challans/add',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
       .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  AddPurchaseSalesOrder(obj: any) {
    console.log('token', this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_orders/add_sale',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
       .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  AddPurchaseReturn(obj: any) {
    console.log('token', this.header.getRequestOptions());
    return new Promise<any>((resolve, reject) => {
      this.http
        .post<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_returns/add',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
       .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }

  addVendor(obj: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.post<any>(
          'http://43.205.120.176:3000/finance/vendors/add',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }

  addPurchaseSales(obj: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.post<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_sales/add_sale',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  addPurchase(obj: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.post<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_sales/add',
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }

  editPurchaseOrder(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_orders/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editOrder(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/inventory/orders/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editOrderUsage(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/inventory/orders_usage/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editProductHistory(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/inventory/products_history/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editSaleOrder(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_orders/update_sale/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editAllUser(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/users/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editJournalVoucher(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/adjustments/update_voucher/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editCustomer(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/adjustments/update_customer/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
      .then((data: any) => {
        console.log('headers', this.header.getRequestOptions());
        // Debugger
        console.log(data);
        // Hurrah Baby
        this._snackBar.open(data.message,' ',{duration: 5 * 1000});

        resolve(data.data);
      })

      .catch((err) => {
        // Rejection Baby
        this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

        reject(err);
      });
    });
  }
  editDeliveryChallan(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/delivery_challans/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editBankForm(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_payments/update_bank/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editBankPettyForm(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_payments/update_bank_petty/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editCashPettyForm(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_payments/update_cash_petty/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editCashForm(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_payments/update_cash/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editReturn(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_returns/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editReturnInventory(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/inventory/returns_inventory/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  editTax(obj: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      firstValueFrom(
        this.http.patch<any>(
          `http://43.205.120.176:3000/finance/purchase_sale_sales/update/${id}`,
          obj,
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
      )
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }

  getPurchaseOrdersById(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/purchase_sale_orders/search_purchase/${id}`
    );
  }

  getVendorsById(id: any) {
    return this.http.get<any>(
      `http://43.205.120.176:3000/finance/vendors/search/${id}`
    );
  }

  deletePurchseOrder(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_orders/delete' +
            '/' +
            id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  deletePurchseSales(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_sales/delete' +
            '/' +
            id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  deletePurchseReturn(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_returns/delete' +
            '/' +
            id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  deleteBankPayment(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/finance/purchase_sale_payments/delete' +
            '/' +
            id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  deleteAdjustments(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/finance/adjustments/delete' + '/' + id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  deleteDeliveryChallan(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/finance/delivery_challans/delete' +
            '/' +
            id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  deleteCustomers(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/finance/customers/delete' + '/' + id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

          resolve(data.data);
        })

        .catch((err) => {
          // Rejection Baby
          this._snackBar.open(err.error.error,' ',{duration: 5 * 1000});

          reject(err);
        });
    });
  }
  deleteBillOfMaterial(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .patch<any>(
          'http://43.205.120.176:3000/inventory/orders/delete' + '/' + id,
          { undefined },
          // Header X_AUTH_TOKEN
          this.header.getRequestOptions()
        )
        .toPromise()
        .then((data: any) => {
          console.log('headers', this.header.getRequestOptions());
          // Debugger
          console.log(data);
          // Hurrah Baby
          this._snackBar.open(data.message,' ',{duration: 5 * 1000});

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
