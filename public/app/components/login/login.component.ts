import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login',
    directives: [ToasterContainerComponent],
    templateUrl: 'login.component.html',
    providers: [UserService, ToasterService]
})

export class LoginComponent {
    user: User = new User();
    loginRes: String;
    private toasterService: ToasterService;

    public toasterconfig: ToasterConfig = new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: false,
        timeout: 0
    });
    
    constructor(private _userService: UserService, toasterService: ToasterService, private router: Router) {
        this.toasterService = toasterService;
    }

    data = {};
    onSubmit() {
        this._userService.login(this.user)
            .subscribe(
                //we are using an arrow function here
                res => {            
                    this.toasterService.pop('success', 'Success', 'You have logged in ' + res.username);
//                  I don't use navigate(), because I want a redirect where the page gets refreshed
//                  this.router.navigate(['/']); 
                    var host = location.host;
                    //redirects where the page also gets refreshed
                    window.location.href = "http://"+ host;
                },
                error => {
                     this.toasterService.pop('error', 'Failed', error._body);
                }
            );
    }
}