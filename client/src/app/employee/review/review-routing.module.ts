import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReviewListTableComponent} from "./review-list-table/review-list-table.component";

const routes: Routes = [
  {
    pathMatch: '',
    component: ReviewListTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {}
