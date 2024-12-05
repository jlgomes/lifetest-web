
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
  ],
})
export class ProgressSpinnerComponent {
  @Input() diameter: number = 100;
  @Input() strokeWidth: number = 10;
  @Input() padding: string = '0px';

  constructor() { }
}
