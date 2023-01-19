import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCashPettyComponent } from './edit-cash-petty.component';

describe('EditCashPettyComponent', () => {
  let component: EditCashPettyComponent;
  let fixture: ComponentFixture<EditCashPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCashPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCashPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
