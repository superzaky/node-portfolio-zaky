import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class UserService {
    private loginUrl: string;

    constructor(private _http: Http) {

    }

    login(user: User) {
//        this.loginUrl = window.location.origin + "/api/auth/login"; 
        this.loginUrl = "http://localhost:3000/api/auth/login";
        let data = { "username": user.username, "password": user.password };
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.loginUrl, body, options)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    } 
}
