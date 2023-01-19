import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashReceiptPettyCustomerComponent } from './add-cash-receipt-petty-customer.component';

describe('AddCashReceiptPettyCustomerComponent', () => {
  let component: AddCashReceiptPettyCustomerComponent;
  let fixture: ComponentFixture<AddCashReceiptPettyCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCashReceiptPettyCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCashReceiptPettyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
