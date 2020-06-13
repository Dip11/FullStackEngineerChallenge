import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {QueryParamsModel} from "../../../models/query-param.model";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeEditComponent} from "../employee-edit/employee-edit.component";
import {ReviewersListComponent} from "../reviewers-list/reviewers-list.component";
import {AssignedEmployeeForReviewService} from "../../../services/assigned-employee-for-review.service";
import {AddReviewerComponent} from "../add-reviewer/add-reviewer.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from 'sweetalert2'


@Component({
    selector: 'app-employee-table',
    templateUrl: './employee-table.component.html',
    styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
    displayedColumns = [ 'id', 'firstName', 'lastName', 'email', 'addReviewer', 'listReviewers', 'edit', 'delete'];
    dataSource: UserModel[] = []
    searchText=''
    pageSize = 5;

    currentPage = 0;

    totalSize = 100;


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        private  userService: UserService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.getAllEmployees();
    }

    ngAfterViewInit() {
    }

    applyFilter(filterValue: string) {
        this.searchText = filterValue
        this.getAllEmployees();
    }

    getAllEmployees(){
        const queryParams = new QueryParamsModel(
            this.filterConfiguration(),
            this.sort.direction,
            this.sort.active,
            this.currentPage,
            this.pageSize
        );
        this.userService.getUsers(queryParams).subscribe((res)=>{
            this.dataSource = res['response'];
            this.totalSize = res['totalCount'];
        });
    }

    filterConfiguration(): any {
        const filter: any = {};
        const searchText: string = this.searchText;
        filter.searchText = searchText;
        filter.role = 2;
        return filter;
    }

    deleteEmployee(row){
        Swal.fire({
            title: 'Do you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                this.userService.deleteEmployee(row.id).subscribe((res)=>{
                    if (res){
                        Swal.fire(
                            'Deleted!',
                            'Employee has been deleted.',
                            'success'
                        )
                        this.getAllEmployees();
                    }
                })
            }
        })
    }

    editEmployee(row){
        const dialogRef = this.dialog.open(EmployeeEditComponent, {data: row, width: '440px'});
        dialogRef.afterClosed().subscribe(res => {
            if (res){
                this.getAllEmployees();
                let message = "User Edited";
                this._snackBar.open(message, 'OK', {
                    duration: 2000
                });
            }
        });

    }

    addNewEmployee(){
        const dialogRef = this.dialog.open(EmployeeEditComponent, {width: '440px'});
        dialogRef.afterClosed().subscribe(res => {
            if (res){
                this.getAllEmployees();
                let message = "New User Added";
                this._snackBar.open(message, 'OK', {
                    duration: 2000
                });
            }
        });

    }
    listReviewers(row){
        const dialogRef = this.dialog.open(ReviewersListComponent, {data: row, width: '800px'});
        dialogRef.afterClosed().subscribe(res => {
        });
    }

    addReviewer(row){
        const dialogRef = this.dialog.open(AddReviewerComponent, {data: row,width: '440px'});
        dialogRef.afterClosed().subscribe(res => {
            if (res){
                let message = row.firstName + " " + row.lastName;
                this._snackBar.open(message, 'Added', {
                    duration: 2000,
                });
            }
        });

    }

    handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getAllEmployees();
    }

}
