import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';
import { ControlContainer, FormGroup } from '@angular/forms';
import { NgxMaskPipe } from 'ngx-mask';

type BorderType =
  | 'success'
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'dark'
  | 'light'
  | 'muted';
type FieldType = 'input' | 'select' | 'password' | 'color' | 'date';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  providers: [NgxMaskPipe],
})
export class FormFieldComponent implements OnInit, AfterViewInit {
  @ViewChild('campoRef') protected campo!: ElementRef;
  @Output() protected valueChange: EventEmitter<string> =
    new EventEmitter<string>();

  @Input() floatLabel: FloatLabelType = 'always';
  @Input() label: string = '';
  @Input() control: string = '';
  @Input() placeholder: string = '';
  @Input() formStyle: MatFormFieldAppearance = 'outline';
  @Input() class: string = '';
  @Input() width: string = '';
  @Input() borderStyle: BorderType = 'muted';
  @Input() fieldType: FieldType = 'input';
  @Input() selectOptions: Array<string> = [];
  @Input() disabled: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input() mask?: string;

  @Output() onFieldFocus = new EventEmitter();

  protected valor: string = '';
  protected form!: FormGroup;

  constructor(
    private controlContainer: ControlContainer,
    private inputMask: NgxMaskPipe
  ) {}

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
  }

  onChange(event: string) {
    if (this.mask === '00:00') {
      const value = this.inputMask.transform(event, '00:00');
      this.valueChange.emit(value);
    }
  }

  ngAfterViewInit() {
    if (this.autoFocus) {
      this.campo.nativeElement.focus();
    }
    console.log(this.mask);
  }
}
