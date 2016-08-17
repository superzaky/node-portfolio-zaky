import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NotificationsService } from 'angular2-notifications';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [UserService, NotificationsService]
})

export class LoginComponent {
    user: User = new User();
    loginRes: String;
    
    constructor(private _userService: UserService, private _service: NotificationsService) {

    }
    
    data = {};
    onSubmit() {
        this._userService.login(this.user)
            .subscribe(res => {
                console.log("res onSubmit");
                console.log(res);
                this.loginRes = res;
            });
            
        this._service.success('ye', 'asd', {id: 123});
    }
}
