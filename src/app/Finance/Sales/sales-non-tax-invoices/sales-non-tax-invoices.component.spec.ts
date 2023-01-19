import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesNonTaxInvoicesComponent } from './sales-non-tax-invoices.component';

describe('SalesNonTaxInvoicesComponent', () => {
  let component: SalesNonTaxInvoicesComponent;
  let fixture: ComponentFixture<SalesNonTaxInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesNonTaxInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesNonTaxInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
