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
import {AdminModule} from "../admin.module";
import {PerformancePhraseTableComponent} from "./performance-phrase-table/performance-phrase-table.component";
import {PerformancePhraseService} from "../../services/performance-phrase.service";
import { PerformancePhraseEditComponent } from './performance-phrase-edit/performance-phrase-edit.component';
import {MatSnackBar} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    CommonModule,
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
    PerformancePhraseTableComponent,
    PerformancePhraseEditComponent,
  ],
  providers: [
  ],
  entryComponents: [
      PerformancePhraseEditComponent
  ],
})
export class PerformancePhraseModule {}
