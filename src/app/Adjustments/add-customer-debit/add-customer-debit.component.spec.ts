import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerDebitComponent } from './add-customer-debit.component';

describe('AddCustomerDebitComponent', () => {
  let component: AddCustomerDebitComponent;
  let fixture: ComponentFixture<AddCustomerDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerDebitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
