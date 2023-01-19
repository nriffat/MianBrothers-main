import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.css']
})
export class SystemUsersComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  routeToRegister() {
    this.router.navigate(['/register']);
  }
}
