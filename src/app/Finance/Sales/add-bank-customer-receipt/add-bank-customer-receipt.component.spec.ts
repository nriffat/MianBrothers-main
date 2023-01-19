import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankCustomerReceiptComponent } from './add-bank-customer-receipt.component';

describe('AddBankCustomerReceiptComponent', () => {
  let component: AddBankCustomerReceiptComponent;
  let fixture: ComponentFixture<AddBankCustomerReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankCustomerReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBankCustomerReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
