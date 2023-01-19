import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChallanComponent } from './delivery-challan.component';

describe('DeliveryChallanComponent', () => {
  let component: DeliveryChallanComponent;
  let fixture: ComponentFixture<DeliveryChallanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryChallanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
