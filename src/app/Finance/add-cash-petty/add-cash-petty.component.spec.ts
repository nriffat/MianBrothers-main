import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashPettyComponent } from './add-cash-petty.component';

describe('AddCashPettyComponent', () => {
  let component: AddCashPettyComponent;
  let fixture: ComponentFixture<AddCashPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCashPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCashPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
