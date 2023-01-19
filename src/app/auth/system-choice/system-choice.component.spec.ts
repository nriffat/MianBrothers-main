import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemChoiceComponent } from './system-choice.component';

describe('SystemChoiceComponent', () => {
  let component: SystemChoiceComponent;
  let fixture: ComponentFixture<SystemChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
