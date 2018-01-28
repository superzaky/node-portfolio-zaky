import {Component, HostListener, ViewChildren} from '@angular/core'
import { CompanyService } from './../../services/company.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cv',
    templateUrl : 'cv.component.html',
    providers: [CompanyService]
})

export class CvComponent { 
    items: any;
    queryResult: any = {};
    last: any;
    @ViewChildren('allTheseThings') things: any;
    
    constructor(private companyService: CompanyService, private router: Router) {
        router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    private populateCompanies() {
        this.companyService.getCompanies()
            .subscribe(result => {
                this.queryResult = result
            });
    }
        
    ngAfterViewInit() {
        this.populateCompanies();
        this.things.changes.subscribe(t => {
            this.items = document.querySelectorAll(".timeline li");
        })
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event) {
        // code for the isElementInViewport function
        for (var i = 0; i < this.items.length; i++) {
            if (this.isElementInViewport(this.items[i])) {
            this.items[i].classList.add("in-view");
            }
        }
        // window.addEventListener("load", this.callbackFunc);
        // window.addEventListener("scroll", this.callbackFunc);
    }

    isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}
