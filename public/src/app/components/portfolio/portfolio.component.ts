import { ProjectService } from './../../services/project.service';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
    currentUser: any;
    searchStr: string;
    errorMsg: string;

    constructor(private projectService: ProjectService, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    searchProjects(){
        if(this.searchStr) {
            this.projectService.searchProjects(this.searchStr)
            .subscribe(result => {
                this.queryResult = result;
            },
            error => {
                if(error._body === '"Token not found"') {
                    this.errorMsg = "Log eerst in s.v.p."
                }
            });
        } else {
            this.populateProjects();
        }
    }

    ngOnInit() {
        this.populateProjects();
    }

    private populateProjects() {
        // console.log("this.query json stringfy  = "+  JSON.stringify(this.query, null, 4));
        this.projectService.getProjects(this.query)
            .subscribe(result => {
                // console.log("result json stringfy  = "+  JSON.stringify(result, null, 4));
                this.queryResult = result
            },
            error => {
                if(error._body === '"Token not found"') {
                    this.router.navigate(['/login']);
                    return;
                }
            });
    }

    onPageChanged(page) {
        this.query.page = page;
        this.populateProjects();
    }

    removeHTMLTags(content: string)
    {  
        if (content) {
            //Content without HTML tags
            content = content.replace(/<\/?[^>]+>/gi, "");
            //make your replace global with the /g modifier on a regex, otherwise it will only replace the first instance of &amp;
            content = content.replace(/&amp;/g, '&');
            //Content trimmed to 6 characters
            content = content.substring(0, Math.min(45));

            return content;
        }
    }

    shortenTitle(title: string)
    {  
        if(title.length > 24) {

            return title.substring(0, Math.min(23)) + "..." ;
        }

        return title;
    }
}
