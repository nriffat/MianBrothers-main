import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsjustmentsMainComponent } from './asjustments-main.component';

describe('AsjustmentsMainComponent', () => {
  let component: AsjustmentsMainComponent;
  let fixture: ComponentFixture<AsjustmentsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsjustmentsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsjustmentsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
