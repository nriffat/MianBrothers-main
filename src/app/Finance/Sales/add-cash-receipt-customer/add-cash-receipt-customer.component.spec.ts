import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashReceiptCustomerComponent } from './add-cash-receipt-customer.component';

describe('AddCashReceiptCustomerComponent', () => {
  let component: AddCashReceiptCustomerComponent;
  let fixture: ComponentFixture<AddCashReceiptCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCashReceiptCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCashReceiptCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
