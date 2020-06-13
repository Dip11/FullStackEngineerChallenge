import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReviewListTableComponent} from "./review/review-list-table/review-list-table.component";
import {EmployeeTableComponent} from "../admin/employee/employee-table/employee-table.component";
import {PerformancePhraseTableComponent} from "../admin/performance-phrase/performance-phrase-table/performance-phrase-table.component";
import {childRoutes} from "./child-routes";
import {LayoutComponent} from "../admin/layout/layout.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ReviewListTableComponent
      },
      {
        path: 'reviews',
        component: ReviewListTableComponent
      },
      ...childRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
