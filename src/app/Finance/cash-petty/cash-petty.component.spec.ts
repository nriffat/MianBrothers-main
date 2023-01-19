import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPettyComponent } from './cash-petty.component';

describe('CashPettyComponent', () => {
  let component: CashPettyComponent;
  let fixture: ComponentFixture<CashPettyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashPettyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPettyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
