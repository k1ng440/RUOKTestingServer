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
  }

  ngOnInit() {
      this.model.proContactNo = localStorage.getItem('cellnumber');
  }

  getFormattedDate() {
    if (!this.model.date)
      return;
    return this.model.date.momentObj.format('dddd ');
  }

  addNewPatient = function(f: any) {
    this.model.options = moment(this.model.date.formatted + " " + this.model.options).format('YYYY-MM-DD HH:mm:ss.SSS');
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
