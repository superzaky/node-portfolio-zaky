import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpModule } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    // directives: [RouterModule, NavbarComponent, FooterComponent], wis dit
    providers: [HttpModule]
    //    precompile: [SearchComponent, AboutComponent]
})

//AppComponent is the root of the application
export class AppComponent {
    //On page refresh the constructor gets called
    constructor() {
        
    }
}
