import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UrlService {
    protected readonly hostURL = 'http://localhost:3000';

    get getHostURL(): string {
        return this.hostURL;
    }

    extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
