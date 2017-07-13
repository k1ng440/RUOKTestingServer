import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  model: object = {};
  msg: String = "";
  successmsg: String = "";
  constructor( private authenticationService: AuthenticationService ) { }

  ngOnInit() {
  }

  forgotPassword() {
  	this.authenticationService.forgotPassword(this.model)
             .subscribe(
                data => {
                    if(data.status == 1) {
                        this.successmsg = data.message;
                    } else {
                        this.msg = data.message;
                    }
                },
                error => {
                    this.msg="Something went Wrong";
                });
  }
}
