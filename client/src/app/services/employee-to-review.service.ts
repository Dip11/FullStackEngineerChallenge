import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpUtilsService} from "./http-utils.service";
import {Router} from "@angular/router";
import {QueryParamsModel} from "../models/query-param.model";
import {EmployeeToReview} from "../models/employee-to-review.model";

const EMPLOYEE_TO_REVIEW_URL = `${environment.pathToAPI}/api/v1/employee_to_reviews`;

@Injectable()
export class EmployeeToReviewService {
    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilsService,
        private router: Router
    ) {}


    getEmployeeToReviews(queryParams:QueryParamsModel) {
    	console.log('EmployeeToReviewService.getEmployeeToReview!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(EMPLOYEE_TO_REVIEW_URL+'/find-filtered',queryParams, { headers: headers });
    }


    addReview(data:EmployeeToReview) {
    	console.log('EmployeeToReviewService.addEmployeeToReview!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(EMPLOYEE_TO_REVIEW_URL,data, { headers: headers });
    }

    editReview(id:number, data:EmployeeToReview) {
    	console.log('EmployeeToReviewService.editEmployeeToReview!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.put(EMPLOYEE_TO_REVIEW_URL+`/${id}`,data, { headers: headers });
    }
}
