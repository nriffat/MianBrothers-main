import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineRolesComponent } from './define-roles.component';

describe('DefineRolesComponent', () => {
  let component: DefineRolesComponent;
  let fixture: ComponentFixture<DefineRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
