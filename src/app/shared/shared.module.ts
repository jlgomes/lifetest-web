import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from './components/button/button.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterIconService } from '../core/domain/services/register-icon.service';
import { MatIconModule } from '@angular/material/icon';
import { FormSelectFieldComponent } from '@shared/components/form-select-field/form-select-field.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationsButtonComponent } from './components/notifications-button/notifications-button.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatetimePipe } from './pipes/datetime/datetime.pipe';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatetimePickerComponent } from './components/datetime-picker/datetime-picker.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { DatetimeCalendarComponent } from './components/datetime-calendar/datetime-calendar.component';
import { CheckboxTreeComponent } from './components/checkbox-tree/checkbox-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BarGraphChartComponent } from './components/bar-graph-chart/bar-graph-chart.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { GraphicSpecificErrorsComponent } from './components/graphic-specific-errors/graphic-specific-errors.component';
import { GraphModelsTestedComponent } from './components/graph-models-tested/graph-models-tested.component';

@NgModule({
  declarations: [
    ButtonComponent,
    FormFieldComponent,
    FormSelectFieldComponent,
    LanguageSelectorComponent,
    CardsListComponent,
    ConfirmationDialogComponent,
    BreadcrumbComponent,
    DatePickerComponent,
    DatetimePickerComponent,
    DatetimeCalendarComponent,
    CheckboxTreeComponent,
    BarGraphChartComponent,
    GraphModelsTestedComponent,
    GraphicSpecificErrorsComponent,
  ],
  providers: [RegisterIconService, provideNgxMask()],
  imports: [
    CommonModule,
    RouterLink,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatIconModule,
    TranslateModule,
    NotificationsButtonComponent,
    ProgressSpinnerComponent,
    MatRippleModule,
    MatTooltipModule,
    DatetimePipe,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTreeModule,
    MatCheckboxModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    ButtonComponent,
    FormFieldComponent,
    FormSelectFieldComponent,
    LanguageSelectorComponent,
    CardsListComponent,
    BreadcrumbComponent,
    DatePickerComponent,
    DatetimePickerComponent,
    CheckboxTreeComponent,
    BarGraphChartComponent,
    GraphModelsTestedComponent,
    GraphicSpecificErrorsComponent,
  ],
})
export class SharedModule {}
