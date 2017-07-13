import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-clientView',
  templateUrl: './clientView.component.html',
  styleUrls: ['./clientView.component.scss']
})
export class ClientViewComponent implements OnInit {
  response: any = {};
  msg: String = "";
  errormsg: String = "";
  successmsg = "";
  show = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.response.token = params['token'];
        //console.log(this.response.providerid,this.response.patientid);
      });    
  }

  better() {
    this.response.feel = "Better";
    this.patientResponse(this.response);
  }

  sameworse(feel) {
    this.response.feel = feel;
    this.patientResponse(this.response);
  }

  patientResponse(response: any) {
    this.patientService.patientResponse(response)
             .subscribe(
                data => {
                    if(data.status == 1) {
                        this.show = false;
                        this.successmsg = data.message;
                        if(this.response.feel != "Better")
                        window.location.href = '/contactProvider/'+this.response.token;
                    } else {
                        this.show = false;
                        this.errormsg = data.message;
                    }
                },
                error => {
                    this.errormsg="Something went Wrong";
                });
  }
}
