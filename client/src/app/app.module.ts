import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {AuthService} from "./services/auth.service";
import {HttpUtilsService} from "./services/http-utils.service";
import {UserService} from "./services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeModule} from "./admin/employee/emplyoee.module";
import {AssignedEmployeeForReviewService} from "./services/assigned-employee-for-review.service";
import {PerformancePhraseService} from "./services/performance-phrase.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeToReviewService} from "./services/employee-to-review.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        SharedModule,

    ],
    providers: [
        AuthService,
        HttpUtilsService,
        UserService,
        AssignedEmployeeForReviewService,
        PerformancePhraseService,
        EmployeeToReviewService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
