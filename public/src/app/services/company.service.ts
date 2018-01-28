import { UrlService } from './url.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CompanyService extends UrlService {
    private readonly companiesEndpoint = this.hostURL + '/api/companies';

    constructor(private http: Http) { 
        super();
    }

    getCompanies() {
        let options = this.addJwt();
        options.body = '';

        return this.http.get(this.companiesEndpoint, options)
        .map(res => res.json());
    }
}
