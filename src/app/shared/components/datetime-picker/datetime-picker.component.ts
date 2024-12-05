import {
  NgxMatDateAdapter,
  NgxMatDatepickerInput,
} from '@angular-material-components/datetime-picker';
import { NgxMatDatepickerInputEvent } from '@angular-material-components/datetime-picker/lib/datepicker-input-base';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import dayjs from 'dayjs';
import moment from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class DatetimePickerComponent implements OnInit {
  @Output() protected valueChange: EventEmitter<any> = new EventEmitter<any>();

  // public date: moment.Moment;

  @Input() label: string = 'Label';
  @Input() initializeWithCurrentDate?: boolean;
  @Input() control: string = '';

  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false;
  public maxDate = new Date();
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public form!: FormGroup;
  public dateControl = new FormControl();

  public disableMinute = false;
  public hideTime = false;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    moment.locale('pt');
    this.form = this.controlContainer.control as FormGroup;

    let date = new Date().toISOString();
    console.log(date);
    console.log(this.initializeWithCurrentDate ? new Date() : null);
    this.form = new FormGroup({
      date: new FormControl(
        moment()
          .utc()
          .utcOffset(5) /*this.initializeWithCurrentDate ? date : null */,
        [Validators.required]
      ),
    });
  }

  onDateChange(
    event: NgxMatDatepickerInputEvent<
      NgxMatDatepickerInput<HTMLInputElement>,
      HTMLInputElement
    >
  ) {
    console.log(event);
  }
}
