import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaleReturnsComponent } from './add-sale-returns.component';

describe('AddSaleReturnsComponent', () => {
  let component: AddSaleReturnsComponent;
  let fixture: ComponentFixture<AddSaleReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSaleReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSaleReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
