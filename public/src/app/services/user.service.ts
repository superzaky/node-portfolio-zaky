import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable }     from  'rxjs/Rx';;
import { User } from '../models/user';
//import { config } from '../config/config'; VERWIJDER DEZE REGEL

@Injectable()
export class UserService {
    private url: string = 'http://localhost:3000/';

    constructor(private _http: Http) {

    }

    login(user: User) {
        this.url = this.url+'api/auth/login';
        let data = { "username": user.username, "password": user.password };
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log("login url " + this.url);
        return this._http.post(this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    logout() {
        this.url = this.url+'api/auth/logout';
        console.log("session url " + this.url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.body = '';

        return this._http.get(this.url, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getSession() {
        this.url = this.url+'api/auth/';
        console.log("session url " + this.url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.body = '';

        return this._http.get(this.url, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    } 
    
    private handleError(error: any) {
        //the Observable catches and throws an error
        return Observable.throw(error.message || error);
    }
}
