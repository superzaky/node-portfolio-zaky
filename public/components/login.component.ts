import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'views/login.html'
})
export class LoginComponent  {
     constructor() {
        console.log("we have arrived logincomponent");
    }
}
