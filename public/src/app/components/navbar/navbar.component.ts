import { Component } from '@angular/core';
// import {RouterModule} from '@angular/router'; WIS
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl : 'navbar.component.html',
    // directives: [RouterModule], WIS
    providers: [UserService]
})

export class NavbarComponent { 
    user: User;
    //On page refresh the constructor gets called
    constructor(private _userService: UserService) {
        
        this._userService.getSession()
            .subscribe(
                res => {
                    //log the response which shows a session
                    //console.log("JSON.stringify res = "+JSON.stringify(res, null, 4));
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
        this.user.logout = true;
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this._userService.logout(this.user)
            .subscribe(
                res => {
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
