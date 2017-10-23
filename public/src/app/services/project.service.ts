import { UrlService } from './url.service';
import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ProjectService extends UrlService {
    private readonly projectsEndpoint = this.hostURL + '/api/projects';

    constructor(private http: Http) { 
        super();
    }

    create(project) {
        return this.http.post(this.projectsEndpoint, project)
            .map(res => res.json());
    }

    update(project: Project) {
        return this.http.put(this.projectsEndpoint, project)
            .map(res => res.json());
    }

    getProjects(filter) {
        return this.http.get(this.projectsEndpoint + '?' + this.toQueryString(filter))
        .map(res => res.json());
    }
    
    getProject(id) {
        return this.http.get(this.projectsEndpoint + '/' + id)
        .map(res => this.extractData(res));
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
