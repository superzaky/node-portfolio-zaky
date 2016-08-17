import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { SimpleNotificationsModule  }   from 'angular2-notifications';

import { AppComponent }  from './app.component';
//import { routing, appRoutingProviders }     from './app.routing';

import { LoginComponent } from './components/login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SimpleNotificationsModule
//        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
//        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
