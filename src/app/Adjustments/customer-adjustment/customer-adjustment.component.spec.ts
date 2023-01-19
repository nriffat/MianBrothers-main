import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAdjustmentComponent } from './customer-adjustment.component';

describe('CustomerAdjustmentComponent', () => {
  let component: CustomerAdjustmentComponent;
  let fixture: ComponentFixture<CustomerAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
