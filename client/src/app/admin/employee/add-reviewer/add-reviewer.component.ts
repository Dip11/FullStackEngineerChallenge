import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AssignedEmployeeForReviewService} from "../../../services/assigned-employee-for-review.service";
import {QueryParamsModel} from "../../../models/query-param.model";
import {AssignedEmployeeForReviewModel} from "../../../models/assigend-employee-for-review.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-reviewer',
  templateUrl: './add-reviewer.component.html',
  styleUrls: ['./add-reviewer.component.scss']
})
export class AddReviewerComponent implements OnInit {

    cols = [
        { key: "id", display: "User Id" },
        { key: "firstName", display: "First Name" },
        { key: "lastName", display: "Last Name" },
        { key: "action", display: "Add",
            config: { isAction: true, actions: [{actionName:'add', icon: 'add', color: 'primary'}] }}
    ];
    searchText: string;

    dataSource = [];

    user:UserModel;

    title = "Add Reviewer";

    pageSize = 5;

    currentPage = 0;

    totalSize = 100;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        private dialogRef: MatDialogRef<AddReviewerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private assignedEmployeeForReviewService: AssignedEmployeeForReviewService,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.user = this.data
        this.getAllEmployeeToAddAsReviewer();
    }

    filterConfiguration(): any {
        const filter: any = {};
        const searchText: string = this.searchText;
        filter.searchText = searchText;
        filter.excludingUserId = this.user.id;
        filter.excludingAlreadyAddedEmployee = true;
        filter.role = 2;
        return filter;
    }

    applyFilter(filterValue: string) {
        this.searchText = filterValue
        this.getAllEmployeeToAddAsReviewer();
    }

    getAllEmployeeToAddAsReviewer(){
        const queryParams = new QueryParamsModel(
            this.filterConfiguration(),
            'asc' ,
            'id',
            this.currentPage,
            this.pageSize
        );
        this.assignedEmployeeForReviewService.getEmployeeToAssignAsReviewer(queryParams).subscribe((response)=>{
            if (response){
                this.dataSource = response['response']
                this.totalSize = response['totalCount'];
            }
        });
    }

    handlePage(e: any) {
        console.log(e.pageIndex)
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getAllEmployeeToAddAsReviewer();
    }

    onActionHandler(event) {
        if (event.action.actionName == 'add'){
            let assignedEmployeeForReview = new AssignedEmployeeForReviewModel()
            assignedEmployeeForReview.assignedForEmployee = this.user.id;
            assignedEmployeeForReview.assignedEmployee = event.element.id;
            this.assignedEmployeeForReviewService.addEmployeeForReviews(assignedEmployeeForReview).subscribe((response) =>{
                if (response){
                    this.getAllEmployeeToAddAsReviewer();
                    let message = "Employee Assigned";
                    this._snackBar.open(message, 'OK', {
                        duration: 2000
                    });
                }
            })
        }
    }
}
