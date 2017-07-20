import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import * as moment from 'moment';

@Component({
  selector: 'app-completeText',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})
export class UserProfileComponent implements OnInit {
	msg: String;
	data: any = [];
  constructor(private patientService: PatientService) { }

  ngOnInit() {
  	this.patientService.getUserProfile()
             .subscribe(
                data => {  window.alert(JSON.stringify(data));
                    if (data.status == 1) {
                        
                    } else if(data.status == 400) {
                        window.location.href = 'login';
                    } else {
                        this.msg = data.message;
                    }
                },
                error => {
                    this.msg="Something went Wrong";
                });
  }

}
