import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankPettyComponent } from './add-bank-petty.component';

describe('AddBankPettyComponent', () => {
  let component: AddBankPettyComponent;
  let fixture: ComponentFixture<AddBankPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBankPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
