import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReusableTableComponent } from './employee/reusable-table/reusable-table.component';
import {MatSnackBar} from "@angular/material/snack-bar";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
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

    ],
    providers:[
          MatSnackBar,
        CommonModule,
        AdminRoutingModule,
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
    ],
    exports: [
        ReusableTableComponent,
        CommonModule,
        AdminRoutingModule,
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

    ],
    declarations: [LayoutComponent, TopNavComponent, SideNavComponent, ReusableTableComponent,]
})
export class AdminModule {}
