import { Component } from '@angular/core';
import { ProjectService } from './../../services/project.service';

@Component({
    moduleId: module.id,
    selector: 'search',
    templateUrl : 'search.component.html',
    providers: [ProjectService]
})

export class SearchComponent { 
    searchStr: string;
    searchResult: any = {};
    errorMsg: string;
    constructor(private projectService: ProjectService) {
        
    }

    searchProjects(){
        console.log(this.searchStr);
        if(this.searchStr) {
            this.projectService.searchProjects(this.searchStr)
            .subscribe(result => {
                this.searchResult = result;
            },
            error => {
                if(error._body === '"Token not found"') {
                    this.errorMsg = "Log eerst in s.v.p."
                }
            });
        } else {
            this.searchResult = [];
            this.searchStr = '';
        }
    }

    removeHTMLTags(content: string)
    {  
        if (content) {
            //Content without HTML tags
            content = content.replace(/<\/?[^>]+>/gi, "");
            //Content trimmed to 6 characters
            content = content.substring(0, Math.min(45));
            return content;
        }
    }

    shortenTitle(title: string)
    {  
        if(title.length > 54) {

            return title.substring(0, Math.min(53)) + "..." ;
        }
        return title;
    }
}
