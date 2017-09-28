import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
//import { routing, appRoutingProviders }     from './app.routing';

import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { CvComponent } from './components/cv/cv.component';

const routes: Routes = [
    {
        path: '', //represents the home page
        component: SearchComponent
    },
    {
        path: 'about', 
        component: AboutComponent,
    },
    {
        path: 'login', 
        component: LoginComponent,
    },
    {
        path: 'cv', 
        component: CvComponent,
    }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        // RouterModule,
        RouterModule.forRoot(routes),
        HttpModule 
//        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent, 
        NavbarComponent, 
        FooterComponent,
        SearchComponent,
        AboutComponent,
        CvComponent
    ],
    providers: [
//        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }