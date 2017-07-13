import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-sample',
  templateUrl: './alert-sample.component.html',
  styleUrls: ['./alert-sample.component.scss']
})
export class AlertSampleComponent implements OnInit {

  public alerts: any = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  public reset(): void {
    this.alerts = this.alerts.map((alert: any) => Object.assign({}, alert));
  }

}
