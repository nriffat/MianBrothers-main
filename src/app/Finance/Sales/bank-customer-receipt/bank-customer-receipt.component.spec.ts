import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCustomerReceiptComponent } from './bank-customer-receipt.component';

describe('BankCustomerReceiptComponent', () => {
  let component: BankCustomerReceiptComponent;
  let fixture: ComponentFixture<BankCustomerReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankCustomerReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCustomerReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
