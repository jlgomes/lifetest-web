import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true
})
export class ProgressBarComponent implements OnInit {
  @Input() value: number | string = 0;
  @Input() max: number | string = 100;
  @Input() color: string = "white";

  protected progress: number = 0;

  constructor() {

  }
  ngOnInit() {
    // percentage for progress width
    this.progress = Number(this.value) / Number(this.max) * 100;
  }
}
