import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBillComponent } from './add-new-bill.component';

describe('AddNewBillComponent', () => {
  let component: AddNewBillComponent;
  let fixture: ComponentFixture<AddNewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
