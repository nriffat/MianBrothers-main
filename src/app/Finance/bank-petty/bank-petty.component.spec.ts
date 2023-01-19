import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankPettyComponent } from './bank-petty.component';

describe('BankPettyComponent', () => {
  let component: BankPettyComponent;
  let fixture: ComponentFixture<BankPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
