import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardGateComponent } from './inward-gate.component';

describe('InwardGateComponent', () => {
  let component: InwardGateComponent;
  let fixture: ComponentFixture<InwardGateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardGateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
