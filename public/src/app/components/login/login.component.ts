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
    errorMsg: string;
    
    constructor(private _userService: UserService, private router: Router) {
    }

    data = {};
    onSubmit() {
        this._userService.login(this.user)
            .subscribe(
                //we are using an arrow function here
                res => {            
                    if (res && res.token) {
                        // store user details (which resides in res variable) and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(res));
                    }
//                  I don't use navigate(), because I want a redirect where the page gets refreshed
//                  this.router.navigate(['/']); 
                    var host = location.host;
                    //redirects where the page also gets refreshed
                    window.location.href = "https://"+ host;
                },
                error => {
                     console.log("iets werkt niet" + error._body);
                     if(error._body === '"Invalid username or password"') {
                        this.errorMsg = "De ingevoerde gebruikersnaam of wachtwoord is onjuist."
                    }
                }
            );
    }
}
