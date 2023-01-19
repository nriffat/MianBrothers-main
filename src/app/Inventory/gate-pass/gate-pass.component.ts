import { Component, OnInit } from '@angular/core';
import { EmployeeHomeComponent } from 'src/app/Employee/main-page/employee-home/employee-home.component';

@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.css']
})
export class GatePassComponent implements OnInit {
  constructor(public financeDashboard : EmployeeHomeComponent) {
  }

  ngOnInit(): void {
  }

}
