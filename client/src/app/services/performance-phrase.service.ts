import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpUtilsService} from "./http-utils.service";
import {Router} from "@angular/router";
import {QueryParamsModel} from "../models/query-param.model";
import {PerformancePhraseModel} from "../models/performance-phrase.model";

const PERFORMANCE_PHRASE = `${environment.pathToAPI}/api/v1/performance_phrases`;

@Injectable()
export class PerformancePhraseService {
    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilsService,
    ) {}


    getAllPerformancePhrases(queryParams:QueryParamsModel) {
    	console.log('PerformancePhraseService.getAllPerformancePhrases!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(PERFORMANCE_PHRASE+'/find-filtered',queryParams, { headers: headers });
    }

    createPerformancePhrase(data:PerformancePhraseModel) {
    	console.log('PerformancePhraseService.getPerformancePhrase!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.post(PERFORMANCE_PHRASE,data, { headers: headers });
    }

    editPerformancePhrase(id: number,data:PerformancePhraseModel) {
    	console.log('PerformancePhraseService.getPerformancePhrase!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.put(PERFORMANCE_PHRASE+`/${id}`,data, { headers: headers });
    }

    deletePerformancePhrase(id : number) {
    	console.log('PerformancePhraseService.deletePerformancePhrase!');
        const headers = this.httpUtils.getHTTPHeaders();
        return this.http.delete(PERFORMANCE_PHRASE + `/${id}`, { headers: headers });
    }

}
