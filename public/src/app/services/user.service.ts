import { UrlService } from './url.service';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable }     from  'rxjs/Rx';;
import { User } from '../models/user';
//import { config } from '../config/config'; VERWIJDER DEZE REGEL

@Injectable()
export class UserService extends UrlService {
    private url: string = 'http://localhost:3000/';

    constructor(private _http: Http) {
        super();
    }

    login(user: User) {
        let data = { "username": user.username, "password": user.password };
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        //Onderstaande regel kan je het beste debuggen als je de output wilt zien, omdat
        //de console na de post request geleegd wordt. Drm kan je de onderstaande output in een
        //fractie van een seconde pas zien..
        console.log("hostl " + this.hostURL+'/api/auth/login');
        return this._http.post(this.hostURL + '/api/auth/login', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    logout(user: User) {
        let data = { "logout": user.logout };
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this._http.post(this.hostURL + '/api/auth/login', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getSession() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        options.body = '';

        return this._http.get(this.hostURL+'/api/auth/', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    private handleError(error: any) {
        //the Observable catches and throws an error
        return Observable.throw(error.message || error);
    }
}
