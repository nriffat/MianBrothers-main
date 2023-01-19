import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { EditAllUserComponent } from '../edit-all-user/edit-all-user.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  allUsers: any;
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
    private _accountService: AccountsService,
    public dialog: MatDialog,
    public _employeeService: EmployeeService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._accountService.getAllUsers().then((res: any) => {
      console.log(res);
      this.allUsers = res.payload;
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.paginator = this.paginator;
    });
  }

  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._employeeService.deleteUser(this.allUsers[index].id).then(
        (deletedEmp: any) => {
          console.log('deletedEmp' + deletedEmp);
          window.location.reload();
        },
        (err: any) => {
        }
      );
      console.log('deleteUser', this.allUsers[index].id);
    }
    else {
      alert('You pressed cancel');
    }

  }


  // confirmation(index: any) 
  // {
  //   var text = "Are you sure to delete?";
  //   if (confirm(text) == true) {
  //       this._employeeService.deleteUser(this.allUsers[index].id).then(
  //         (deletedEmp: any) => {
  //           console.log('deletedEmp' + deletedEmp);
  //           window.location.reload();
  //         },
  //         (err: any) => {
  //         }
  //       );
  //       console.log('deleteUser', this.allUsers[index].id);
  //     }
  //   }
  // }

  onEdit(index: any) {
    this.dialog.open(EditAllUserComponent, {
      data: {
        userData: this.allUsers[index],
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
