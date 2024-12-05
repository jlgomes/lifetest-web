import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './pages/notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedModule} from "../../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    NotificationsComponent
  ],
	imports: [
		CommonModule,
		NotificationsRoutingModule,
		MatIconModule,
		MatPaginatorModule,
		MatTableModule,
		MatTooltipModule,
		SharedModule,
		TranslateModule
	]
})
export class NotificationsModule { }
