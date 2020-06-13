import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserModel} from "../../../models/user.model";
import {AssignedEmployeeForReviewService} from "../../../services/assigned-employee-for-review.service";
import {QueryParamsModel} from "../../../models/query-param.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-reviewers-list',
    templateUrl: './reviewers-list.component.html',
    styleUrls: ['./reviewers-list.component.scss']
})
export class ReviewersListComponent implements OnInit {

    cols = [
        { key: "id", display: "User Id" },
        { key: "firstName", display: "First Name" },
        { key: "lastName", display: "Last Name" },
        { key: "action", display: "Action",
            config: { isAction: true, actions: [{actionName:'delete', icon: 'delete', color: 'warn'}] }}
    ];
    searchText: string;

    dataSource = [];

    user:UserModel;

    title = "Reviewers List";

    pageSize = 5;

    currentPage = 0;

    totalSize = 100;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        private dialogRef: MatDialogRef<ReviewersListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private assignedEmployeeForReviewService: AssignedEmployeeForReviewService,
        private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.user = this.data
        this.getAllReviewer();
    }

    filterConfiguration(): any {
        const filter: any = {};
        const searchText: string = this.searchText;
        filter.searchText = searchText;
        filter.assignedFor = this.user.id;
        return filter;
    }

    applyFilter(filterValue: string) {
        this.searchText = filterValue
        this.getAllReviewer();
    }

    getAllReviewer(){
        const queryParams = new QueryParamsModel(
            this.filterConfiguration(),
            'asc' ,
            'id',
            this.currentPage,
            this.pageSize
        );
        this.assignedEmployeeForReviewService.getAssignedEmployeeForReviews(queryParams).subscribe((response)=>{
            if (response){
                let d = []
                response['response'].forEach((item)=>{
                    let assignedEmployeeData = Object.assign('', item['assignedEmployeeData'])
                    assignedEmployeeData.assignedEmployeeForReviewId = item.id;
                    d.push(assignedEmployeeData)
                })
                this.dataSource = d;
                this.totalSize = response['totalCount'];
            }
        });
    }

    handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getAllReviewer();
    }

    onActionHandler(event) {
        console.log(event);
        if (event.action.actionName == 'delete'){
            let assignedEmployeeForReviewId = event.element['assignedEmployeeForReviewId']
            this.assignedEmployeeForReviewService.deleteAssignedEmployeeForReviews(assignedEmployeeForReviewId).subscribe((response) =>{
                if (response){
                    this.getAllReviewer();
                    let message = "Reviewer Deleted";
                    this._snackBar.open(message, 'OK', {
                        duration: 2000
                    });
                }
            })
        }
    }


}
