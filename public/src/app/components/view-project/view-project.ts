import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'view-project.html',
    providers: [ProjectService]
})
export class ViewProjectComponent implements OnInit {
    project: any;
    projectId: string;
    progress: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService) {

        route.params.subscribe(p => {
            
            
            this.projectId = p.id;
            if (!this.projectId) {
                console.log("typeof this.projectId = " + typeof this.projectId);
                router.navigate(['/portfolio']);
                return;
            }
        });
    }

    ngOnInit() {
        this.projectService.getProject(this.projectId)
            .subscribe(
            v => this.project = v,
            err => {
                if (err.status == 404) {
                    this.router.navigate(['/portfolio']);
                    return;
                }
            });
    }

    delete() {
        if (confirm("Are you sure?")) {
            this.projectService.delete(this.project.id)
                .subscribe(x => {
                    this.router.navigate(['/portfolio']);
                });
        }
    }
}
