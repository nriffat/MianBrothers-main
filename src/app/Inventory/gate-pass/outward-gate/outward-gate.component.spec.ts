import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardGateComponent } from './outward-gate.component';

describe('OutwardGateComponent', () => {
  let component: OutwardGateComponent;
  let fixture: ComponentFixture<OutwardGateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardGateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
