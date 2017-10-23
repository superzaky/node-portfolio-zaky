import { ProjectService } from './../../services/project.service';
import { Component } from '@angular/core';

@Component({
    templateUrl : 'portfolio.component.html',
    providers: [ProjectService]
})

export class PortfolioComponent { 
    private readonly PAGE_SIZE = 9;
    
    queryResult: any = {};
    query: any = {
        pageSize: this.PAGE_SIZE
    };

    constructor(private projectService: ProjectService) {
        
    }

    ngOnInit() {
        this.populateProjects();
    }

    private populateProjects() {
        
        console.log("this.query json stringfy  = "+  JSON.stringify(this.query, null, 4));
        this.projectService.getProjects(this.query)
            
            .subscribe(result => {
                console.log("result json stringfy  = "+  JSON.stringify(result, null, 4));
                this.queryResult = result
            });
    }

    onPageChanged(page) {
        this.query.page = page;
        this.populateProjects();
    }
}