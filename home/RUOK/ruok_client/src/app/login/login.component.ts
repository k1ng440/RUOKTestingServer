import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	model: object = {};
  msg: String = "";
  constructor( private authenticationService: AuthenticationService ) { }

  ngOnInit() {
  }

  login = function() {
  	//console.log(this.model);
    this.model.password = btoa(this.model.password);
    this.authenticationService.login(this.model)
             .subscribe(
                data => {
                    if(data.status == 1) {
                        // store jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('firstname', data.user.firstName);
                        localStorage.setItem('lastname', data.user.lastName);
                        localStorage.setItem('cellnumber', data.user.cellNumber);
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('_id', data.user._id);
                        window.location.href = 'dashboard/addPatient';
                    } else {
                        this.msg = data.message;
                    }
                },
                error => {
                    this.msg="Something went Wrong";
                });
    }

  	/*routerLink="/dashboard/home"*/

}
