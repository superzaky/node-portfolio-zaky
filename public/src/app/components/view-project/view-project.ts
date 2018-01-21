import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    templateUrl: 'view-project.html',
    providers: [ProjectService]
})
export class ViewProjectComponent implements OnInit {
    project: any;
    projectId: string;
    progress: any;
    currentUser: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            route.params.subscribe(p => {
                this.projectId = p.id;
                if (!this.projectId) {
                    console.log("typeof this.projectId = " + typeof this.projectId);
                    router.navigate(['/portfolio']);
                    return;
                }
            });

            router.events.subscribe((evt) => {
                if (!(evt instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0)
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
            this.projectService.delete(this.project._id)
                .subscribe(x => {
                    this.router.navigate(['/portfolio']);
                });
        }
    }
}
