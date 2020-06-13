import {Component, OnInit, ViewChild} from '@angular/core';
import {PerformancePhraseService} from "../../../services/performance-phrase.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {QueryParamsModel} from "../../../models/query-param.model";
import {PerformancePhraseEditComponent} from "../performance-phrase-edit/performance-phrase-edit.component";
import Swal from 'sweetalert2'
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-performance-phrase-table',
    templateUrl: './performance-phrase-table.component.html',
    styleUrls: ['./performance-phrase-table.component.scss']
})
export class PerformancePhraseTableComponent implements OnInit {
    dataSource = []
    searchText=''

    pageSize = 5;

    currentPage = 0;

    totalSize = 100;

    cols = [
        { key: "id", display: "Id" },
        { key: "name", display: "Name" },
        { key: "action", display: "Action",
            config: { isAction: true, actions: [
                    {actionName:'edit', icon: 'edit', color: 'primary'},
                    {actionName:'delete', icon: 'delete', color: 'warn'}
                ] }}
    ];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        private  performancePhraseService: PerformancePhraseService,
        public dialog: MatDialog,
        public _snackBar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.getAllPerformancePhrases();
    }

    applyFilter(filterValue: string) {
        this.searchText = filterValue
    }

    getAllPerformancePhrases(){
        const queryParams = new QueryParamsModel(
            this.filterConfiguration(),
            'asc',
            'id',
            this.currentPage,
            this.pageSize
        );
        this.performancePhraseService.getAllPerformancePhrases(queryParams).subscribe((res)=>{
            this.dataSource = res['response'];
            this.totalSize = res['totalCount'];
        });
    }

    filterConfiguration(): any {
        const filter: any = {};
        const searchText: string = this.searchText;
        filter.searchText = searchText;
        return filter;
    }

    editPerformancePhrase(row){
        const dialogRef = this.dialog.open(PerformancePhraseEditComponent, {data: row, width: '440px'});
        dialogRef.afterClosed().subscribe(res => {
            if (res){
                this.getAllPerformancePhrases();
                let message = "Performance Phrase Edited";
                this._snackBar.open(message, 'OK', {
                    duration: 2000
                });
            }
        });
    }

    addNewPerformancePhrase(){
        const dialogRef = this.dialog.open(PerformancePhraseEditComponent, {width: '440px'});
        dialogRef.afterClosed().subscribe(res => {
            if (res){
                this.getAllPerformancePhrases();
                let message = "Performance Phrase Added";
                this._snackBar.open(message, 'OK', {
                    duration: 2000
                });
            }
        });
    }

    handlePage(e: any) {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.getAllPerformancePhrases();
    }

    onActionHandler(event) {
        if (event.action.actionName == 'delete'){
            Swal.fire({
                title: 'Do you want to delete?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.value) {
                    this.performancePhraseService.deletePerformancePhrase(event.element.id).subscribe((response) =>{
                        if (response){
                            this.getAllPerformancePhrases();
                            let message = "Performance Phrase Deleted";
                            this._snackBar.open(message, 'OK', {
                                duration: 2000
                            });
                        }
                    })
                }
            })

        }
        else if(event.action.actionName == 'edit'){
            this.editPerformancePhrase(event.element)
        }
    }
}
