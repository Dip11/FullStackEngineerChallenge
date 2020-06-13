import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReviewListTableComponent} from "./review-list-table/review-list-table.component";
import {EmployeeRoutingModule} from "../../admin/employee/employee-routing.module";
import {AdminModule} from "../../admin/admin.module";
import {EmployeeModule} from "../employee.module";
import {ReviewRoutingModule} from "./review-routing.module";
import { SubmitReviewComponent } from './submit-review/submit-review.component';
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        ReviewRoutingModule,
        AdminModule,
        PerfectScrollbarModule
    ],
  declarations: [
      ReviewListTableComponent,
      SubmitReviewComponent
  ],
  providers: [
  ],
  entryComponents: [
      SubmitReviewComponent
  ],
})
export class ReviewModule {}
