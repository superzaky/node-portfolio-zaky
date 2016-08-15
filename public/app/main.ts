//Angular's browser bootstrap function
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { appRouterProviders } from './app.routing';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

//The application root component, AppComponent
import { AppComponent } from './app.component';
bootstrap(AppComponent, [appRouterProviders, disableDeprecatedForms(), provideForms()]);
