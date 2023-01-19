import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAdjustmentCreditComponent } from './customer-adjustment-credit.component';

describe('CustomerAdjustmentCreditComponent', () => {
  let component: CustomerAdjustmentCreditComponent;
  let fixture: ComponentFixture<CustomerAdjustmentCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAdjustmentCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAdjustmentCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
