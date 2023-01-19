import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInwardComponent } from './add-inward.component';

describe('AddInwardComponent', () => {
  let component: AddInwardComponent;
  let fixture: ComponentFixture<AddInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
