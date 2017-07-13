import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-pendingText',
  templateUrl: './pendingText.component.html',
  styleUrls: ['./pendingText.component.scss']
})

export class PendingTextComponent implements OnInit {
  msg: String="";
  data: any;

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.patientService.getPending()
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
