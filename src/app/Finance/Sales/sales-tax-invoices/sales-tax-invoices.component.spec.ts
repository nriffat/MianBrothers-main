import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxInvoicesComponent } from './sales-tax-invoices.component';

describe('SalesTaxInvoicesComponent', () => {
  let component: SalesTaxInvoicesComponent;
  let fixture: ComponentFixture<SalesTaxInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTaxInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTaxInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
