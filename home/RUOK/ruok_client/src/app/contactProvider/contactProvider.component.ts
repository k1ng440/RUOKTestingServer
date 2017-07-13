import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-contactProvider',
  templateUrl: './contactProvider.component.html',
  styleUrls: ['./contactProvider.component.scss']
})
export class ContactProviderComponent implements OnInit {
  response: any = {};
  errormsg: String = "";
  successmsg = "";
  showarea = false;
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

  yes() {
    this.response.contact = "yes";
    this.showarea = true;
  }

  no() {
    this.response.contact = "no";
    this.contactProvider(this.response);
  }

  finalSubmit() {
    this.contactProvider(this.response);
  }

  contactProvider(response: any) {
    this.patientService.contactProvider(response)
             .subscribe(
                data => {
                    if(data.status == 1) {
                        this.successmsg = data.message;
                        this.show = false;
                    } else {
                        this.errormsg = data.message;
                    }
                },
                error => {
                    this.errormsg="Something went Wrong";
                });
  }
}
