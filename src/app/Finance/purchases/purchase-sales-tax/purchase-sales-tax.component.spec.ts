import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSalesTaxComponent } from './purchase-sales-tax.component';

describe('PurchaseSalesTaxComponent', () => {
  let component: PurchaseSalesTaxComponent;
  let fixture: ComponentFixture<PurchaseSalesTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseSalesTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseSalesTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
