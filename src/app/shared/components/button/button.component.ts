import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'button' | 'submit' | 'reset';
type VariantType = 'success' | 'primary' | 'secondary' | 'warning' | 'danger' | 'dark' | 'light' | 'muted';
type StyleType = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type?: ButtonType = "button";
  @Input() variant: VariantType = "success";
  @Input() btnStyle: StyleType = "basic";
  @Input() width: number | string = "auto";
  @Input() height: number | string = "44px";
  @Input() class: string = "";
  @Input() disabled: boolean = false;
  @Output() onClick =  new EventEmitter();
}
