import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tabs-sample',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs-sample.component.html',
  styleUrls: ['./tabs-sample.component.scss']
})
export class TabsSampleComponent implements OnInit {

  public tabs: any[] = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true }
  ];

  constructor() { }

  ngOnInit() {
  }

  public alertMe(): void {
    setTimeout(function (): void {
      alert('You\'ve selected the alert tab!');
    });
  }

  public setActiveTab(index: number): void {
    this.tabs[index].active = true;
  }

  public removeTabHandler(/*tab:any*/): void {
    console.log('Remove Tab handler');
  }

}
