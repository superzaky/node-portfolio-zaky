import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [UserService]
})

export class LoginComponent {
    user: User = new User();
    loginRes: String;
    
    constructor(private _userService: UserService, private router: Router) {
    }

    data = {};
    onSubmit() {
        this._userService.login(this.user)
            .subscribe(
                //we are using an arrow function here
                res => {            
                    console.log("succesvol ingelogd " + res.username);
//                  I don't use navigate(), because I want a redirect where the page gets refreshed
//                  this.router.navigate(['/']); 
                    var host = location.host;
                    //redirects where the page also gets refreshed
                    window.location.href = "http://"+ host;
                },
                error => {
                     console.log("iets werkt niet" + error._body);
                }
            );
    }
}
