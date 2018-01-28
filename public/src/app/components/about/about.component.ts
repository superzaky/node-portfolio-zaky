import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl : 'about.component.html'
})

export class AboutComponent { 
    constructor(private router: Router) {
        router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
}
