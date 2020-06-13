import {Injectable} from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class HttpUtilsService {

	getHTTPHeaders(): HttpHeaders {
		const userToken = localStorage.getItem('token');
		const result = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': 'Bearer ' + userToken
		});
		return result;
	}
}
