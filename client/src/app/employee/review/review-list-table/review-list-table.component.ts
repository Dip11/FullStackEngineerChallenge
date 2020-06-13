import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {QueryParamsModel} from "../../../models/query-param.model";
import {UserModel} from "../../../models/user.model";
import {AssignedEmployeeForReviewService} from "../../../services/assigned-employee-for-review.service";
import {MatDialog} from "@angular/material/dialog";
import {SubmitReviewComponent} from "../submit-review/submit-review.component";

@Component({
    selector: 'app-review-list-table',
    templateUrl: './review-list-table.component.html',
    styleUrls: ['./review-list-table.component.scss']
})
export class ReviewListTableComponent implements OnInit {
    dataSource = []

    searchText='';

    pageSize = 5;

    currentPage = 0;

    totalSize = 100;

    cols = [
        { key: "id", display: "Id" },
        { key: "firstName", display: "First Name" },
        { key: "lastName", display: "Last Name" },
        { key: "action", display: "Submit Review",
            config: { isAction: true, actions: [
                    {actionName:'submitReview', icon: 'grading', color: 'primary'},
                ] }}
    ];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    user: UserModel;
    constructor(
        public dialog: MatDialog,
        private assignedEmployeeForReviewService: AssignedEmployeeForReviewService
    ) { }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.getAllEmployeesToBeReviewed();
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
        this.getAllEmployeesToBeReviewed();
    }

    getAllEmployeesToBeReviewed(){
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
                    let assignedForEmployeeData = Object.assign('', item['assignedEmployeeData'])
                    assignedForEmployeeData.assignedEmployeeForReviewId = item.id;
                    d.push(assignedForEmployeeData)
                })
                this.dataSource = d;
                this.totalSize = response['totalCount'];
            }
        });
    }

    handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getAllEmployeesToBeReviewed();
    }

    onActionHandler(event) {
        if (event.action.actionName == 'submitReview'){
            const dialogRef = this.dialog.open(SubmitReviewComponent, {
                data: {
                    reviewed: event.element,
                    reviewedBy: this.user
                }, width: '800px'});
            dialogRef.afterClosed().subscribe(res => {

            });
        }
    }
}
