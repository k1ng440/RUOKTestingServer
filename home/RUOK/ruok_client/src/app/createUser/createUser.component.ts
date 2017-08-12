import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-createUser',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.scss']
})
export class CreateUserComponent implements OnInit {
  model: any = { };
  msg: String = "";
  successmsg: String = "";
  success = false;
  error = false;
  types: any;
  constructor( private userService: UserService ) { }

  ngOnInit() {
  }

  createUser = function(f: any) {
  	this.userService.createUser(this.model)
             .subscribe(
                data => {
                    if(data.status == 1) {
                        this.success = true;
                        this.successmsg = data.message;
                        setTimeout(()=>{
                          this.success = false;
                          window.location.href = 'login';
                        },2000);
                    } else if(data.status == 400) {
                        window.location.href = 'login';
                    } else {
                        this.error = true;
                        this.msg = data.message;
                        setTimeout(()=>{
                          this.error = false;
                        },2000);
                    }
                },
                error => {    window.alert('went wrong = ' + JSON.stringify(error));
                    this.error = true;
                    this.msg="Something went Wrong";
                    setTimeout(()=>{
                      this.error = false;
                    },2000);
                });

  }
}
