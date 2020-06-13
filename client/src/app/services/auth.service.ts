import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {UserModel} from '../models/user.model';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpUtilsService} from "./http-utils.service";
import {AuthModel} from "../models/auth.model";
import {Router} from "@angular/router";

const OAUTH_TOKEN_URL = `${environment.pathToAPI}/oauth/token`;
const OAUTH_USER_INFO_URL = `${environment.pathToAPI}/oauth/user_info`;

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilsService,
        private router: Router
    ) {}

    login(email: string, password: string) {
    	console.log('AuthService.login!');
    	let formData: FormData = new FormData();
		formData.append('grant_type', 'password');
		formData.append('username', email);
		formData.append('password', password);
		formData.append('client_id', 'ui');
        return  this.http.post<AuthModel>(OAUTH_TOKEN_URL, formData).subscribe((authModel) =>{
            localStorage.setItem('token', authModel.access_token)
            console.log()
            return  this.getUserByToken()
        });
    }

    getUserByToken() {
    	console.log('AuthService.getUserByToken!');
        const userToken = localStorage.getItem('token');
        const headers = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': 'Bearer ' + userToken
		});
        this.http.get<UserModel>(OAUTH_USER_INFO_URL, { headers: headers }).subscribe((user) =>{
            if (user){
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('user', JSON.stringify(user));
                    if (user.role == 1){
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/employee']);
                    }
            }
        });
    }

}
