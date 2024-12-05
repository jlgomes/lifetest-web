import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss']
})
export class ModelCardComponent {
  @Input() modelName?:string = "";
  @Input() modelColor?:string = "";
  @Input() modelCount:number = 0;

}
