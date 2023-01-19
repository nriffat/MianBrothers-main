import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBankPettyComponent } from './edit-bank-petty.component';

describe('EditBankPettyComponent', () => {
  let component: EditBankPettyComponent;
  let fixture: ComponentFixture<EditBankPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBankPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBankPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
