import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../services/project.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/Observable/forkJoin';
import { Project } from "../../models/Project";

@Component({
    templateUrl: './project-form.component.html',
    providers: [ProjectService]
})
export class ProjectFormComponent implements OnInit {
    makes: any[];
    models: any[];
    features: any[];
    project: Project = {
        id: '',
        user: '',
        name: '',
        content: '',
        projectType: '',
        views: 0,
        image: {
            link: ''
        },
        images: []
    };

    constructor(
        //we use this to read route parameters
        private route: ActivatedRoute,
        //we this to navigate the user to a different page if they pass an invalid id
        private router: Router,
        private projectService: ProjectService) {
            console.log("contstr yay");
        route.params.subscribe(p => {
            console.log("json stringfy  p  = "+JSON.stringify(p, null, 4));
            this.project.id = p['id'] || ""; 
        });
    }
    
    ngOnInit() {
        
        if (this.project.id) {
            this.projectService.getProject(this.project.id)
            .subscribe(
                v => {
                    console.log("json stringfy  v  = "+JSON.stringify(v, null, 4));
                    this.setProject(v);
                // this.project = v
            },
            err => {
                if (err.status == 404) {
                    this.router.navigate(['/portfolio']);
                    return;
                }
            });
        }

    }

    private setProject(p: Project) {
        this.project.id = p.id;
        this.project.user = p.user;
        this.project.name = p.name;
        this.project.content = p.content;
        this.project.projectType = p.projectType;
        this.project.image.link = p.images[0].link;
    }

    submit() {        
        this.project.images.push(this.project.image);
        var result$ = (this.project.id) ? this.projectService.update(this.project) : this.projectService.create(this.project);
        result$.subscribe(project => {
            this.router.navigate(['/projects/', project._id])
        });
    }
}
