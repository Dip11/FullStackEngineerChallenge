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
import { ReviewListTableComponent } from './review/review-list-table/review-list-table.component';
import {LayoutComponent} from "../admin/layout/layout.component";
import {TopNavComponent} from "../admin/layout/top-nav/top-nav.component";
import {SideNavComponent} from "../admin/layout/side-nav/side-nav.component";
import {AdminRoutingModule} from "../admin/admin-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {ReusableTableComponent} from "../admin/employee/reusable-table/reusable-table.component";
import {EmployeeRoutingModule} from "./employee-routing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminModule} from "../admin/admin.module";
import {ReviewModule} from "./review/review.module";

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    MatFormFieldModule,
    ReviewModule
  ],
  exports: [
  ],
  declarations: []
  ,
  providers: [
    MatSnackBar
  ],
  entryComponents: [
  ],
})
export class EmployeeModule {}
