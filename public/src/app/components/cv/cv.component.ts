import {Component, HostListener} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'cv',
    templateUrl : 'cv.component.html'
})

export class CvComponent { 
    items: any;

    constructor() {
    
    }
    ngOnInit() {
    }

    ngAfterViewInit() {
        this.items = document.querySelectorAll(".timeline li");
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
