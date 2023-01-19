import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseNonTaxComponent } from './purchase-non-tax.component';

describe('PurchaseNonTaxComponent', () => {
  let component: PurchaseNonTaxComponent;
  let fixture: ComponentFixture<PurchaseNonTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseNonTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseNonTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
