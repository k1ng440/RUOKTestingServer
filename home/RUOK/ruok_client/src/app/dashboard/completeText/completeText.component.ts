import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-completeText',
  templateUrl: './completeText.component.html',
  styleUrls: ['./completeText.component.scss']
})
export class CompleteTextComponent implements OnInit {
	msg: String;
	data: any;
  constructor(private patientService: PatientService) { }

  ngOnInit() {
  	this.patientService.getCompleted()
             .subscribe(
                data => {
                    if(data.status == 1) {
                        this.data = data.patient;                  
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
