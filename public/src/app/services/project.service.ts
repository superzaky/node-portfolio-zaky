import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ProjectService {
    private readonly projectsEndpoint = '/api/projects';
    private readonly projectsURL = 'http://localhost:3000/api/projects';

    constructor(private http: Http) { }

    getProjects(filter) {
        console.log("de url = " + this.projectsURL + '?' + this.toQueryString(filter));
        return this.http.get(this.projectsURL + '?' + this.toQueryString(filter))
            .map(res => res.json());
    }

    getProject(id) {
        return this.http.get(this.projectsURL + '/' + id)
        .map(res => this.extractData(res));
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    delete(id) {
        return this.http.delete(this.projectsEndpoint + '/' + id)
            .map(res => res.json());
    }

    toQueryString(obj) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
        }

        return parts.join('&');
    }
}
