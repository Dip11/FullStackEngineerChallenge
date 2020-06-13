import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeTableComponent} from "./employee-table/employee-table.component";

const routes: Routes = [
  {
    pathMatch: '',
    component: EmployeeTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
