import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as moment from 'moment';
import { UserService } from "../../services/user.service";


@Component({
  selector: 'app-updatePatient',
  templateUrl: './updatePatient.component.html',
  styleUrls: ['./updatePatient.component.scss']
})
export class UpdatePatientComponent implements OnInit {
  model: any = { };
  msg: string;
  successmsg: string;
  success = false;
  error = false;

  constructor(
    private userService: UserService
  ) {
    
  }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(data => {
        this.model = data;
      })
  }

  updateProfile(f) {
    this.userService.updateProfile(this.model)
    .subscribe(data => {
      //console.log(data);
    })
  }
}