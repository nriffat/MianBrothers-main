import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReceiptPettyCustomerComponent } from './cash-receipt-petty-customer.component';

describe('CashReceiptPettyCustomerComponent', () => {
  let component: CashReceiptPettyCustomerComponent;
  let fixture: ComponentFixture<CashReceiptPettyCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashReceiptPettyCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashReceiptPettyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
