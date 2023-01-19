import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankReceiptPettyComponent } from './bank-receipt-petty.component';

describe('BankReceiptPettyComponent', () => {
  let component: BankReceiptPettyComponent;
  let fixture: ComponentFixture<BankReceiptPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankReceiptPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankReceiptPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
