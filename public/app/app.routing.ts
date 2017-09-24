//import { Routes, RouterModule } from '@angular/router';
import { provideRouter, RouterConfig } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { CvComponent } from './components/cv/cv.component';

//import { LoginComponent } from '../components/login.component';

const appRoutes: RouterConfig = [
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

export const appRouterProviders = [
    provideRouter(appRoutes)
];

//TO DO: the code above is deprecated, use instead the code below:
//const appRoutes: Routes = [
//    {
//        path: 'login',
//        component: LoginComponent,
//        //    redirectTo: '/login',
//
//        //    pathMatch: 'full'
//    }
//];
//
//export const routing = RouterModule.forRoot(appRoutes);
