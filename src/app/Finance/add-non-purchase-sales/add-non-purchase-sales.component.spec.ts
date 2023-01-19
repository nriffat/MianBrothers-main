import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNonPurchaseSalesComponent } from './add-non-purchase-sales.component';

describe('AddNonPurchaseSalesComponent', () => {
  let component: AddNonPurchaseSalesComponent;
  let fixture: ComponentFixture<AddNonPurchaseSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNonPurchaseSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNonPurchaseSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
