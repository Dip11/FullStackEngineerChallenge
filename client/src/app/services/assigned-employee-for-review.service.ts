import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpUtilsService} from "./http-utils.service";
import {Router} from "@angular/router";
import {QueryParamsModel} from "../models/query-param.model";
import {AssignedEmployeeForReviewModel} from "../models/assigend-employee-for-review.model";

const ASSIGNED_EMPLOYEE_FOR_REVIEW_URL = `${environment.pathToAPI}/api/v1/assigned_employee_for_reviews`;
const USER_URL = `${environment.pathToAPI}/api/v1/users`;

@Injectable()
export class AssignedEmployeeForReviewService {
    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilsService,
        private router: Router
    ) {}


    getAssignedEmployeeForReviews(queryParams:QueryParamsModel) {
    	console.log('AssignedEmployeeForReviewService.getAssignedEmployeeForReviews!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(ASSIGNED_EMPLOYEE_FOR_REVIEW_URL+'/find-filtered',queryParams, { headers: headers });
    }

    getEmployeeToAssignAsReviewer(queryParams:QueryParamsModel) {
    	console.log('AssignedEmployeeForReviewService.getAssignedEmployeeForReviews!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(USER_URL+'/find-filtered',queryParams, { headers: headers });
    }

    addEmployeeForReviews(data:AssignedEmployeeForReviewModel) {
    	console.log('AssignedEmployeeForReviewService.getAssignedEmployeeForReviews!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(ASSIGNED_EMPLOYEE_FOR_REVIEW_URL,data, { headers: headers });
    }

    deleteAssignedEmployeeForReviews(id : number) {
    	console.log('AssignedEmployeeForReviewService.deleteAssignedEmployeeForReviews!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.delete(ASSIGNED_EMPLOYEE_FOR_REVIEW_URL + `/${id}`, { headers: headers });
    }

}
