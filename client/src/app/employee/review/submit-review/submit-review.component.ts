import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PerformancePhraseService} from "../../../services/performance-phrase.service";
import {QueryParamsModel} from "../../../models/query-param.model";
import {UserModel} from "../../../models/user.model";
import {EmployeeToReview} from "../../../models/employee-to-review.model";
import {EmployeeToReviewService} from "../../../services/employee-to-review.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-submit-review',
    templateUrl: './submit-review.component.html',
    styleUrls: ['./submit-review.component.scss']
})
export class SubmitReviewComponent implements OnInit {
    customForm: FormGroup;
    performances: FormArray;
    reviewed: UserModel
    reviewedBy: UserModel
    dataSource: EmployeeToReview[] = []
    pageSize = 5;

    currentPage = 0;

    totalSize = 100;

    constructor(
        private dialogRef: MatDialogRef<SubmitReviewComponent>,
        private performancePhraseService: PerformancePhraseService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private employeeToReviewService: EmployeeToReviewService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.reviewed = this.data['reviewed'];
        this.reviewedBy = this.data['reviewedBy'];
        this.createForm([]);
        this.getAllPerformancePhrase();
    }

    createForm(data:any[]) {
        this.customForm = this.formBuilder.group({
            performances: this.formBuilder.array( this.dataSource.length>0? this.rebuildAddressesArray(data) : [this.createPeformanceForm()]),
        });
        this.performances = this.customForm.get('performances') as FormArray;
    }

    rebuildAddressesArray(data) {
        let d = [];
        data.forEach((value) => {
            let l = this.formBuilder.group({
                id: value['id'],
                reviewed: value['reviewed'],
                reviewedBy: value['reviewedBy'],
                details: value['details'],
                performancePhraseName: value['performancePhrase']['name'],
                performancePhraseId: value['performancePhraseId'],
            });
            d.push(l);
        });
        return d
    }

    createPeformanceForm(): FormGroup {
        return this.formBuilder.group({
            id: '',
            reviewed: '',
            reviewedBy: '',
            details: '',
            performancePhraseName: '',
            performancePhraseId: '',
        });
    }

    getAllPerformancePhrase(){
        const queryParams = new QueryParamsModel(
            this.filterConfiguration(),
            'asc',
            'id',
            0,
            1000
        );
        this.employeeToReviewService.getEmployeeToReviews(queryParams).subscribe((response)=>{
            if (response['response']){
                this.dataSource = response['response']
                this.totalSize = this.dataSource.length
                let data = this.dataSource.slice(this.currentPage*10, this.currentPage*10+this.pageSize)
                this.createForm(data);
            }
        })
    }

    filterConfiguration(): any {
        const filter: any = {};
        const searchText: string = '';
        filter.searchText = searchText;
        filter.reviewedBy = this.reviewedBy.id;
        filter.reviewed = this.reviewed.id;
        return filter;
    }

    addOrEdit(i){
        let newEmployeeToReview =  new EmployeeToReview();
        newEmployeeToReview.id = this.customForm.controls.performances.value[i].id;
        newEmployeeToReview.reviewed = this.customForm.controls.performances.value[i].reviewed;
        newEmployeeToReview.reviewedBy = this.customForm.controls.performances.value[i].reviewedBy;
        newEmployeeToReview.details = this.customForm.controls.performances.value[i].details;
        newEmployeeToReview.performancePhraseId = this.customForm.controls.performances.value[i].performancePhraseId;
        if (newEmployeeToReview.id){
            this.employeeToReviewService.editReview(newEmployeeToReview.id ,newEmployeeToReview).subscribe((response)=>{
            if (response){
                let message = "Review Edited";
                this._snackBar.open(message, 'OK', {
                    duration: 2000
                });
            }
            })
        } else {
            this.employeeToReviewService.addReview(newEmployeeToReview).subscribe((response)=>{
            let message = "Review Added";
                this._snackBar.open(message, 'OK', {
                    duration: 2000
                });
            })
        }
    }

    handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        let data = this.dataSource.slice(this.currentPage*this.pageSize, this.currentPage*this.pageSize +this.pageSize)
        this.createForm(data);
    }

}
