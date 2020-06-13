import {EmployeeTableComponent} from "../admin/employee/employee-table/employee-table.component";
import {ReviewListTableComponent} from "./review/review-list-table/review-list-table.component";

export const childRoutes = [
  {
    path: 'reviews',
        component: ReviewListTableComponent,
    data: { icon: 'bar_chart', text: 'Reviews' }
  },
];
