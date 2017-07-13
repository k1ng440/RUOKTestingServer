import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';


@Component({
  selector: 'app-addPatient',
  templateUrl: './addPatient.component.html',
  styleUrls: ['./addPatient.component.scss']
})
export class AddPatientComponent implements OnInit {
  model:object = { };
  msg: string = "";
  successmsg: string = "";
  success = false;
  error = false;
  types: any;
  minute: any;
  hours: any;
  days: any;
  time: any;
    radioItems = '10:00AM 12:00PM 3:00PM 7:00PM'.split(' ');
    get debug() { return JSON.stringify(this.model); }
  constructor( private patientService: PatientService ) {

  }

  ngOnInit() {
  }


  onChange = function(value) {
    if(value == "hour"){
      this.time = this.hours;
      this.model.followUpTime = 12;
    } else if(value == "minute"){
      this.time = this.minute;
      this.model.followUpTime = 5;
    } else {
      this.time = this.days;
      this.model.followUpTime = 1;
    }
  }

  CN:any= localStorage.getItem('cellnumber');

  addNewPatient = function(f: any) {

  	this.patientService.addNewPatient(this.model)
             .subscribe(
                data => {
                    if(data.status == 1) {
                        this.success = true;
                        this.successmsg = data.message;
                        f.resetForm(this.model={followUpType: 'hour', followUpTime: 12});
                        this.time = this.hours;
                        setTimeout(()=>{
                          this.success = false;
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
                error => {
                    this.error = true;
                    this.msg="Something went Wrong";
                    setTimeout(()=>{
                      this.error = false;
                    },2000);
                });

  }
}
