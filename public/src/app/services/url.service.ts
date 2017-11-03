import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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

    // protected helper methods
    protected addJwt(headers?: Headers): Headers { //<--- :Headers is een function type en het geeft aan dat hij een Headers variabel gaat returnen.
        // add authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            headers.append('Authorization', 'Bearer ' + currentUser.token);
        }

        return headers;
    }
}
