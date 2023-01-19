import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesTaxInvoicesComponent } from './add-sales-tax-invoices.component';

describe('AddSalesTaxInvoicesComponent', () => {
  let component: AddSalesTaxInvoicesComponent;
  let fixture: ComponentFixture<AddSalesTaxInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesTaxInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesTaxInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
