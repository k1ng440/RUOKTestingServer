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
  constructor( private patientService: PatientService ) {
    var today = new Date();
    var dayofWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    if (today.getHours() >= 12) {
         today.setDate(today.getDate() + 1);
         var firstfollowup = dayofWeek[today.getDay()+1] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '10:00 AM';
         var secondfollowup = dayofWeek[today.getDay()+1] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '3:00 PM';
         var thirdfollowup = dayofWeek[today.getDay()+2] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '10:00 AM';;
         var fourthfollowup = dayofWeek[today.getDay()+2] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '3:00 PM';
    } else {
         var firstfollowup = dayofWeek[today.getDay()] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '3:00 PM';
         var secondfollowup = dayofWeek[today.getDay()+1] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '10:00 AM';;
         var thirdfollowup = dayofWeek[today.getDay()+1] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '3:00 PM';
         var fourthfollowup = dayofWeek[today.getDay()+2] + '  ' + today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear() + ' ' + '10:00 AM';
    }

    this.types = [{ label: firstfollowup, value: Date.now()},{ label: secondfollowup, value: 'hour'},{ label: thirdfollowup, value: 'day'},{ label: fourthfollowup, value: 'day'}];
    this.minute = [ 1, 5, 10, 15, 30];
    this.hours = [ 1, 3, 6, 9, 12, 15, 18, 21, 24];
    this.days = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    this.time = this.hours;
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
