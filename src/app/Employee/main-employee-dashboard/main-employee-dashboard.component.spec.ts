import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmployeeDashboardComponent } from './main-employee-dashboard.component';

describe('MainEmployeeDashboardComponent', () => {
  let component: MainEmployeeDashboardComponent;
  let fixture: ComponentFixture<MainEmployeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEmployeeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEmployeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  
});

