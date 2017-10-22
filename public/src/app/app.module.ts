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
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ViewProjectComponent } from './components/view-project/view-project';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { CKEditorModule } from 'ng2-ckeditor';

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
    },
    {
        path: 'portfolio', 
        component: PortfolioComponent,
    },
    {
        path: 'projects/new', 
        component: ProjectFormComponent,
    },
    {
        path: 'projects/edit/:id', 
        component: ProjectFormComponent,
    },
    {
        path: 'projects/:id', 
        component: ViewProjectComponent,
    }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        // RouterModule,
        RouterModule.forRoot(routes),
        HttpModule ,
        CKEditorModule
//        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent, 
        NavbarComponent, 
        FooterComponent,
        SearchComponent,
        AboutComponent,
        CvComponent,
        PortfolioComponent,
        PaginationComponent,
        ViewProjectComponent,
        ProjectFormComponent
    ],
    providers: [
//        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
