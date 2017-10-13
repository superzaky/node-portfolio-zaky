import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ProjectService {
    private readonly vehiclesEndpoint = '/api/projects';
    private readonly vehiclesURL = 'http://localhost:3000/api/projects';

    constructor(private http: Http) { }

    getVehicles(filter) {
        return this.http.get(this.vehiclesURL + '?' + this.toQueryString(filter))
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
