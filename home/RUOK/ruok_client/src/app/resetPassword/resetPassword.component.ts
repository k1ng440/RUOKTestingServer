import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  model: object = {};
  msg: String = "";
  successmsg: String = "";
  token: any;
  show = true;
  constructor( 
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.token = params['token'];
      });
  }

  resetPassword = function() {
    this.model.password = btoa(this.model.password);
    this.model.cpassword = btoa(this.model.cpassword);
  	this.authenticationService.resetPassword(this.model,this.token)
             .subscribe(
                data => {
                    if(data.status == 1) {
                        this.successmsg = data.message;
                        this.show = false;
                    } else {
                        this.msg = data.message;
                    }
                },
                error => {
                    this.msg="Something went Wrong";
                });
  }
}
