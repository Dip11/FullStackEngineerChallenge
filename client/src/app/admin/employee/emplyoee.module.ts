import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { EmployeeRoutingModule } from './employee-routing.module';
import {EmployeeTableComponent} from "./employee-table/employee-table.component";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReviewersListComponent } from './reviewers-list/reviewers-list.component';
import {AdminModule} from "../admin.module";
import { AddReviewerComponent } from './add-reviewer/add-reviewer.component';

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
    AdminModule,
  ],
  declarations: [
    EmployeeTableComponent,
    EmployeeEditComponent,
    ReviewersListComponent,
    AddReviewerComponent
  ],
  providers: [
  ],
  entryComponents: [
    EmployeeEditComponent,
    ReviewersListComponent,
    AddReviewerComponent

  ],
})
export class EmployeeModule {}
