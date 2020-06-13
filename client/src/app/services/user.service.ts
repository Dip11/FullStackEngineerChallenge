import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {UserModel} from '../models/user.model';
import {environment} from '../../environments/environment';
import {HttpUtilsService} from "./http-utils.service";
import {Router} from "@angular/router";
import {QueryParamsModel} from "../models/query-param.model";

const USER_URL = `${environment.pathToAPI}/api/v1/users`;

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilsService,
        private router: Router
    ) {}


    getUsers(queryParams:QueryParamsModel) {
    	console.log('UserService.getUsers!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(USER_URL+'/find-filtered',queryParams, { headers: headers });
    }

    deleteEmployee(user_id:number) {
    	console.log('UserService.deleteUser!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.delete(USER_URL+'/'+user_id, { headers: headers });
    }

    editEmployee(user_id:number, user:UserModel) {
    	console.log('UserService.editUser!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.put(USER_URL+'/'+user_id, user,{ headers: headers });
    }

    createEmployee(user:UserModel) {
    	console.log('UserService.createUser!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(USER_URL, user,{ headers: headers });
    }


}
