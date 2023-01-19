import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReturnComponent } from './edit-return.component';

describe('EditReturnComponent', () => {
  let component: EditReturnComponent;
  let fixture: ComponentFixture<EditReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
