import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReceiptCustomerComponent } from './cash-receipt-customer.component';

describe('CashReceiptCustomerComponent', () => {
  let component: CashReceiptCustomerComponent;
  let fixture: ComponentFixture<CashReceiptCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashReceiptCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashReceiptCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
