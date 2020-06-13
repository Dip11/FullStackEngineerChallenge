import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { childRoutes } from './child-routes';
import { EmployeeTableComponent } from './employee/employee-table/employee-table.component';
import {PerformancePhraseTableComponent} from "./performance-phrase/performance-phrase-table/performance-phrase-table.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: EmployeeTableComponent
      },
      {
        path: 'employee',
        component: EmployeeTableComponent
      },
      {
        path: 'performance-phrase',
        component: PerformancePhraseTableComponent
      },

      ...childRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
