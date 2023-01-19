import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseSalesComponent } from './add-purchase-sales.component';

describe('AddPurchaseSalesComponent', () => {
  let component: AddPurchaseSalesComponent;
  let fixture: ComponentFixture<AddPurchaseSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchaseSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchaseSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
