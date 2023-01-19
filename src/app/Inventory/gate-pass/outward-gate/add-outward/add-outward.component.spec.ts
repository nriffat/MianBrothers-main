import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutwardComponent } from './add-outward.component';

describe('AddOutwardComponent', () => {
  let component: AddOutwardComponent;
  let fixture: ComponentFixture<AddOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
