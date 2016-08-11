import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    templateUrl : '../home.html'
})
//AppComponent is the root of the application
export class AppComponent { 
    constructor() {
        console.log("We are up and running!");
    }
}
