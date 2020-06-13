import { Component, OnInit } from '@angular/core';
import { childRoutes as adminRoutes }  from '../../child-routes';
import {childRoutes as employeeRoutes} from "../../../employee/child-routes";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showMenu = false;
  routes: any;
  constructor() {}
  user: UserModel
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.user = user;
    this.routes = user.role == 1 ? adminRoutes : employeeRoutes ;
  }
}
