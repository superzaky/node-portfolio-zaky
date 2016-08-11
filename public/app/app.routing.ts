import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../components/login.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        //    redirectTo: '/login',

        //    pathMatch: 'full'
    }
];

export const routing = RouterModule.forRoot(appRoutes);
