import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as moment from 'moment';
//import { FxDatepickerComponent } from './datepicker.component';


@Component({
  selector: 'app-addPatient',
  templateUrl: './addPatient.component.html',
  styleUrls: ['./addPatient.component.scss']
})
export class AddPatientComponent implements OnInit {
  model: any = { };
  msg: string = "";
  successmsg: string = "";
  success = false;
  error = false;
  types: any;
  minute: any;
  hours: any;
  days: any;
  time: any;
  date: any;
  radioItems = '10:00 AM, 12:00 PM, 3:00 PM, 7:00 PM'.split(', ');
  constructor( private patientService: PatientService ) {
    this.types = [{ label: 'Minute', value: 'minute'},{ label: 'Hour', value: 'hour'},{ label: 'Day', value: 'day'}]; 
    this.minute = [ 1, 5, 10, 15, 30];
    this.hours = [ 1, 3, 6, 9, 12, 15, 18, 21, 24];
    this.days = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    this.time = this.hours;
  }

  ngOnInit() {
      this.model.proContactNo = localStorage.getItem('cellnumber');
  }

  getFormattedDate() {
    if (!this.model.date)
      return;
    return this.model.date.momentObj.format('dddd ');
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

  addNewPatient = function(f: any) {
    if (!this.model.followUpTime) {this.model.options = moment(this.model.date.formatted + " " + this.model.options).format('YYYY-MM-DD HH:mm:ss.SSS');}
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
