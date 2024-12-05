import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

type BorderType =
  | 'success'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'light'
  | 'muted';

@Component({
  selector: 'app-form-select-field',
  templateUrl: './form-select-field.component.html',
  styleUrls: ['./form-select-field.component.scss'],
})
export class FormSelectFieldComponent implements OnInit {
  @Output() selectionChangeEmitter = new EventEmitter<MatSelectChange>();
  @Input() label: string = '';
  @Input() control: string = '';
  @Input() placeholder: string = '';
  @Input() formStyle: MatFormFieldAppearance = 'outline';
  @Input() class: string = '';
  @Input() width: string = '';
  @Input() borderStyle: BorderType = 'muted';
  @Input() options: Array<any> = [];
  @Input() valueField: string = 'value';
  @Input() textField: string = 'text';
  @Input() disabled: boolean = false;

  protected form!: FormGroup;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectionChangeEmitter.emit(event);
  }
}
