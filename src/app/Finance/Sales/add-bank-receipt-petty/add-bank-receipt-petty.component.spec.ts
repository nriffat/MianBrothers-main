import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankReceiptPettyComponent } from './add-bank-receipt-petty.component';

describe('AddBankReceiptPettyComponent', () => {
  let component: AddBankReceiptPettyComponent;
  let fixture: ComponentFixture<AddBankReceiptPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankReceiptPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBankReceiptPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
