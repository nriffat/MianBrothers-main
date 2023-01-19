import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  userItems = [{
    "displayName" : "Dashboard",
    "routeName" : "finance-dashboard",
  }
]
  constructor(private route_: Router) { }

  ngOnInit(): void {
  }
  loadUserInformationComponent(componentName: string) {
    console.log(componentName)
    this.route_.navigate([
      `${componentName.toLowerCase()}`,
    ]);

  }
}
