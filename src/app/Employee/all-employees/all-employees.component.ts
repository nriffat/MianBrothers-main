import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css'],
})
export class AllEmployeesComponent implements OnInit {
  allEmployees: any;
  displayedColumns: string[] = [
    'fullName',
    'username',
    'cnic',
    'department',
    'position',
    'action',
    'edit',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private _employeeService: EmployeeService,
    public dialog: MatDialog,
    public router : Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._employeeService.getAllEmployees().subscribe((data: any) => {
      this.allEmployees = data.payload;
      this.dataSource = new MatTableDataSource(this.allEmployees);
      this.dataSource.paginator = this.paginator;
      console.log('all employees', this.allEmployees);
    });
  }

  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._employeeService
      .deleteEmployee(this.allEmployees[index].id)
      .then((deletedEmp: any) => {
        console.log('deletedEmp' + deletedEmp);
        window.location.reload();
      },
      (err: any) => {
      });
    console.log('deleteUser', this.allEmployees[index].id);
    }
    else {
      alert('You pressed cancel');
    }

  }

  onEdit(index: any) {
    this.dialog.open(EditUserComponent, {
      data: {
        userData: this.allEmployees[index],
      },
    });
  }

  routeToAdd(){
    this.router.navigate(['main-employee-dashboard/employee-register']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
