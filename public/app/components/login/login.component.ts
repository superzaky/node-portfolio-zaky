import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [UserService]
})

export class LoginComponent {
    user: User = new User();
    loginRes: String
    constructor(private _userService: UserService) {

    }
    data = {};
    onSubmit() {
        this._userService.login(this.user)
            .subscribe(res => {
                console.log("res onSubmit");
                console.log(res);
                this.loginRes = res;
            });
    }
}
