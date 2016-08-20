import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl : 'navbar.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UserService]
})

export class NavbarComponent { 
    user: User;
    //On page refresh the constructor gets called
    constructor(private _userService: UserService) {
        
        this._userService.getSession()
            .subscribe(
                res => {
                    console.log("app session ");
                    //log the response which shows a session
                    console.log(res); 
                    this.user = res;
                },
                error => {
                    console.log("app session error");
                    console.log(error);
                    this.user = null;
                }
            );
    }
    
    logOut(){
        this._userService.logout()
            .subscribe(
                res => {
                    console.log("app logout ");
                    //log the response which shows a session
                    console.log(res); 
                    this.user = res;
                    var host = location.host;
                    //redirects where the page also gets refreshed
                    window.location.href = "http://"+ host;
                },
                error => {
                    console.log("app logout error");
                    console.log(error);
                    this.user = null;
                }
            );    
    }
}
