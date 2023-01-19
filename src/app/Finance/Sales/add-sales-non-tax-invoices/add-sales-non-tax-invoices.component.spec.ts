import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesNonTaxInvoicesComponent } from './add-sales-non-tax-invoices.component';

describe('AddSalesNonTaxInvoicesComponent', () => {
  let component: AddSalesNonTaxInvoicesComponent;
  let fixture: ComponentFixture<AddSalesNonTaxInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesNonTaxInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesNonTaxInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
