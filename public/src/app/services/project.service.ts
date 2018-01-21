import { UrlService } from './url.service';
import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ProjectService extends UrlService {
    private readonly projectsEndpoint = this.hostURL + '/api/projects';

    constructor(private http: Http) { 
        super();
    }

    create(project) {
        let options = this.addJwt();

        return this.http.post(this.projectsEndpoint, project, options)
            .map(res => res.json());
    }

    update(project: Project) {
        let options = this.addJwt();

        return this.http.put(this.projectsEndpoint, project, options)
            .map(res => res.json());
    }

    getProjects(filter) {
        let options = this.addJwt();
        options.body = '';

        return this.http.get(this.projectsEndpoint + '?' + this.toQueryString(filter), options)
        .map(res => res.json());
    }

    searchProjects(filter) {
        let options = this.addJwt();
        options.body = '';

        return this.http.get(this.projectsEndpoint + '?search=' + filter, options)
        .map(res => res.json());
    }
    
    getProject(id) {
        let options = this.addJwt();
        options.body = '';

        return this.http.get(this.projectsEndpoint + '/' + id, options)
        .map(res => this.extractData(res));
    }

    delete(id) {
        let options = this.addJwt();
        options.body = '';
        
        return this.http.delete(this.projectsEndpoint + '/' + id, options)
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
